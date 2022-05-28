//用户注册和登录时，表单验证的通用代码

/**
 * 对某一个表单项进行验证的构造函数
 */
class FeildValidator {
  /**
   *
   * @param {String} txtId input文本框id
   * @param {Function} validatorFunc 验证规则函数，当需要对该文本框进行验证时，会调用该函数，函数的参数为当前文本框的值，函数的返回值为验证的错误消息，若没有返回，则表示无错误
   */
  constructor(txtId, validatorFunc) {
    this.input = $("#" + txtId);
    this.p = this.input.nextElementSibling;
    this.validatorFunc = validatorFunc;
    //失去焦点，触发验证
    //这里使用箭头函数，里面写this就是函数外面一层的this
    this.input.onblur = () => {
      this.validate();
    };
  }

  /**
   * 开始验证，验证成功返回true，验证失败返回false, 并在p元素里显示失败提示
   */
  async validate() {
    const err = await this.validatorFunc(this.input.value);
    if (err) {
      //有错误
      this.p.innerHTML = err;
      return false;
    } else {
      this.p.innerHTML = "";
      return true;
    }
  }

  /**
   * 对传入的所有验证器进行统一的验证，如果所有的都通过，返回true，否则false
   * @param  {FeildValidator[]} validators
   */
  static async validate(...validators) {
    const proms = validators.map((v) => v.validate());
    //每一个验证器都验证一遍，等到一个promise的数组
    const results = await Promise.all(proms);
    //得到一个类似[true,true,flase]这样的数组
    //想办法判断，全是true才返回true，如果有一个false就返回false
    return results.every((r) => r);
  }
}
