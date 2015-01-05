var loginUrl = 'https://member.meizu.com/sso/login';
var reloginUrl = 'https://member.meizu.com/sso/dorelogin';
var checkAccountUrl = 'https://member.meizu.com/sso/needShowKapkey';
var showKapkeyCode = 403001;//超过出错次数
var showErrorKakeyCode = 403002;//验证码错误
var showAccountErrorCode = 403003;//账号错误
var showPasswordErrorCode = 403006;//密码错误
var showLoginBusyCode = 500;//系统繁忙
$(function () {
    var form = new Form();
    form.init();
});
var Form = function () {
    this.$form = $("#mainForm");
    this.$btn = $('#login');
    this.$imgKey = $('#imgKey');
    this.$account = $('#account');
    this.$pwd = $('#password');
    this.$remember = $('#remember');
    this.reloginFlag = $('#reloginFlag').val();
};
$.extend(Form.prototype, {
    init: function () {
    	var url = location.href;
    	if(url.indexOf("?registedAccount=")!=-1){
    		var url_params = url.split("?")[1], url_object = {}, temp;
    		url_params = url_params.split("&");
    		for(var l=0; l<url_params.length; l++){
    			temp = url_params[l].split("=");
    			url_object[temp[0]] = temp[1];
    		}
    		if(!!url_object['registedAccount']) this.$account.val(url_object['registedAccount']);
    	}
        this.$account.focus();
        this.initParameter();
        this.initValidate();
        this.initFormEvent();
        util.initPlaceholder(this.$account, '手机号/ Flyme 账户名');
        util.initPlaceholder(this.$pwd, '密码');
        this.initRemember();
        this.$imgKey.click();
        //this.initQrCode();
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
        if (urlSubfix != "") {
            urlSubfix = "?" + urlSubfix;
            $("#toLogin").attr("href", (oldLoginHerf + urlSubfix));
            $("#toRegister").attr("href", (oldRegisterHerf + urlSubfix));
        }
    },
    initRemember: function () {
    	this.$remember.mzCheckBox({
    		click: function (e, event) {}
    	});
    },
    showKakey: function (code, mes) {
        if (code == showKapkeyCode) {
            $('#kapkeyWrap').show();
            util.addTips("password", mes);
            this.initResize(900);
            return true;
        }
        if (code == showErrorKakeyCode) {
            $('#kapkeyWrap').show();
            util.addTips("kapkey", mes);
            this.initResize(900);
            return true;
        }
        return false;
    },
    showErrorTips: function (code, mes) {
        if (code == showPasswordErrorCode || code == showAccountErrorCode) {
            util.addTips("password", mes);
            return true;
        }
        if (code == showLoginBusyCode){
            nAlert(mes);
            return true;
        }
        return false;
    },
    initQrCode:function(){
    	var qrPanel = $("#qrCodePanel"), confirmTimer = null, timer = null, isIE6 = parseInt($.browser.version,10)===6, ltIE9 = parseInt($.browser.version,10)<9;
    	var qrUrl = "https://member.meizu.com/mzQrShow?qrType=0&t=";
    	qrPanel.hide();
    	if(!isIE6 && ltIE9){
    		qrPanel.find(".qrCodePanel_arrow").hide();
    		qrPanel.css({"width":360,"height":254,"background":"#fff url('/resources/uc/member/images/qrDiaBg.png') no-repeat 0 0"})
    			.find("h3").css("margin-top",30);
    	}
    	if(isIE6){
    		qrPanel.css({"width":358,"height":254}).find("h3").css("margin-top",30);
    	}
    	$("#qrCode_login").live("mouseenter",function(e){
    		if(qrPanel.is(":visible")) return;
    		qrPanel.find(".tips").show();
    		qrPanel.find(".qrCodePanel_tips").hide();
    		e.stopPropagation();
    		if(timer) clearTimeout(timer);
    		if(confirmTimer) clearInterval(confirmTimer);
    		var offset = $(this).offset();
    		$("#qrCodePanel img").attr("src",qrUrl+(new Date()).getTime());
    		qrPanel.css({"top":ltIE9?offset.top+18:offset.top+32,"left":($(window).width()-qrPanel.width())/2}).stop(1,1).fadeIn(300,function(e){
    			if(confirmTimer) clearInterval(confirmTimer);
    			confirmTimer = setInterval(function(){
    				util.doAsyncGet("https://member.meizu.com/mzQrLogin?qrType=0",function(data){
        				var r = util.getData(data);
        				if(r.confirmed) {
        					clearInterval(confirmTimer);
        					if(r.loginurl && $.trim(r.loginurl)!="") location.href = r.loginurl;
        					return;
        				}
        				if(r.authenticated){
        					qrPanel.find(".tips").fadeOut(300,function(e){
        						qrPanel.find(".qrCodePanel_tips").fadeIn(300);
        					});        					
        					return;
        				}
        				if(r.timeout){
        					$("#qrCodePanel img").attr("src",qrUrl+(new Date()).getTime());
        					return;
        				}
        			});
        		},3000);    			
    		});    		
    	});
    	qrPanel.live("mouseenter",function(e){
    		if(timer) clearTimeout(timer);
    		qrPanel.show();
    	});
    	$(document).live("click",function(e){
    		if($(e.srcElement).attr("id")=="qrCodePanel" || $(e.srcElement).attr("id")=="qrCode_login") return;
    		if(qrPanel.is(":visible")) {
    			qrPanel.fadeOut(300,function(e){
    				if(confirmTimer) clearInterval(confirmTimer);
    				util.doAsyncGet("https://member.meizu.com/mzCancelQrLogin?qrType=0",function(res){
    					var r = util.getData(res);
    				});
    			});
    		}
    	});
    	$(window).resize(function(e){
    		var offset = $("#qrCode_login").offset();
    		qrPanel.css({"top":ltIE9?offset.top+18:offset.top+32,"left":($(window).width()-qrPanel.width())/2})
    	});
    },
    initResize: function (h) {
        global.resizer.setProperty('minH', h);
        $(document.body).css('min-height', h);
    },
    initInput: function ($input, info) {
        util.initPlaceholder($input, info, 'emptyInput');
    },
    initFormEvent: function () {
        var _this = this;
        this.$btn.click(function () {
            _this.$form.submit();
        });
        var timeout = null;
        this.$form.bind("keypress", function (e) {
            if (e.keyCode == 13) {
                _this.$btn.click();
            }
        });
        this.$imgKey.click(function () {
            $(this).attr('src', '/kaptcha.jpg?t=' + (new Date().getTime()));
            $("#kapkey").val("");
        });
    },
    initValidate: function () {
        var _this = this;
        util.rule.account = util.rule.accountOrPhone;
        util.message.account = util.message.accountOrPhone;
        util.rule.account.nameOrD11 = undefined;
        var rules = util.createRule({account: null, kapkey: null});
        var messages = util.createMes({account: null, kapkey: null});
        var oldRemote = $.validator.methods['remote'];
        $.validator.addMethod('zRemote', function (value, element, param) {
            var newParam = param;
            var validator = this;
            var previous = this.previousValue(element);
            previous.originalMessage = this.settings.messages[element.name].remote;
            if (util.isString(param)) {
                newParam = {
                    url: param,
                    success: function (response) {
                        validator.settings.messages[element.name].remote = previous.originalMessage;
                        var r = util.getData(response, false, function () {
                        });
                        var valid = r === true || r === "true";
                        if (valid) {
                            $('#kapkeyWrap').show();
                        } else {
                            $('#kapkeyWrap').hide();
                        }
                        valid = true;
                        if (valid) {
                            var submitted = validator.formSubmitted;
                            validator.prepareElement(element);
                            validator.formSubmitted = submitted;
                            validator.successList.push(element);
                            delete validator.invalid[element.name];
                            validator.showErrors();
                        }
                        previous.valid = valid;
                        validator.stopRequest(element, valid);
                    }
                }
            }
            return oldRemote.call(this, value, element, newParam);
        }, $.validator.messages['zRemote'] || '此处格式不正确');

        rules.password = {
            required: true
        };
        rules.account.zRemote = checkAccountUrl;
        messages.password = {
            required: "密码不能为空"
        };
        messages.account.zdiyRemote = '';

        this.$form.validate($.extend(util.validate, {
            submitHandler: function () {
                if (_this.reloginFlag) {
                    loginUrl = reloginUrl;
                }
                _this.$form.ajaxSubmit({
                    type: "post",
                    url: loginUrl,
                    dataType: "json",
                    success: function (result) {
                        var data = util.getData(result, false, function (mes, code) {
                            if (code != '200' && _this.$imgKey.is(':visible')) {
                                _this.$imgKey.click();
                            }
                            if (_this.showKakey(code, mes)) {
                                return;
                            }
                            if (_this.showErrorTips(code, mes)) {
                                return;
                            }
                        });
                        if (data == null) {
                            if (result.code == showKapkeyCode || result.code == showPasswordErrorCode) {
                                _this.$pwd.val('');
                            }
                            return;
                        };
                        location.href = data;
                    },
                    error: function (result) {
                        nAlert("网络错误！", "提示");
                    }
                });
            },
            rules: rules,
            messages: messages
        }));
    }
});