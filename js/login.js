const loginIdValidator = new FeildValidator("txtLoginId", async function (val) {
  //这里的val就是input文本框的值
  if (!val) {
    return "请填写账号";
  }
});

const loginPwdValidator = new FeildValidator("txtLoginPwd", function (val) {
  if (!val) {
    return "密码不能为空";
  }
});

const form = $(".user-form");
form.onsubmit = async function (e) {
  e.preventDefault();
  const result = await FeildValidator.validate(
    loginIdValidator,

    loginPwdValidator
  );
  console.log(result);
  if (!result) {
    return;
  }

  // 验证通过了，发送网络注册接口
  const resp = await API.login({
    loginId: loginIdValidator.input.value,

    loginPwd: loginPwdValidator.input.value,
  });
  console.log(resp);
  if (resp.code === 0) {
    alert("登录成功，点击确定，跳转到首页");
    //location.replace("./login.html");
    location.href = "./index.html";
  } else {
    alert(`登录失败，原因是:${resp.msg}`);
  }
};
