const loginIdValidator = new FeildValidator("txtLoginId", async function (val) {
  //这里的val就是input文本框的值
  if (!val) {
    return "请填写账号";
  }
  if ((await API.exists(val)).data) {
    return "已存在账号，请重新输入";
  }
});

const nicknameValidator = new FeildValidator("txtNickname", function (val) {
  if (!val) {
    return "请填写昵称";
  }
});

const loginPwdValidator = new FeildValidator("txtLoginPwd", function (val) {
  if (!val) {
    return "密码不能为空";
  }
});

const LoginPwdConfirmValidator = new FeildValidator(
  "txtLoginPwdConfirm",
  function (val) {
    if (!val) {
      return "请再次输入密码";
    }
    if (val !== loginPwdValidator.input.value) {
      return "密码与第一次输入不同，请重新输入";
    }
  }
);

//表单点击提交按钮后，验证信息是否完整，然后发生注册接口，跳转登录页面
const form = $(".user-form");
form.onsubmit = async function (e) {
  e.preventDefault();
  const result = await FeildValidator.validate(
    loginIdValidator,
    nicknameValidator,
    loginPwdValidator,
    LoginPwdConfirmValidator
  );
  console.log(result);
  if (!result) {
    alert("验证未通过，请填写完整注册信息");
    return;
  }

  // 验证通过了，发送网络注册接口
  const resp = await API.reg({
    loginId: loginIdValidator.input.value,
    nickname: nicknameValidator.input.value,
    loginPwd: loginPwdValidator.input.value,
  });
  if (resp.code === 0) {
    alert("注册成功，点击确定，进入登录页面");
    //location.replace("./login.html");
    location.href = "./login.html";
  }
};

// var test = async function () {
//   const result = await FeildValidator.validate(
//     loginIdValidator,
//     nicknameValidator
//   );
//   console.log(result);
// };
