var meizuSupportMails = ['qq.com', 'sina.com', '126.com', '163.com', 'gmail.com'];
window.mzMailAuto = function(mailid, config) {
    window.mzMailAuto.curInput = null;
    var xOffset = config && config.xOffset || 0;
    var yOffset = config && config.yOffset || 52;
    if (!$('#mail').length) {
        $("<ul style='display: none;' id='mail' class='bRadius2 boxShadow10'></ul>").appendTo($(document.body));
    }
    var moveTo = function(isup) {
        var t = $('.mailchk');
        if (!t[0]) {
            $('li', $('#mail')).first().addClass('mailchk');
        } else {
            var n = isup ? t.prev() : t.next();
            if (!n[0]) return;
            t.removeClass('mailchk');
            n.addClass('mailchk');
        }
    };
    var filterMaxLen = function(val) {
        if (val && (val + '').length > 32) {
            val = val + '';
            var loc = val.indexOf('@');
            return val.substr(0, loc)
        } else {
            return val;
        }
    };
    var loadMail = function(msg) {
        var end = msg.indexOf('@'),
            len = msg.length - 1,
            tail = msg.substr(end + 1, msg.length),
            smsg = msg.substr(0, end + 1);
        var mails = meizuSupportMails,
            mCache = [];
        var mail = $('#mail');
        mail.empty();
        var arr = [];
        for (var i = 0, j = mails.length; i < j; i++) {
            var text = msg;
            if (-1 == end) {
                text = msg + '@' + mails[i];
            } else if (len == end) {
                text += mails[i];
            } else {
                if (tail != mails[i].substr(0, tail.length)) continue;
                text = smsg + mails[i];
            }
            var mtext = text.split("@")[0];
            var host = text.split("@")[1]
            if (mtext.length > 15) {
                mtext = mtext.slice(0, 15) + "...";
            }
            mail.append('<li data-mail="' + text + '" class="item"></li>');
            arr.push({
                text: mtext,
                host: "@" + host
            });
        };
        var arrLen = arr.length;
        for (var o = 0; o < arrLen; o++) {
            mail.find(".item").eq(o).text(arr[o].text + arr[o].host);
        }
        return arrLen == 0;
    };
    loadMail('');
    $('#' + mailid).focus(function() {
        window.mzMailAuto.curInput = $(this);
        var val = window.mzMailAuto.curInput.val();
        if(val != ""){
            loadMail(val);
        }
        var mail = $('#mail');
        if (!mail.find('li').length) {
            mail.hide();
        } else {
            var os = $(this).offset(),
                left = os.left,
                top = os.top;
            mail.css({
                'left': left + xOffset,
                'top': (top + yOffset)
            }).show();
        }
    }).blur(function() {
        setTimeout(function() {
            $('#mail').hide();
        }, 350);
    }).keyup(function(ev) {
        var key = ev.keyCode;
        if (key == 37 || key == 39) {
            return true;
        }
        if (key == 38) {
            moveTo(true);
            return;
        }
        if (key == 40) {
            moveTo(false);
            return;
        }
        var _input = $('#' + mailid);
        var val = (_input.val() + "").toString().replace(/\s/g, "");
        val = val.replace(/[\u4e00-\u9fa5]/g, '');
        if (_input.val() != val) {
            _input.val(filterMaxLen(val));
        }
        if (!window['G']) window['G'] = {};
        if (!G.curMail || G.curMail != val) {
            G.curMail = val;
            if (loadMail(val)) {
                $('#mail').hide()
            } else {
                $('#mail').show()
            }
        }
    }).bind('keypress', function(ev) {
        if (ev.keyCode == 13) {
            var text = $('.mailchk').attr("data-mail");
            text && $('#' + mailid).val(filterMaxLen(text));
            $('#mail').hide();
            return false;
        }
        return true;
    });
    if(!$('#mail').data('initEvent')){
        $('#mail').data('initEvent', true);
        $('.item', $('#mail')).live('mouseover mouseout click', function(ev) {
            if (ev.type == 'click') {
                $('#mail').hide();
                window.mzMailAuto.curInput.val(filterMaxLen($(this).attr("data-mail"))).focus();
            } else if (ev.type == 'mouseover') {
                $(this).addClass('mailchk');
            } else {
                $(this).removeClass('mailchk');
            }
        });
    }
    
};