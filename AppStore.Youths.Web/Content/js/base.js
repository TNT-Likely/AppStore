var global = {};
$(function() {
    global.initLanguage();
    global.setValidate();
    var resizer = global.resizer = new Resizer();
    resizer.init();
    $.extend(String.prototype, {
        trim: function() {
            if (!this) return this;
            return this.replace(/(^\s*)|(\s*$)/g, "");
        }
    });
    global.initLogin();
    global.setFormInput();
    global.initOnline();
    global.initWeChat();
});
global.initLogin = function(){
	if(util.getCookie("_islogin")){
		$('#loginWrap').show();
		$('#unloginWrap').hide();
//		util.doAsyncGet("https://member.meizu.com/uc/webjsp/member/getNickname",function(result){
//			var r = util.getData(result);
//			if(r != null){
//				$('#head-name').attr("title",r).html(r);
//				$('#loginWrap').show();
//				$('#unloginWrap').hide();
//			}		
//		});		
	}else{
		$('#loginWrap').hide();
		$('#unloginWrap').show();
	}
};
global.initLanguage = function() {
    var $globalName = $('#globalName'),
        $globalContainer = $('#globalContainer'),
        position = $globalName.position(),
        handle = null;
    $globalContainer.css({
        left: position.left,
        bottom: position.top + 50
    });
    var _globalDeal = function($o) {
        $o.on('mouseover', function() {
            clearTimeout(handle);
            $globalContainer.show();
        }).on('mouseout', function() {
            handle = setTimeout(function() {
                $globalContainer.hide();
            }, 500);
        });
    };
    _globalDeal($globalName);
    _globalDeal($globalContainer);
};

global.initOnline = function() {
    $("#service-online").live('click', function() {
    	window.open('http://bbs.meizu.cn/kf.php','_blank','height=575,width=1000,fullscreen=3,top=200,left=200,status=yes,toolbar=no,menubar=no,resizable=no,scrollbars=no,location=no,titlebar=no,fullscreen=no');
    });
};

global.initWeChat = function() {
    var $weChat = $('#footer-weChat');
    var $wechatPic = $('#wechatPic');
    $('#footer-weChat i').hover(function() {
        $wechatPic.css({
            left: $weChat.offset().left - 140,
            top: $weChat.offset().top - 276
        }).show();
    }, function() {
        $wechatPic.hide();
    }).click(function() {
        return false;
    });
};

