var registerUrl = '/uc/system/webjsp/member/registerByPhone';
var getKeyUrl = '/uc/system/vcode/sendCgiSmsVCode';
var validPhoneUrl = '/uc/system/webjsp/member/isValidPhone';
var accountLoginUrl = '/sso/login';
$(function () {
    $('#acceptFlyme').mzCheckBox({
        click: function (e, event) {
            var error = $('#acceptError');
            var $field = $('#rememberField');
            if (!$(e).prop('checked')) {
                error.show();
                $field.css('margin-bottom', 10);
            } else {
                error.hide();
                $field.css('margin-bottom', 30);
            }
        }
    });
    var form = new Form();
    form.init();

});
var Form = function () {
    this.$form = $("#mainForm");
    this.$btn = $('#register');
    this.$getKey = $('#getKey');
    this.$phone = $('#phone');
    this.$pwd = $('#password');
    this.$pwd1 = $('#password1');
};
$.extend(Form.prototype, {
    init: function () {
        this.initParameter();
        this.initValidate();
        this.initFormEvent();
        util.initPlaceholder(this.$phone, '手机号码');
        util.initPlaceholder($('#kapkey'), '验证码');
        util.initPlaceholder(this.$pwd, '密码');
        util.initPlaceholder(this.$pwd1, '密码');
        this.initResize();
        $.floatTip({'data': [
            {'id': 'phone', 'text': '输入11位手机号码，可用于登录和找回密码', 'width': 200, 'loc': 1, 'diffy': 2, 'diff': 10},
            {'id': 'kapkey', 'text': '请输入手机收到的验证码', 'width': 200, 'loc': 1, 'diffy': 2, 'diff': 10},
            {'id': 'password1', 'text': '长度为8-16个字符，区分大小写，至少包含两种类型', 'width': 200, 'loc': 1, 'diffy': 2, 'diff': 10},
            {'id': 'password', 'text': '长度为8-16个字符，区分大小写，至少包含两种类型', 'width': 200, 'loc': 1, 'diffy': 2, 'diff': 10}
        ]});
        util.disableVcode(this.$getKey);
        if ($.browser.msie && $.browser.version == '6.0') {
            this.$pwd.focus();
            this.$pwd.blur();
        }
    },
    initParameter: function () {
        var appuri = util.getParameter("appuri");
        var useruri = util.getParameter("useruri");
        var service = util.getParameter("service");
        var sid = util.getParameter("sid");
        var urlSubfix = "";
        if (appuri != null) {
            $('#appuri').val(appuri);
            urlSubfix = urlSubfix + "appuri=" + encodeURIComponent(appuri) + "&";
        }
        if (useruri != null) {
            $('#useruri').val(useruri);
            urlSubfix = urlSubfix + "useruri=" + encodeURIComponent(useruri) + "&";
        }
        if (service != null) {
            $('#service').val(service);
            urlSubfix = urlSubfix + "service=" + encodeURIComponent(service) + "&";
        }
        if (sid != null) {
            $('#sid').val(sid);
            urlSubfix = urlSubfix + "sid=" + encodeURIComponent(sid);
        }
        var oldLoginHerf = $("#toLogin").attr("href");
        var oldRegisterHerf = $("#toRegister").attr("href");
        var nameRegisterHref = "/nameRegister";
        if (urlSubfix != "") {
            urlSubfix = "?" + urlSubfix;
            $("#toLogin").attr("href", oldLoginHerf + urlSubfix);
            $("#toRegister").attr("href", oldRegisterHerf + urlSubfix);
            $("#toNameRegister").attr("href", nameRegisterHref + urlSubfix);
        }
    },
    initInput: function ($input, info) {
        util.initPlaceholder($input, info, 'emptyInput');
    },
    initResize: function () {
        global.resizer.setProperty('minH', 800);
        $(document.body).css('min-height', 800);
    },
    initFormEvent: function () {
        var _this = this;
        this.$btn.click(function () {
            _this.$form.submit();
        });
        this.$form.bind("keypress", function (e) {
            if (e.keyCode == 13) {
                _this.$btn.click();
            }
        });
        util.initVcode(this.$getKey, getKeyUrl, 60, function () {},function(after, dealCount){
            nAlert('<p>请输入图中文字</p><p class="normalInput"><input type="text" value="" name="kapmap" id="kapmap" class="kapkey" maxlength="6" autocomplete="off"><img id="imgKey" class="pointer" title="点击可刷新验证码" src="/kaptcha.jpg?t=1411024557506"></p>',"提示",function(){
                var param = {};
                param.kapkey = $('#kapmap').val();
                param.phone = _this.$phone.val();
                param.vCodeTypeValue = "10";
                util.doAsyncPost(getKeyUrl, function(result) {
                    result = util.getData(result, false, function(mes, code, callback){
                        callback();
                    });
                    if(result == true){
                        dealCount();
                    }
                }, param);
            });
            function refreshImg(){
                $("#imgKey")[0].src = "/kaptcha.jpg?t="+new Date().getTime();
                return false;
            }
            $("#imgKey").click(refreshImg);
            refreshImg();
            $(".alertDialogMain").css("border","none");
        });
        function _createPwd(type) {
            if (type == 'text') {
                _this.$pwd.val(_this.$pwd1.val());
                _this.$pwd.attr('name', 'password').show();
                _this.$pwd1.removeAttr('name').hide();
                if (!_this.$pwd.val()) {
                    _this.$pwd.next('.inputTip').show();
                }
                _this.$pwd1.next('.inputTip').hide();
            } else {
                _this.$pwd1.val(_this.$pwd.val());
                _this.$pwd1.attr('name', 'password').show();
                _this.$pwd.removeAttr('name').hide();
                if (!_this.$pwd1.val()) {
                    _this.$pwd1.next('.inputTip').show();
                }
                _this.$pwd.next('.inputTip').hide();
            }
            $(this).removeClass(type == 'text' ? 'pwdBtn' : 'pwdBtnShow');
            $(this).addClass(type == 'text' ? 'pwdBtnShow' : 'pwdBtn');
        };
        $('#pwdBtn').click(function () {
            if ($(this).hasClass('pwdBtn')) {
                _createPwd.call(this, 'text');
            } else {
                _createPwd.call(this, 'password');
            }
        });
    },
    initValidate: function () {
        var _this = this;
        this.$form.validate($.extend(util.validate, {
            submitHandler: function () {
                if (!$('#acceptFlyme').prop('checked')) {
                    return;
                }
                _this.$form.ajaxSubmit({
                    type: "post",
                    url: registerUrl,
                    data: {vCodeTypeValue: "10", vcode: $('#kapkey').val()},
                    dataType: "json",
                    success: function (result) {
                        result = util.getData(result);
                        if (result == null)return;
                        if (result) {
                            util.doAsyncPost(accountLoginUrl, function (r) {
                                r = util.getData(r);
                                if (r == null)return;
                                location.href = r;
                            }, {account: _this.$phone.val(), password: $('input[name=password]').val(), appuri: $('#appuri').val(), useruri: $('#useruri').val(), service: $('#service').val(), sid: $('#sid').val()});
                        }
                    },
                    error: function (result) {
                        nAlert("网络错误！", "提示");
                        $(".alertDialogMain").css("border", "")
                    }
                });
            },
            rules: util.createRule({phone: {zdiyRemote: validPhoneUrl}, password: null, kapkey: null}),
            messages: util.createMes({phone: {zdiyRemote: function(){return '该手机号码已注册,<a class="linkABlue" href="login.jsp?registedAccount='+$.trim($("#phone").val())+'">立即登录</a>'}}, password: null, kapkey: null})
        }));
        this.$pwd1.removeAttr('name');
    }
});