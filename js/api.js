var API = (function () {
  const BASE_URL = "https://study.duyiedu.com";
  const TOKEN_KEY = "token";

  function get(path) {
    const token = localStorage.getItem("token");
    const headers = {};
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path, { headers });
  }

  function post(path, bodyObj) {
    const headers = { "Content-Type": "application/json" };
    const token = localStorage.getItem("token");
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }

    return fetch(BASE_URL + path, {
      method: "POST",
      headers,
      body: JSON.stringify(bodyObj),
    });
  }

  //注册用户

  async function reg(userInfo) {
    const resp = await post("/api/user/reg", userInfo);
    return await resp.json();
  }

  // 函数验证  reg({loginId:'wangpeng1',nickname:'wangpeng1',loginPwd:'135246'}).then(a => console.log(a))

  // async function reg(userInfo) {
  //   const resp = await fetch(BASE_URL + "/api/user/reg", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       [TOKEN_KEY]: localStorage.getItem("token"),
  //     },
  //     body: JSON.stringify(userInfo),
  //   });
  //   const result = await resp.json();
  //   return result;
  // }

  //另一种写法

  // async function reg(userInfo) {
  //   const result = await fetch(BASE_URL + "/api/user/reg", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(userInfo),
  //   }).then((resp) => resp.json());

  //   console.log(result);
  //   return result;
  // }

  //函数验证 reg({loginId:'wangpeng',nickname:'wangpeng',loginPwd:'135246'})

  /**
   * 用户登录函数
   * @param {obj} loginInfo
   * @returns
   */
  // async function login(loginInfo) {
  //   const resp = await fetch(BASE_URL + "/api/user/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(loginInfo),
  //   });
  //   const result = await resp.json();
  //   if (result.code === 0) {
  //     //登录成功
  //     //将响应头里面的token保存起来（localStorage)
  //     const token = resp.headers.get("authorization");
  //     localStorage.setItem(TOKEN_KEY, token);
  //   }
  //   return result;
  // }

  async function login(loginInfo) {
    const resp = await post("/api/user/login", loginInfo);
    const result = await resp.json();
    if (result.code === 0) {
      //登录成功
      //将响应头里面的token保存起来（localStorage)
      const token = resp.headers.get("authorization");
      localStorage.setItem(TOKEN_KEY, token);
    }
    return result;
  }

  //验证方法   login({'loginId':'wangpeng','loginPwd':'135246'}).then(resp=>console.log(resp))

  async function exists(loginId) {
    const resp = await get("/api/user/exists?loginId=" + loginId);
    return await resp.json();
  }

  async function profile() {
    const resp = await get("/api/user/profile");
    return await resp.json();
  }

  async function sendChat(content) {
    const resp = await post("/api/chat", { content: content });
    return await resp.json();
  }

  async function getHistory() {
    const resp = await get("/api/chat/history");
    return await resp.json();
  }

  function loginOut() {
    localStorage.removeItem(TOKEN_KEY);
  }

  return {
    reg,
    login,
    exists,
    profile,
    sendChat,
    getHistory,
    loginOut,
  };
})();
