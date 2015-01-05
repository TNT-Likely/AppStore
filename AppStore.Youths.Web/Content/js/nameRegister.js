var registerUrl = '/uc/system/webjsp/member/registerByFlyme';
// var isShowKapkeyUrl = '/uc/system/webjsp/member/validateSameIpRegisterCount';
var isValidFlymeUrl = '/uc/system/webjsp/member/isValidFlyme';
var isValidEMail = '/uc/system/webjsp/member/isValidEmail';
var accountLoginUrl = '/sso/login';
var showKapkeyCode = '200005';//超过注册次数
$(function(){
	$('#acceptFlyme').mzCheckBox({
        click: function(e, event) {
            var error = $('#acceptError');
            var $field = $('#rememberField');
            if(!$(e).prop('checked')){
                error.show();
                $field.css('margin-bottom', 10);
            }else{
                error.hide();
                $field.css('margin-bottom', 30);
            }
        }
    });
    var form = new Form();
    form.init();
});
var Form = function(){
	this.$form = $("#mainForm");
	this.$btn = $('#register');
    this.$imgKey = $('#imgKey');
    this.$account = $('#account');
    this.$pwd = $('#password');
    this.$pwd1 = $('#password1');
    this.$getKey = $('#getKey');
    this.$email = $("#email");
};
$.extend(Form.prototype, {
	init: function(){
		this.initParameter();
		this.initValidate();
		this.initFormEvent();
        util.initPlaceholder(this.$account, '账户名');
        util.initPlaceholder($('#email'), '安全邮箱');
        util.initPlaceholder(this.$pwd, '密码');
        util.initPlaceholder(this.$pwd1, '密码');
        this.initResize(800);
        $.floatTip({'data':[
            {'id':'account','text':'长度为4-32个字符，支持数字、字母、下划线，字母开头，字母或数字结尾','width':200,'loc': 1,'diffy': 2, 'diff': 10},
            {'id':'password','text':'长度为8-16个字符，区分大小写，至少包含两种类型','width':200,'loc': 1,'diffy': 2, 'diff': 10},
            {'id': 'kapkey', 'text': '请输入邮箱收到的验证码', 'width': 200, 'loc': 1, 'diffy': 2, 'diff': 10},
            {'id':'password1','text':'长度为8-16个字符，区分大小写，至少包含两种类型','width':200,'loc': 1,'diffy': 2, 'diff': 10},
            {'id':'email','text':'用于找回密码，提高账户安全等级','width':200,'loc': 1,'diffy': 2, 'diff': 10}
        ]});
        this.$imgKey.click();
        this.initKakey();
        util.initPlaceholder($("#kapkey"),"邮件验证码");
        util.disableVcode(this.$getKey);
        if($.browser.msie && $.browser.version == '6.0'){
            this.$pwd.focus();
            this.$pwd.blur();
        }
        mzMailAuto('email', {xOffset: -11});
    },
    initParameter:function(){
    	var appuri = util.getParameter("appuri");
		var useruri = util.getParameter("useruri");
		var service = util.getParameter("service");
		var sid = util.getParameter("sid");
		var urlSubfix = "";
		if(appuri != null){
			$('#appuri').val(appuri);
			urlSubfix = urlSubfix + "appuri="+encodeURIComponent(appuri) + "&";
		}
		if(useruri != null){
			$('#useruri').val(useruri);
			urlSubfix = urlSubfix + "useruri="+encodeURIComponent(useruri) + "&";
		}
		if(service != null){
			$('#service').val(service);
			urlSubfix = urlSubfix + "service="+encodeURIComponent(service) + "&";
		}
		if(sid != null){
			$('#sid').val(sid);
			urlSubfix = urlSubfix + "sid="+encodeURIComponent(sid);
		}
		var oldLoginHerf = $("#toLogin").attr("href");
		var oldRegisterHerf = $("#toRegister").attr("href");
		var telRegisterHref = "/register";
		if(urlSubfix != ""){
			urlSubfix = "?"+urlSubfix;
			$("#toLogin").attr("href",oldLoginHerf + urlSubfix);
			$("#toRegister").attr("href",oldRegisterHerf + urlSubfix);
			$("#toTelRegister").attr("href",telRegisterHref + urlSubfix);
		}
	},
    initKakey: function(){
    	var _this = this;
        // util.doAsyncPost(isShowKapkeyUrl, function(result){
        //     result = util.getData(result);
        //     if(result == null)return;
        //     if(result){
                $('#kapkeyWrap').show();
                _this.initResize(900);
            // }else{
            //     $('#kapkeyWrap').hide();
            //     _this.initResize(800);
            // }
        // });
    },
    showKakey: function(code){
        if(code == showKapkeyCode){
            $('#kapkeyWrap').show();
            this.initResize(900);
            return true;
        }
        return false;
    },
    initResize: function(h){
        global.resizer.setProperty('minH', h);
        $(document.body).css('min-height', h);
    },
	initInput: function($input, info){
        util.initPlaceholder($input, info, 'emptyInput');
	},
	initFormEvent: function(){
		var _this = this;
		this.$btn.click(function(){
			_this.$form.submit();
		});
		this.$form.bind("keypress", function(e){
			if (e.keyCode == 13) {
				_this.$btn.click();
			}
		});
        this.$imgKey.click(function(){
            $(this).attr('src', '/kaptcha.jpg?t='+(new Date().getTime()));
            $("#kapkey").val("");
        });
        function _createPwd(type){
            if(type == 'text'){
                _this.$pwd.val(_this.$pwd1.val());
                _this.$pwd.attr('name', 'password').show();
                _this.$pwd1.removeAttr('name').hide();
                if(!_this.$pwd.val()){
                    _this.$pwd.next('.inputTip').show();
                }
                _this.$pwd1.next('.inputTip').hide();
            }else{
                _this.$pwd1.val(_this.$pwd.val());
                _this.$pwd1.attr('name', 'password').show();
                _this.$pwd.removeAttr('name').hide();
                if(!_this.$pwd1.val()){
                    _this.$pwd1.next('.inputTip').show();
                }
                _this.$pwd.next('.inputTip').hide();
            }
            $(this).removeClass(type == 'text' ? 'pwdBtn' : 'pwdBtnShow');
            $(this).addClass(type == 'text' ? 'pwdBtnShow' : 'pwdBtn');
        };
        $('#pwdBtn').click(function(){
            if($(this).hasClass('pwdBtn')){
                _createPwd.call(this, 'text');
            }else{
                _createPwd.call(this, 'password');
            }
        });
        util.initVcode(this.$getKey, '/uc/system/vcode/sendEmailVcodeWhenReg', 60, function () {},function(after, dealCount){
            nAlert('<p>请输入图中文字</p><p class="normalInput"><input type="text" value="" name="kapmap" id="kapmap" class="kapkey" maxlength="6" autocomplete="off"><img id="imgKey" class="pointer" title="点击可刷新验证码" src="/kaptcha.jpg?t=1411024557506"></p>',"提示",function(){
                var param =  {};
                param.kapkey = $('#kapmap').val();
                param.email = _this.$email.val();
                param.vCodeTypeValue = "16";
                util.doAsyncPost('/uc/system/vcode/sendEmailVcodeWhenReg', function(result) {
                    result = util.getData(result, false, function(mes, code, callback){
                        callback();
                    });
                    if(result == true){
                        nAlert("验证码已发往邮箱"+param.email+",<br/>请前往查看并将验证码填写在输入框<br/>（30分钟内有效）","提示");
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
	},
	initValidate: function(){
		var _this = this;
		this.$form.validate($.extend(util.validate, {
            submitHandler: function(){
                if(!$('#acceptFlyme').prop('checked')){
                    return;
                }
            	_this.$form.ajaxSubmit({
                    type: "post",
                    url: registerUrl,
                    dataType: "json",
                    success: function(result){
                       result = util.getData(result, false, function(mes, code){
                            if(!_this.showKakey(code)){
                                nAlert(mes, '提示');
                                _this.$imgKey.click();
                            }
                       });
                       if(result == null)return;
                       if(result){
                     	   util.doAsyncPost(accountLoginUrl, function(r){
                     		  r = util.getData(r);
                               if(r == null)return;
                               location.href = r;
                            },{account: _this.$account.val(),password: $('input[name=password]').val(),appuri:$('#appuri').val(),useruri:$('#useruri').val(),service:$('#service').val(),sid:$('#sid').val()});
                        }
                    },
                    error: function(result){
                       nAlert("网络错误！","提示");
                    }
                });
            },
            rules: util.createRule({email: {remote:isValidEMail}, account: {remote: isValidFlymeUrl}, password: null, vcode: null}),
            messages: util.createMes({email: null, account:{remote:function(v,res){
            	if(res.code==200 && res.value==false){
            		return '该账户名已被注册,<a class="linkABlue" href="login.jsp?registedAccount='+$.trim($("#account").val())+'">立即登录</a>'
            		}
            	if(res.code==500) return res.message;
            	}}, password: null, vcode: null})
        }));
        this.$pwd1.removeAttr('name');
	}
});