global.setValidate = function() {
    var _addMethod = $.validator.addMethod;
    _addMethod("placeholder", function(value, element) {
        return !$(element).hasClass('emptyInput') && value != '';
    }, $.validator.messages['placeholder'] || '此处格式不正确');

    _addMethod("noEmpty", function(value, element) {
        return value.indexOf(' ') == -1;
    }, $.validator.messages['noEmpty'] || '此处格式不正确');

    _addMethod("userName", function(value, element) {
        return /^([a-zA-Z])[a-z0-9A-Z_\@\.]*[a-zA-Z0-9]$/.test(value);
    }, $.validator.messages['userName'] || '此处格式不正确');

    _addMethod("nicknameLen", function(value, element) {
        var len = value.replace(/[\u4e00-\u9fa5]/g, '**').length;
        return len >= 2 && len <= 32;
    }, $.validator.messages['nickname'] || '此处格式不正确');

    _addMethod("answerLen", function(value, element) {
        var len = value.replace(/[\u4e00-\u9fa5]/g, '**').length;
        return len >= 1 && len <= 32;
    }, $.validator.messages['nickname'] || '此处格式不正确');

    _addMethod("nickname", function(value, element) {
        return !/[^a-zA-Z0-9._\u4e00-\u9fa5]/.test(value);
    }, $.validator.messages['nickname'] || '此处格式不正确');

    _addMethod("digits6", function(value, element) {
        return /^\d{6}$/.test(value);
    }, $.validator.messages['digits6'] || '此处格式不正确');

    _addMethod("digits11", function(value, element) {
        return /^\d{11}$/.test(value);
    }, $.validator.messages['digits11'] || '此处格式不正确');

    _addMethod("phoneOk", function(value, element) {
        return /^1\d{10}$/.test(value);
    }, $.validator.messages['phoneOk'] || '此处格式不正确');

    _addMethod("money", function(value, element) {
        var first=value.charAt(0);
        var second=value.charAt(1);
        var three=value.charAt(2);
        var len = value.length;
        var index = value.indexOf('.');
        if(index != -1 && len - index > 3){//小数点后数字不能超2位
            return false;
        }
        if(/^[0-9]$/.test(first) && (second=="." || (three=="." && !/^[0-9]$/.test(second)))){
             return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
        }
        if(first=="0"){
            value=value+"*";
        }
        return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
    }, $.validator.messages['money'] || '此处格式不正确');

    _addMethod("accountChar", function(value, element) {
        return !/[^\da-zA-Z\~\!\@\#\$\%\^\&\*\(\)_\-\+\{\}\|\:\"\<\>\?`\[\];\',\.\/]/.test(value);
    }, $.validator.messages['accountChar'] || '此处格式不正确');

    _addMethod("accountTowType", function(value, element) {
        return /^((?=.*?\d)(?=.*?[A-Za-z])|(?=.*?\d)(?=.*?[!@#$%^&*/().,\]\[_+{}|:;<>?'"`~-])|(?=.*?[A-Za-z])(?=.*?[!@#$%^&*/().,\]\[_+{}|:;<>?'"`~-]))[\dA-Za-z!@#$%^&*/().,\]\[_+{}|:;<>?'"`~-]+$/.test(value);
    }, $.validator.messages['accountTowType'] || '此处格式不正确');

    _addMethod("accountNoEq", function(value, element) {
        var $account = $('#account');
        if (!$account.length) return true;
        return value != $account.val();
    }, $.validator.messages['accountNoEq'] || '此处格式不正确');

    _addMethod("pRequired", function(value, element) {
        var r = ($.trim(value).length > 0);
        var $getKey = $('#getKey');
        if (!r && $getKey.length) {
            util.disableVcode($getKey);
        }
        return r;
    }, '不能为空');

    var oldEmai = $.validator.methods['email'];
    _addMethod("pEmail", function(value, element, param) {
        var r = oldEmai.call(this, value, element, param);
        r = r && !/[\u4e00-\u9fa5]/g.test(value);
        var $getKey = $('#getKey');
        if (!$getKey.length) {
            return r;
        }
        if (r) {
            util.activeVcode($getKey);
        } else {
            util.disableVcode($getKey);
        }
        return r;
    }, $.validator.messages['pEmail'] || '此处格式不正确');

        
	_addMethod("pNoCheckEmail", function(value, element, param) {
	    var $getKey = $('#getKey');
	    if (!$getKey.length) {
	        return true;
	    }
	    util.activeVcode($getKey);
	    return true;
	}, $.validator.messages['pEmail'] || '此处格式不正确');

    _addMethod("ppDigits11", function(value, element) {
        var r = /^1\d{10}$/.test(value);
        var $getKey = $('#getKey');
        if (!$getKey.length) {
            return r;
        }
        if (!r) {
            util.disableVcode($getKey);
        }
        return r;
    }, $.validator.messages['ppDigits11'] || '此处格式不正确');

    _addMethod("pDigits11", function(value, element) {
        var r = /^1\d{10}$/.test(value);
        var $getKey = $('#getKey');
        if (!$getKey.length) {
            return r;
        }
        if (r) {
            util.activeVcode($getKey);
        } else {
            util.disableVcode($getKey);
        }
        return r;
    }, $.validator.messages['pDigits11'] || '此处格式不正确');

    _addMethod("nameOrD11", function(value, element) {
        return /^([a-zA-Z]+)+[a-z0-9A-Z_\@\.]+[a-zA-Z0-9]$/.test(value) || /^\d{11}$/.test(value);
    }, $.validator.messages['nameOrD11'] || '此处格式不正确');

    var oldRemote = $.validator.methods['remote'];

    _addMethod("znameRemote", function(value, element, param) {
        return oldRemote.call(this, value, element, param + '?nickname=' + $('#nickname').val());
    }, $.validator.messages['nameRemote'] || '此处格式不正确');

    _addMethod("znnameRemote", function(value, element, param) {
        return oldRemote.call(this, value, element, param + '?nickname=' + $('#nickname').val());
    }, $.validator.messages['znnameRemote'] || '此账户名已被抢注');

    _addMethod("zdiyRemote", function(value, element, param) {
        var newParam = param;
        var validator = this;
        var previous = this.previousValue(element);
        previous.originalMessage = this.settings.messages[element.name].remote;
        var $getKey = $('#getKey');
        var callBackFun = function(){};
        if(!util.isString(param)){
            callBackFun = param.callback;
            param = param.url;
        }
        if (util.isString(param)) {
            newParam = {
                url: param,
                success: function(response) {
                    validator.settings.messages[element.name].remote = previous.originalMessage;
                    var r = util.getData(response, false, function() {});
                    var valid = r === true || r === "true";
                    if (valid) {
                        var submitted = validator.formSubmitted;
                        validator.prepareElement(element);
                        validator.formSubmitted = submitted;
                        validator.successList.push(element);
                        delete validator.invalid[element.name];
                        validator.showErrors();
                        if ($getKey.length) {
                            util.activeVcode($getKey);
                        }
                    } else {
                        var errors = {};
                        var message = r || validator.defaultMessage(element, "zdiyRemote");
                        if (response.code != '200') {
                            message = response.message;
                        }
                        // if(response.code == '110000'){
                        //     message += ',<a class="linkABlue" href="login.jsp">立即登录</a>';
                        //     validator.settings.messages[element.name].zdiyRemote = message;
                        // }
                        errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
                        validator.invalid[element.name] = true;
                        validator.showErrors(errors);
                        if ($getKey.length) {
                            util.disableVcode($getKey);
                        }
                    }
                    previous.valid = valid;
                    if($.isFunction(callBackFun)){
                        callBackFun(valid);
                    }
                    validator.stopRequest(element, valid);
                }
            }
        }
        return oldRemote.call(this, value, element, newParam);
    }, $.validator.messages['zdiyRemote'] || '此处格式不正确');
};
global.setFormInput = function() {
    $('form input').focus(function() {
        var $temp = $(this).parent('.normalInput');
        $(this).removeClass('error');
        $(this).removeClass('checked');
        $(this).next('span.error').remove();
        if ($temp.length) {
            $temp.removeClass('error');
            $temp.removeClass('checked');
            $temp.next('span.error').remove();
            if (!global.isNotMiddleForm) {
                $temp.css('margin-bottom', 20);
            }
        } else {
            if (!global.isNotMiddleForm) {
                $(this).css('margin-bottom', 20);
            }
        }
    });
};
var Resizer = function() {
    this.minH = 700;
    this.$footer = $('#flymeFooter');
    this.$con = $('#content');
    this.fHeight = this.$footer.height() + 1;
};
$.extend(Resizer.prototype, {
    init: function() {
        this.resize = this.resize();
        this.resize();
        var timeout = null,
            _this = this;
        $(window).on('resize', function() {
            var $globalName = $('#globalName'),
                $globalContainer = $('#globalContainer'),
                position = $globalName.position();
            $globalContainer.css({
                left: position.left,
                bottom: position.top + 50
            });
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                if (!_this.status) {
                    _this.resize();
                }
            }, 100);
        });
    },
    setProperty: function(p, v, accountH, status) { //accountH   帐户管理页的高度控制  status 帐户管理页为 true
        this[p] = v;
        this.resize(accountH, status);
    },
    resize: function(accountH, status) {
        var _this = this;
        return function(accountH, status) {
            var winH = $(window).height();
            if (status) {
                _this.status = true;
            }
            if (winH < _this.minH) {
                winH = _this.minH;
            }
            if (accountH) {
                winH = accountH + _this.fHeight;
            }
            _this.$footer.css('top', winH - _this.fHeight);
        };
    }
});