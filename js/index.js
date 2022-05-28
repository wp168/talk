(async function () {
  //判断已经是已经登录状态

  const resp = await API.profile();
  const user = resp.data;

  if (resp.code !== 0) {
    alert("未登录，或登录已过期，请重新登录");
    location.href = "./login.html";
  }

  //获取dom元素
  const doms = {
    nickname: $("#nickname"),
    loginId: $("#loginId"),
    close: $(".close"),
    chatContainer: $(".chat-container"),
    txtMsg: $("#txtMsg"),
    msgContainer: $(".msg-container"),
  };

  //下面就都是已经登录的状态
  setUserInfo();

  //注销事件
  doms.close.onclick = function () {
    API.loginOut();
    location.href = "./login.html";
  };

  //注册发送消息事件
  doms.msgContainer.onsubmit = function (e) {
    e.preventDefault();
    sendChat();
    console.log(123);
  };

  //获取历史聊天记录
  getHistory();
  async function getHistory() {
    const resp = await API.getHistory();
    for (item of resp.data) {
      addChat(item);
    }
    scrollBottom();
  }

  //发送聊天消息
  async function sendChat() {
    const content = doms.txtMsg.value.trim(); //获取聊天输入框里面的信息
    if (!content) {
      return;
    }
    // 先把发送信息显示在聊天窗口中
    addChat({
      from: user.loginId,
      to: null,
      createdAt: Date.now(),
      content,
    });

    doms.txtMsg.value = ""; //把窗口设为空
    scrollBottom();

    // 发送聊天并显示返回内容
    const chatResp = await API.sendChat(content);
    addChat({
      from: null,
      to: user.loginId,
      ...chatResp.data,
    });
    scrollBottom();
  }

  //设置用户信息函数
  function setUserInfo() {
    doms.nickname.innerText = resp.data.nickname; //从安全考虑要用innerText
    doms.loginId.innerText = resp.data.loginId;
  }

  //往聊天内容区域里面增加一条聊天消息
  function addChat(chatInfo) {
    const div = $$$("div");
    div.classList.add("chat-item");
    if (chatInfo.from) {
      div.classList.add("me");
    }

    const img = $$$("img");
    img.classList.add("chat-avatar");
    img.src = chatInfo.from ? "./asset/avatar.png" : "./asset/robot-avatar.jpg";

    const content = $$$("div");
    content.classList.add("chat-content");
    content.innerText = chatInfo.content;

    const time = $$$("div");
    time.classList.add("chat-date");
    time.innerText = formatDate(chatInfo.createdAt);

    div.appendChild(img);
    div.appendChild(content);
    div.appendChild(time);

    doms.chatContainer.appendChild(div);
  }

  // 聊天窗口滚动到底部的函数
  function scrollBottom() {
    doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight;
  }

  //转换时间格式的函数
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  //测试addchat函数
  //   addChat({
  //     _id: "628663e4eddc6505466a0b6b",
  //     from: "wangpeng",
  //     to: null,
  //     content: "Hello,你好!!!",
  //     createdAt: 1652974564364,
  //   });
})();
