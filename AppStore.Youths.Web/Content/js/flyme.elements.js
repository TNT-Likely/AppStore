(function($) {
    var ie = $.browser.msie,
        iev = $.browser.version,
        ie6 = ie && iev < 7,
        ie7 = ie && iev == 7,
        ie8 = ie && iev > 7,
        ie67 = ie6 || ie7,
        ie68 = ie6 || ie8,
        ff = $.browser.mozilla,
        ie11 = ff && iev == 11,
        ff2 = ff && !(iev == 11) && navigator.userAgent.toLowerCase().match(/firefox\/([\d.]+)/)[1].charAt(0) - 3 < 0,
        safari = $.browser.safari,
        isAndroid = /Android/.test(navigator.userAgent),
        iPad = /iPad/.test(navigator.userAgent),
        iPhone = /iPhone/.test(navigator.userAgent),
        ismobile = isAndroid || iPad || iPhone,
        css3 = !ie6 && !ie7 && !ie8 && !ff2 ? true : false;
    $.meizu = {
        ie: ie,
        ie6: ie6,
        ie7: ie7,
        ie8: ie8,
        ie67: ie67,
        ie68: ie68,
        ie11: ie11,
        ff: ff,
        ff2: ff2,
        safari: $.browser.safari,
        ismobile: ismobile,
        zindex: 1e4,
        css3: css3
    };
    var html1 = '<span class="radioPic">&nbsp;</span>';
    var html2 = '<span class="checkboxPic"><i class="i_icon"></i></span>';

    function radio(opt) {
        var d1 = new Date().getTime();
        var defaults = {
            chkCls: "radio_chk",
            unChkCls: "radio_unchk",
            spanCls: "mzradio",
            click: null,
            host: null
        };
        var proto = this;
        this.options = $.extend(defaults, opt);
        this.options.host.each(function() {
            proto.bind($(this));
        });
        var d2 = new Date().getTime();
    }
    radio.prototype = {
        bind: function(radio) {
            var pic = $(html1),
                span = radio.hide().parent().prepend(pic),
                proto = this,
                opt = proto.options,
                host = opt.host;
            if (radio.get(0).checked) {
                pic.addClass(opt.chkCls);
                host.data("key", pic);
            } else {
                pic.addClass(opt.unChkCls);
            }
            var _click = function() {
                var con = $(this),
                    pic = $(con.find("span")[0]),
                    radio = $(con.find("input")[0]);
                if (!pic.hasClass(opt.chkCls)) {
                    proto.chose(radio);
                }
            };
            span.addClass(opt.spanCls).click(_click);
        },
        chose: function(radio, triger) {
            var opt = this.options,
                pic = $(radio.attr("checked", "checked").parent().find("span")[0]),
                key = opt.host.data("key");
            !triger && opt.click && opt.click.call(radio, {
                value: radio.val()
            });
            if (key) key.addClass(opt.unChkCls).removeClass(opt.chkCls);
            pic.addClass(opt.chkCls).removeClass(opt.unChkCls);
            opt.host.data("key", pic);
        },
        val: function(j) {
            if (j) this.setVal(j);
            else return this.getVal();
        },
        setVal: function(val, canClick) {
            var proto = this,
                host = proto.options.host;
            host.each(function() {
                if (val == this.value) {
                    proto.chose($(this), canClick ? false : true);
                    return false;
                }
            });
        },
        getVal: function() {
            var val;
            this.options.host.each(function() {
                if (this.checked) {
                    val = this.value;
                    return false;
                }
            });
            return val;
        }
    };

    function checkbox(opt) {
        var defaults = {
            chkCls: "check_chk",
            unChkCls: "check_unchk",
            spanCls: "mzchkbox",
            click: null,
            host: null,
            serverInit: false
        };
        this.options = $.extend(defaults, opt);
        var proto = this,
            host = this.options.host,
            all = host.length;
        if (!all) return;
        if (this.options.serverInit) {
            this._fastBind2();
        } else if (all > 15) {
            this._fastBind1();
        } else {
            for (var i = 0; i < all; i++) {
                this.bind($(host[i]), false);
            }
        }
    }
    checkbox.prototype = {
        chose: function(cbox, chose, nochose) {
            var opt = this.options,
                pic = $(cbox.parent().find("span")[0]);
            if (!nochose && (chose || !pic.hasClass(opt.chkCls))) {
                pic.removeClass(opt.unChkCls).addClass(opt.chkCls);
                cbox.attr("checked", "checked");
            } else {
                pic.removeClass(opt.chkCls).addClass(opt.unChkCls);
                cbox.removeAttr("checked");
            }
        },
        _fastBind1: function() {
            var _self = this,
                opt = _self.options,
                host = opt.host,
                all = host.length;
            for (var i = 0; i < all; i++) {
                var cbox = $(host[i]),
                    pic = $(html2);
                cbox.hide().parent().prepend(pic);
                _self._oBind(cbox, pic, opt.chkCls, opt.unChkCls);
            }
            setTimeout(function() {
                for (var j = 0; j < all; j++) {
                    var cbox = $(host[j]),
                        span = cbox.parent();
                    _self._eBind(cbox, span, false, opt.spanCls);
                }
            }, 10);
        },
        _fastBind2: function() {
            var _self = this,
                host = _self.options.host,
                spanCls = _self.options.spanCls,
                all = host.length;
            for (var j = 0; j < all; j++) {
                var cbox = $(host[j]),
                    span = cbox.parent();
                _self._eBind(cbox, span, false, spanCls);
            }
        },
        _eBind: function(cbox, span, isnew, spanCls) {
            var proto = this;
            if (isnew) proto.options.host.push(cbox[0]);
            var _click = function(e) {
                proto.chose(cbox);
                proto.options.click && proto.options.click.call(cbox[0], {
                    value: cbox.val(),
                    checked: cbox.attr("checked")
                }, e);
            };
            span.click(_click).addClass(spanCls);
        },
        _oBind: function(cbox, pic, chkCls, unChkCls) {
            if (cbox.get(0).checked) {
                pic.addClass(chkCls);
            } else {
                pic.addClass(unChkCls);
            }
        },
        bind: function(cbox, isnew) {
            var pic = $(html2),
                span = cbox.hide().parent().prepend(pic),
                opt = this.options,
                host = opt.host;
            this._oBind(cbox, pic, this.options.chkCls, this.options.unChkCls);
            this._eBind(cbox, span, isnew, opt.spanCls);
        },
        val: function(j) {
            if (j && j.length) {
                this.setVal(j);
            } else {
                return this.getVal();
            }
        },
        setVal: function(j) {
            if (!j || !j.length) return;
            var host = this.options.host;
            for (var i = 0, k = j.length; i < k; i++) {
                for (var ci = 0, ck = host.length; ci < ck; ci++) {
                    if (host[ci].value == j[i]) this.chose($(host[ci]), true);
                }
            }
        },
        getVal: function() {
            var host = this.options.host,
                ay = [];
            for (var i = 0, j = host.length; i < j; i++) {
                if (host[i].checked) ay.push(host[i].value);
            }
            return ay;
        },
        checkAll: function() {
            var host = this.options.host;
            for (var i = 0, j = host.length; i < j; i++) {
                this.chose($(host[i]), true);
            }
        },
        uncheckAll: function() {
            var host = this.options.host;
            for (var i = 0, j = host.length; i < j; i++) {
                this.chose($(host[i]), true, true);
            }
        },
        uncheck: function(val) {
            if (!val) return;
            var host = this.options.host;
            for (var i = 0, j = host.length; i < j; i++) {
                if (host[i].value == val) {
                    this.chose($(host[i]), true, true);
                    return;
                }
            }
        },
        size: function() {
            return this.options.host.length;
        }
    };

    function makeLayOuter(jop) {
        var opt = $.extend({
            start: false,
            end: false,
            host: null,
            position: "cover",
            fJobj: false,
            timeout: 500
        }, jop);
        $("body").append("<div id='meizuSelectID_" + (makeLayOuter.uuid += 1) + "' class='mzContainer'></div>");
        var layOuter = $("#meizuSelectID_" + makeLayOuter.uuid).html("&nbsp;");
        layOuter.data("isIn", false).data("abled", true);
        opt.fJobj && opt.fJobj.bind("click", {
            opt: opt,
            lay: layOuter
        }, makeLayOuter._fns["_show"]);
        opt.host.bind("click", {
            opt: opt,
            lay: layOuter,
            xlen: opt.xlen,
            ylen: opt.ylen
        }, makeLayOuter._fns["_show"]);
        makeLayOuter._hover(layOuter, opt.host, opt.timeout, opt.end);
        makeLayOuter._hover(layOuter, layOuter, opt.timeout, opt.end);
        return layOuter;
    }
    makeLayOuter._fns = {
        _outFn: function(e) {
            var lay = e.data.lay.data("isIn", false);
            setTimeout(function() {
                if (!lay.data("isIn")) {
                    lay.hide();
                    e.data.end && e.data.end();
                }
            }, e.data.delay);
        },
        _inFn: function(e) {
            e.data.lay.data("isIn", true);
        },
        _show: function(e) {
            var opt = e.data.opt,
                lay = e.data.lay;
            opt.start && opt.start();
            if (!lay.data("abled")) return;
            var host = $(this),
                pos = host.offset(),
                sh = opt.position === "cover" ? pos.top : pos.top + host.height(),
                left = pos.left + (opt.xlen ? opt.xlen : 0),
                top = sh + (opt.ylen ? opt.ylen : 0);
            lay.css({
                left: left,
                top: top
            }).show();
            e.data.opt.curObj = host;
        }
    };
    makeLayOuter._close = function(lay, end) {
        lay.data("isIn", false);
        lay.hide();
        end && end();
    }, makeLayOuter._hover = function(lay, target, delay, end) {
        var param = {
            lay: lay,
            delay: delay,
            end: end
        };
        target.mouseenter(param, makeLayOuter._fns["_inFn"]).mouseleave(param, makeLayOuter._fns["_outFn"]);
    };
    makeLayOuter._unHover = function(j) {
        j.unbind("mouseenter", makeLayOuter._fns["_inFn"]).unbind("mouseleave", makeLayOuter._fns["_outFn"]).unbind("click", makeLayOuter._fns["_show"]);
    };
    makeLayOuter.html = function(c) {
        var opt = $.extend({
            jdom: null,
            html: null,
            maxH: 0,
            width: 0,
            hostw: 0
        }, c);
        if (!opt.jdom || !opt.html) return 0;
        opt.jdom.empty().append(opt.html);
        var w = opt.jdom.width(),
            sw = opt.hostw,
            h = opt.jdom.height();
        if (opt.hostw && w < sw) w = sw;
        if (opt.maxH && h >= opt.maxH) {
            opt.jdom.css({
                height: opt.maxH + "px",
                overflowY: "scroll"
            });
            w += 10;
        }
        if (opt.width) w = opt.width;
        return w;
    };
    makeLayOuter.uuid = 0;

    function select(opt) {
        var defaults = {
            click: "",
            data: "",
            maxH: "",
            itemOver: "mzItemOver",
            pos: "down",
            chgHost: false,
            width: false,
            disClk: false,
            start: false,
            end: false,
            focus: null,
            nowidth: true,
            needTitle: false,
            itemChk: "mzItemChecked",
            timeout: 500,
            xlen: 0,
            ylen: 0
        };
        this.options = $.extend(defaults, opt);
        var opt = this.options;
        opt.host.data("lj", makeLayOuter({
            host: opt.host,
            start: opt.start,
            end: opt.end,
            position: opt.pos,
            fJobj: opt.focus,
            xlen: opt.xlen,
            ylen: opt.ylen
        }));
        this.options.curObj = this.options.host;
        this.reload(opt.data, false, true);
    }
    select.prototype = {
        addHost: function(j) {
            var opt = this.options,
                lay = opt.host.data("lj");
            makeLayOuter._hover(lay, j, opt.timeout, opt.end);
            j.bind("click", {
                opt: opt,
                lay: lay
            }, makeLayOuter._fns["_show"]);
        },
        rmvHost: function(j) {
            makeLayOuter._unHover(j);
        },
        close: function() {
            var opt = this.options;
            makeLayOuter._close(opt.host.data("lj"), opt.end);
        },
        reload: function(j, isHtml, isInit) {
            var proto = this,
                opt = proto.options,
                host = opt.host,
                lj = host.data("lj").css({
                    height: "auto",
                    overflowY: "",
                    cursor: "pointer"
                }),
                ay = [];
            if (!isHtml) {
                ay.push("<ul>");
                if (j && j.length) {
                    for (var m = 0, n = j.length; m < n; m++) {
                        var unit = j[m];
                        ay.push("<li onclick='javascript:void(0)' class='mzSelectLi " + (unit["selected"] ? opt["itemChk"] : "") + "' ivalue='" + unit.value + "'><div class='" + (unit.title ? " longdot" : "") + "'title='" + (unit.title ? unit.title : "") + "'>" + unit.text + "</div></li>");
                    }
                }
                ay.push("</ul>");
                opt.jsondatas = j;
            }
            var w = makeLayOuter.html({
                jdom: lj,
                html: isHtml ? j : ay.join(""),
                maxH: opt.maxH,
                width: opt.width,
                hostw: opt.nowidth ? 0 : host.width()
            });
            if (isInit) this._eventBind(opt, host, w);
        },
        setVal: function(val) {
            if (this.options.jsondatas) {
                for (var i = 0, j = this.options.jsondatas.length; i < j; i++) {
                    if (this.options.jsondatas[i].value == val) {
                        this.options.jsondatas[i].selected = true;
                    } else {
                        this.options.jsondatas[i].selected = false;
                    }
                }
                this.reload(this.options.jsondatas);
            }
        },
        _eventBind: function(opt, host, w) {
            var proto = this;
            $("li", host.data("lj")).each(function() {
                $(this).width(w);
            }).live("click mouseenter mouseleave", function(event) {
                if (event.type == "click") {
                    if (!opt.disClk) {
                        host.data("lj").hide();
                    }
                    var jobj = $(this),
                        val = jobj.attr("ivalue"),
                        text = jobj.text();
                    opt.click && opt.click.call(proto.options.curObj, {
                        value: val,
                        text: text,
                        jobj: host
                    });
                    proto.setVal(val);
                } else if (event.type == "mouseenter") {
                    $(this).addClass(opt.itemOver);
                } else if (event.type == "mouseleave") {
                    $(this).removeClass(opt.itemOver);
                }
            });
        },
        html: function(j) {
            if (!j) return;
            return this.reload(j, true);
        },
        disable: function() {
            this.options.host.data("lj").data("abled", false);
        },
        enable: function() {
            this.options.host.data("lj").data("abled", true);
        },
        remove: function() {
            var lj = this.options.host.data("lj");
            lj.children().each(function() {
                $(this).unbind();
            });
            lj.empty().remove();
            this.options.host.removeData("lj");
            this.options.host = null;
            this.options = null;
        }
    };

    function pager(o) {
        var _self = this.reload(o);
        var pageClick = function(page) {
            var opt = _self.options;
            if (opt.callBack) {
                /*if (!_self.block) {
                    var _tmp = _self.options.host, w = _tmp.width(), h = _tmp.height(), oset = _tmp.offset(), l = oset.left, t = oset.top;
                    _tmp.addClass("overOpac5");
                    _self.block = $("<div></div>").appendTo($(document.body)).css({
                        width: w,
                        height: h,
                        left: l,
                        top: t,
                        fontSize: "18px",
                        position: "absolute",
                        paddingLeft: "100px"
                    });
                } else {
                    var _tmp = _self.options.host, w = _tmp.width(), h = _tmp.height(), oset = _tmp.offset(), l = oset.left, t = oset.top;
                    _self.block.css({
                        width: w,
                        height: h,
                        left: l,
                        top: t,
                        fontSize: "18px",
                        position: "absolute",
                        paddingLeft: "100px"
                    }).show();
                }*/
                _self.options.pagenumber = page;
                opt.callBack(page);
            } else {
                var gpage = opt.toPage + Number(page);
                window.location = gpage;
            }
        };
        $("a", _self.options.host).die().live("click", function() {
            var J = $(this);
            var opt = _self.options;
            if (J.hasClass("liNoThisClass")) {
                var page = 0;
                page = $.trim(J.text() + "") - 0;
                if (!page) {
                    page = $.trim(J.attr("rno")) - 0;
                }
                if (page !== opt.pagenumber) {
                    pageClick.call(null, page);
                }
            } else if (J.hasClass("pre")) {
                if (opt.pagenumber !== 1) {
                    pageClick.call(null, opt.pagenumber - 1);
                }
            } else if (J.hasClass("next")) {
                if (opt.pagenumber !== opt.pagecount) pageClick.call(null, opt.pagenumber + 1);
            }
        });
        return this;
    }
    pager.prototype = {
        block: null,
        reload: function(o) {
            this.options = $.extend(this.options ? this.options : {
                pagenumber: 1,
                pagecount: 1,
                maxPage: 5,
                pageSize: 10,
                totalCount: 1,
                callBack: null,
                toPage: null,
                noLF: false
            }, o);
            this.options.pagecount = Math.ceil(this.options.totalCount / this.options.pageSize);
            this.html(this.options.callBack ? true : false, this.options.host, parseInt(this.options.pagenumber), parseInt(this.options.pagecount), this.options.maxPage, this.options.noLF);
            if (this.block) {
                this.options.host.removeClass("overOpac5");
                this.block.hide();
            }
            return this;
        },
        getCurPage: function() {
            return this.options.pagenumber;
        },
        html: function(ajax, host, pno, pc, mp, noLF) {
            var $pager = $('<div class="pageDiv"></div>'),
                buffer = [],
                bText = ajax ? "javascript:void(0)" : "#",
                from = 1,
                to = parseInt(mp),
                temp = [];
            if (pc < 2) {
            	host.empty();
                return;
            }
            var offset = Math.floor(mp * 0.5);
            if (mp > pc) {
                from = 1;
                to = pc;
            } else {
                from = pno - offset;
                to = from + mp - 1;
                if (from < 1) {
                    to = pno + 1 - from;
                    from = 1;
                    if (to - from < mp) {
                        to = mp;
                    }
                } else
                if (to > pc) {
                    from = pc - mp + 1;
                    to = pc;
                }
            }
            // if (!noLF && pno > 1) {
            // buffer.push("<a class='pre bRadius2' href='" + bText + "'>" + (window["G_isCht"] ? "上一頁" : "上一页") + "</a>");
            // }
            if (from != 1 && pno != from && pc > mp) {
                buffer.push("<a class='bRadius2 liNoThisClass' href='" + bText + "' rno='1'>" + (noLF ? "<" : 1) + "</a>");
                buffer.push("<a class='bRadius0 pomit' href='javascript:void(0)'>...</a>");
                from += 2;
            }
            if (to != pc && pno != to && pc > mp) {
                temp.push("<a class='bRadius0 pomit' href='javascript:void(0)'>...</a>");
                temp.push("<a class='bRadius2 liNoThisClass' href='" + bText + "' rno='1'>" + (noLF ? "<" : pc) + "</a>");
                to -= 2;
            }
            for (var i = from; i <= to; i++) {
                buffer.push("<a class='" + (i == pno ? "selected bRadius0" : "liNoThisClass bRadius2") + "' href='" + bText + "'>" + i + "</a>");
            }
            buffer = buffer.concat(temp);

            if (!noLF && pno < pc) {
                buffer.push("<a class='next bRadius2' href='" + bText + "'>" + (window["G_isCht"] ? "下一頁" : "下一页") + "</a>");
            }
            $pager.append(buffer.join(""));
            host.empty().append($pager);
        }
    };

    function panel(c) {
        var defaults = {
            content: "",
            pos: "down",
            width: false,
            openAction: null,
            model: false,
            xlen: 0,
            ylen: 0
        };
        this.options = $.extend(defaults, c);
        var opt = this.options;
        var layerJobj = makeLayOuter({
            host: opt.host,
            position: opt.pos,
            timeout: 800,
            openAct: opt.openAction,
            xlen: opt.xlen,
            ylen: opt.ylen
        });
        layerJobj.empty().append(opt.content);
        opt.width && layerJobj.width(opt.width);
        opt.host.data("lj", layerJobj);
    }
    panel.prototype.close = function() {
        this.options.host.data("lj").hide();
    };

    function dialog(c) {
        var defaults = {
            host: null,
            width: false,
            height: false,
            nohide: true
        };
        this.options = $.extend(defaults, c);
    }
    dialog.uuid = 0;
    dialog.prototype = {
        _createBtns: function(winDiv) {
            var _self = this;
            if (this.options.closeBtn) {
                winDiv.append($('<div class="mzClose"></div>').click(function() {
                    _self.close();
                    $.isFunction(_self.options.closeBtn) && _self.options.closeBtn.call();
                }));
            }
        },
        open: function() {
            $("html").css("overflow","hidden");
            var _self = this;
            var opt = this.options;
            var blockID = opt.blockID;
            if (!this.options.blockID) {
                blockID = opt.blockID = $.block.open(opt.nohide);
                if ($.isFunction(opt.blkClose)) {
                    $("#" + blockID).on("click", opt.blkClose);
                }
            } else {
                $.block.reOpen(opt.blockID, opt.nohide);
            }
            var block = $("#" + blockID);
            var winDiv;
            if (!opt.winid) {
                $(document.body).append($('<div class="mzdialog" id="mzdialog' + (dialog.uuid += 1) + '"></div>').append(this.options.host));
                this.options.winid = "mzdialog" + dialog.uuid;
                winDiv = $("#" + this.options.winid);
                this._createBtns(winDiv);
                $.mzAddResize({
                    winDiv: winDiv,
                    blockID: blockID
                }, function(data) {
                    var block = $("#" + data.blockID),
                        w = data.winDiv.width(),
                        h = data.winDiv.height();
                    data.winDiv.css({
                        left: ($(window).width() - w > 0 ? $(window).width() - w : 1) / 2 + "px",
                        top: ($(window).height() - h > 0 ? $(window).height() - h : 1) / 2 + block.data("sTop") + "px"
                    });
                });
            } else {
                winDiv = $("#" + this.options.winid);
            }
            var style = {
                width: opt.width,
                height: opt.height,
                zIndex: $.meizu.zindex += 1,
                position: "absolute",
                left: ($(window).width() - opt.width > 0 ? $(window).width() - opt.width : 1) / 2 + "px",
                top: ($(window).height() - opt.height > 0 ? $(window).height() - opt.height : 1) / 2 + block.data("sTop") + "px"
            };
            winDiv.css(style).show();
        },
        resize: function(w, h) {
            var winDiv = $("#" + this.options.winid),
                block = $("#" + this.options.blockID);
            var style = {
                width: w,
                height: h,
                left: ($(window).width() - w > 0 ? $(window).width() - w : 1) / 2 + "px",
                top: ($(window).height() - h > 0 ? $(window).height() - h : 1) / 2 + block.data("sTop") + "px"
            };
            winDiv.css(style).show();
        },
        close: function() {
            $.block.close(this.options.blockID);
            $("#" + this.options.winid).hide();
            $("html").css("overflow","auto");
        }
    };
    $.fn.extend({
        mzRadio: function(c) {
            c = $.extend({}, c, {
                host: $(this)
            });
            return new radio(c);
        },
        mzCheckBox: function(c) {
            c = $.extend({}, c, {
                host: $(this)
            });
            return new checkbox(c);
        },
        mzSelect: function(c) {
            c = $.extend({}, c, {
                host: $(this)
            });
            return new select(c);
        },
        mzPanel: function(c) {
            c = $.extend({}, c, {
                host: $(this)
            });
            return new panel(c);
        },
        mzDialog: function(c) {
            c = $.extend({}, c, {
                host: $(this)
            });
            return new dialog(c);
        },
        pager: function(c) {
            c = $.extend({}, c, {
                host: $(this)
            });
            return new pager(c);
        }
    });
    $.disTab = function(b) {
        $(document).data("keyTab", b);
        $(window.document).bind("keydown", function(e) {
            e = e ? e : window.event;
            if (9 == e.keyCode) {
                return !$(document).data("keyTab");
            }
        });
    };
    $.block = {
        uuid: 0,
        getWH2: function() {
            return {
                width: $(window).width(),
                height: $(document).height()
            };
        },
        getWH: function() {
            var w = 0,
                h = 0;
            if ($.meizu.ie) {
                h = $(document.documentElement).height();
                w = $(document.documentElement).width();
            } else if (window.innerHeight) {
                h = window.innerHeight;
                w = window.innerWidth;
            } else if (document.documentElement && document.documentElement.clientHeight) {
                h = document.documentElement.clientHeight;
                w = document.documentElement.clientWidth;
            }
            return {
                width: w,
                height: h
            };
        },
        open: function(nohide) {
            var block = $('<div id="mzBlockLayer' + ($.block.uuid += 1) + '" class="mzBlockLayer" style=" z-index: ' + ($.meizu.zindex += 1) + '; "> </div>');
            var htdy = $($.meizu.ie ? "html" : "body");
            htdy.data("sTop", Math.max($(document).scrollTop(), $("body").scrollTop()));
            !nohide && htdy.data("overflow", htdy.css("overflow")).css({
                overflow: "hidden"
            });
            var wh = !nohide ? this.getWH() : this.getWH2();
            $(document.body).append(block);
            block.css({
                height: wh.height,
                width: wh.width,
                display: "block"
            }).data("sTop", htdy.data("sTop"));
            !nohide && block.css("top", htdy.data("sTop"));
            $.disTab(true);
            $.mzAddResize({
                block: block,
                nohide: nohide
            }, function(data) {
                var htdy = $($.meizu.ie ? "html" : "body");
                var wh = !data.nohide ? $.block.getWH() : $.block.getWH2();
                data.block.css({
                    height: wh.height,
                    width: wh.width
                });
            });
            return "mzBlockLayer" + $.block.uuid;
        },
        reOpen: function(id, nohide) {
            var htdy = $($.meizu.ie ? "html" : "body");
            htdy.data("sTop", Math.max($(document).scrollTop(), $("body").scrollTop()));
            !nohide && htdy.data("overflow", htdy.css("overflow")).css({
                overflow: "hidden"
            });
            var wh = !nohide ? this.getWH() : this.getWH2();
            var block = $("#" + id);
            block.css({
                height: wh.height,
                width: wh.width,
                display: "block"
            }).data("sTop", htdy.data("sTop"));
            !nohide && block.css("top", htdy.data("sTop"));
            $.disTab(true);
        },
        close: function(id) {
            var htdy = $($.meizu.ie ? "html" : "body");
            if ("hidden" != htdy.data("overflow")) htdy.removeAttr("style");
            $("#" + id).hide();
            $.disTab(false);
        }
    };
    $.blockUI = function(msg) {
        $.blockUI.cid = $.block.open();
        var message = window.resBlockUI && window.resBlockUI.processing ? window.resBlockUI.processing : window["G_isCht"] ? "正在處理，請稍候..." : "正在处理，请稍候..";
        message = msg ? msg : message;
        var block = $("#" + $.blockUI.cid),
            zindex = block.css("zIndex") + 1,
            left = (block.width() - 315 > 0 ? block.width() - 315 : 1) / 2 + "px",
            top = (block.height() - 30 > 0 ? block.height() - 30 : 1) / 2 + block.data("sTop") + "px";
        $("body").append('<div style="top:' + top + ";left:" + left + ";z-index:" + zindex + ';" id="blockUICenter">' + message + "</div>");
    };
    $.unblockUI = function() {
        $.block.close($.blockUI.cid);
        $("#" + $.blockUI.cid).remove();
        $("#blockUICenter").remove();
    };
    $.mzAddResize = function(p, fn) {
        $.mzAddResize.param.push(p);
        $.mzAddResize.queue.push(fn);
    };
    $.mzAddResize.queue = [];
    $.mzAddResize.param = [];
    $.BtnEffect = {
        mOverFn: function(e) {
            var j = $(this);
            if (j.hasClass("mzBtnDisable")) return;
            j.addClass(e.data.oCls);
            var a = j.parent().find(".mzAngle1")[0];
            if (a) $(a).removeClass("mzAngle1").addClass("mzAngle");
        },
        mOutFn: function(e) {
            var j = $(this);
            if (j.hasClass("mzBtnDisable")) return;
            j.removeClass(e.data.oCls);
            var a = j.parent().find(".mzAngle")[0];
            if (a) $(a).removeClass("mzAngle").addClass("mzAngle1");
        },
        hander: function(p1, p2) {
            var j = p1.jquery ? p1 : $(p2);
            var t = {
                oCls: j.hasClass("mzBtnGray") ? "mzBtnGrayOver" : "mzBtnBlueOver"
            };
            j.mouseover(t, $.BtnEffect.mOverFn).mouseout(t, $.BtnEffect.mOutFn);
        }
    };
    $.eventBtn = function(opt) {
        for (var i = 0, j = opt.length; i < j; i++) {
            $.BtnEffect.hander($("#" + opt[i].id));
        }
    };
    $.floatTip = function(c) {
        var d = {
            data: []
        };
        $.extend(d, c);
        for (var i = 0, j = d.data.length; i < j; i++) {
            var t = d.data[i];
            $("#" + t.id).focus(t, function(event) {
                var p = event.data,
                    jobj = $("#mz_Float"),
                    tmp = p.loc,
                    _self = null,
                    sobj = $("#" + p.id);
                $.floatTip.cData = p;
                while (tmp) {
                    sobj = sobj.parent();
                    tmp -= 1;
                }
                _self = sobj;
                if (!jobj[0]) {
                    (function() {
                        $('<div id="mz_Float" style="position: absolute;z-index:3000"><div style="position: relative;"><div class="mz3AngleL"><i class="i_icon"></i></div><div class="mzFloatTip bRadius2"></div></div></div>').appendTo("body").hover(function() {
                            $(this).data("isin", true);
                        }, function() {
                            var j = $(this);
                            if (j.data("isblur")) {
                                j.data("isin", false).hide();
                            }
                        }).click(function() {
                            $(this).data("isin", true).data("isblur", true);
                        });
                    })();
                    jobj = $("#mz_Float");
                    $.mzAddResize(jobj, function(j) {
                        if (!j[0] || !j.data("isin") || !$.floatTip.cData) {
                            return;
                        }
                        var p = $.floatTip.cData,
                            tmp = p.loc,
                            sobj = $("#" + p.id);
                        while (tmp) {
                            sobj = sobj.parent();
                            tmp -= 1;
                        }
                        var os = sobj.offset();
                        j.hide().css({
                            top: os.top - 2 + (p.diffy ? p.diffy : 0),
                            left: os.left + sobj.width() + 18 + (p.diff ? p.diff : 0)
                        }).data("isin", true).data("isblur", false).show();
                    });
                }
                var os = _self.offset();
                jobj.show().css({
                    top: os.top - 2 + (p.diffy ? p.diffy : 0),
                    left: os.left + _self.width() + 18 + (p.diff ? p.diff : 0),
                    width: p.width
                }).data("isin", true).data("isblur", false);
                $(jobj.find(".mzFloatTip")[0]).width(p.width - 30).html(p.change ? p.change() : p.text);
            }).blur(t, function(event) {
                var tmp = event.data.loc,
                    sobj = $("#" + event.data.id);
                while (tmp) {
                    sobj = sobj.parent();
                    tmp -= 1;
                }
                $("#mz_Float").data("isin", false);
                setTimeout(function() {
                    var j = $("#mz_Float");
                    if (!j.data("isin")) {
                        j.hide();
                    }
                }, 300);
            });
        }
    };
    $.eventInput = function(opt) {
        for (var i = 0, j = opt.length; i < j; i++) {
            var t = opt[i];
            $("#" + t.id).focus(t, function(e) {
                var d = e.data,
                    p = $("#" + d.id);
                if (d.loc) {
                    var t = d.loc - 0;
                    p = $("#" + d.id);
                    while (t) {
                        p = p.parent();
                        t -= 1;
                    }
                }
                p.addClass("foucsCls");
            }).blur(t, function(e) {
                var d = e.data,
                    p = $("#" + d.id);
                if (d.loc) {
                    var t = d.loc - 0;
                    p = $("#" + d.id);
                    while (t) {
                        p = p.parent();
                        t -= 1;
                    }
                }
                p.removeClass("foucsCls");
            });
        }
    };
    String.prototype.trim = function() {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    };
    window["JAlertGetContent"] = function(type) {
        if (!window["JQAlert"]) {
            var okT = window["G_isCht"] ? "確定" : "确定";
            $(document.body).append('<div id="mzAlertContainer" style="display:none;"/>');
            var cache = [];
            cache.push('<div id="mzAlert_alert" class="alert"><div class="part1"><div class="alert_title"/><div class="alert_message"/></div><div class="part2"><input type="button" value="' + okT + '" class="mzBtnBlue mzBtnwh2 btn1"/></div></div>');
            cache.push('<div id="mzAlert_confirm" class="confirm"><div class="part1"><div class="alert_title"/><div class="alert_message"/></div><div class="part2"><input type="button" value="' + okT + '" class="mzBtnBlue mzBtnwh2 btn1" name="c" style="margin-right:30px;"/><input  name="c" type="button" value="取消" class="mzBtnGray mzBtnwh2 btn2"/></div></div>');
            cache.push('<div id="mzAlert_prompt" class="prompt"><div class="part1" style="height:130px;"><div class="alert_title"/><input type="text" class="inputDefClass" style="margin-top: 40px;width:470px;height:36px;" name="a"/></div><div class="part2"><input type="button" value="' + okT + '" class="mzBtnBlue mzBtnwh2 btn1" name="c" style="margin-right:30px;"/><input type="button" value="取消" class="mzBtnGray mzBtnwh2 btn2" name="c"/></div></div>');
            $("#mzAlertContainer").append(cache.join(""));
            window["JQAlert"] = {
                alert: null,
                confirm: null,
                prompt: null
            };
            $.BtnEffect.hander($($("#mzAlert_alert").find("input[type=button]")[0]));
            var cfs = $("#mzAlert_confirm").find("input[type=button]");
            $.BtnEffect.hander($(cfs[0]));
            $.BtnEffect.hander($(cfs[1]));
            var pts = $("#mzAlert_prompt").find("input[type=button]");
            $.BtnEffect.hander($(pts[0]));
            $.BtnEffect.hander($(pts[1]));
        }
        return $("#mzAlert_" + type);
    };

    function _createNewDia(type, msg, title, config) {
        title = title ? title : '提示';
        var nohide = config && config.nohide;
        var $oldDia = window[type].$dia;
        if (!nohide && $oldDia) {
            $oldDia.open();
            var host = $oldDia.options.host;
            $('.alertDialogTitleTip', host).text(title);
            $('.alertDialogContent', host).html(msg);
            return $oldDia;
        }
        var btnField = '';
        switch (type) {
            case 'nAlert':
                btnField = '<a class="fullBtnBlue alertDialogSure">' + (config && config.sure || '确定') + '</a>';
                break;
            case 'nConfirm':
                btnField = '<a class="fullBtnBlue conFDialogSure">' + (config && config.sure || '确定') + '</a>' +
                    '<a class="fullBtnGray conFDialogCancel">' + (config && config.cancel || '取消') + '</a>';
                break;
        };
        var html = '<div class="alertDialog">' +
            '<div class="alertDialogTitle">' +
            '<label class="alertDialogTitleTip">' + title + '</label>' +
            '<a class="alertDialogClose">' +
            '<i class="i_icon"></i>' +
            '</a>' +
            '</div>' +
            '<div class= "alertDialogMain">' +
            '<div class="alertDialogContent">' + msg + '</div>' + //span标签里不能包含块级元素   改成div
            '</div>' +
            '<div class="alertDialogBtnField">' +
            btnField +
            '</div>' +
            '</div>';
        var $html = $(html);
        $html.appendTo($(document.body));
        var $dia = $html.mzDialog({
            nohide: true,//解决二次弹框后，滚动条消失的问题（false的情况下）
            width: 420,
            height: 250
        });
        if ($oldDia) {
            $oldDia.remove();
        }
        window[type].$dia = $dia;
        return $dia;
    }
    window['nAlert'] = function(msg, title, callback, config) {
        var $dia = _createNewDia('nAlert', msg, title, config);
        $dia.open();
        var host = $dia.options.host;
        $('.alertDialogClose', host).unbind().click(function() {
            $dia.close();
        });
        $(".alertDialogSure", host).unbind().click(function() {
            $dia.close();
            $.isFunction(callback) && callback();
        });
    };
    window['nConfirm'] = function(msg, title, callback, config) {
        var $dia = _createNewDia('nConfirm', msg, title, config);
        $dia.open();
        var host = $dia.options.host;
        $('.alertDialogClose', host).unbind().click(function() {
            $dia.close();
        });
        $(".conFDialogSure, .conFDialogCancel", host).unbind().click(function() {
            $dia.close();
            $.isFunction(callback) && callback.call(window, $(this).hasClass("conFDialogSure"));
        });
    };
    window["jAlert"] = function(msg, title, callback) {
        var jQobj = window["JAlertGetContent"]("alert");
        if (!window.JQAlert.alert) {
            window.JQAlert.alert = jQobj.mzDialog({
                nohide: true,
                width: 560,
                height: 230
            });
            $(".btn1", jQobj).click(function() {
                window.JQAlert.alert.close();
                var fn = window.JQAlert.alertFn;
                fn && $.isFunction(fn) && fn();
            });
        }
        $(".alert_title", jQobj).html(title);
        $(".alert_message", jQobj).html(msg);
        window.JQAlert.alertFn = callback;
        window.JQAlert.alert.open();
    };
    window["jConfirm"] = function(msg, title, callback) {
        var jQobj = window["JAlertGetContent"]("confirm");
        if (!window.JQAlert.confirm) {
            window.JQAlert.confirm = jQobj.mzDialog({
                nohide: true,
                width: 560,
                height: 230
            });
            $(".btn1,.btn2", jQobj).click(function() {
                window.JQAlert.confirm.close();
                var fn = window.JQAlert.confirmFn;
                fn && $.isFunction(fn) && fn.call(window, $(this).hasClass("btn1"));
            });
        }
        $(".alert_title", jQobj).html(title);
        $(".alert_message", jQobj).html(msg);
        window.JQAlert.confirmFn = callback;
        window.JQAlert.confirm.open();
    };
    window["jPrompt"] = function(msg, value, title, callback) {
        var jQobj = window["JAlertGetContent"]("prompt");
        if (!window.JQAlert.prompt) {
            window.JQAlert.prompt = jQobj.mzDialog({
                nohide: true,
                width: 560,
                height: 255
            });
            $(".btn1,.btn2", jQobj).click(function() {
                window.JQAlert.prompt.close();
                var fn = window.JQAlert.promptFn;
                var val = $("input", jQobj).val();
                fn && $.isFunction(fn) && fn.call(window, $(this).hasClass("btn1") ? val : null);
            });
        }
        $(".alert_title", jQobj).html(title);
        $("input[name=a]", jQobj).val(value);
        window.JQAlert.promptFn = callback;
        window.JQAlert.prompt.open();
    };
    $.easing = {
        easein: function(x, t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeinout: function(x, t, b, c, d) {
            if (t < d / 2) return 2 * c * t * t / (d * d) + b;
            var a = t - d / 2;
            return -2 * c * a * a / (d * d) + 2 * c * a / d + c / 2 + b;
        },
        easeout: function(x, t, b, c, d) {
            return -c * t * t / (d * d) + 2 * c * t / d + b;
        },
        expoin: function(x, t, b, c, d) {
            var a = 1;
            if (c < 0) {
                a *= -1;
                c *= -1;
            }
            return a * Math.exp(Math.log(c) / d * t) + b;
        },
        expoout: function(x, t, b, c, d) {
            var a = 1;
            if (c < 0) {
                a *= -1;
                c *= -1;
            }
            return a * (-Math.exp(-Math.log(c) / d * (t - d)) + c + 1) + b;
        },
        expoinout: function(x, t, b, c, d) {
            var a = 1;
            if (c < 0) {
                a *= -1;
                c *= -1;
            }
            if (t < d / 2) return a * Math.exp(Math.log(c / 2) / (d / 2) * t) + b;
            return a * (-Math.exp(-2 * Math.log(c / 2) / d * (t - d)) + c + 1) + b;
        },
        bouncein: function(x, t, b, c, d) {
            return c - jQuery.easing["bounceout"](x, d - t, 0, c, d) + b;
        },
        bounceout: function(x, t, b, c, d) {
            if ((t /= d) < 1 / 2.75) {
                return c * 7.5625 * t * t + b;
            } else if (t < 2 / 2.75) {
                return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
            } else if (t < 2.5 / 2.75) {
                return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
            }
        },
        bounceinout: function(x, t, b, c, d) {
            if (t < d / 2) return jQuery.easing["bouncein"](x, t * 2, 0, c, d) * .5 + b;
            return jQuery.easing["bounceout"](x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        },
        elasin: function(x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * 2 * Math.PI / p)) + b;
        },
        elasout: function(x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * 2 * Math.PI / p) + c + b;
        },
        elasinout: function(x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (!p) p = d * .3 * 1.5;
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            if (t < 1) return -.5 * a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * 2 * Math.PI / p) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * 2 * Math.PI / p) * .5 + c + b;
        },
        backin: function(x, t, b, c, d) {
            var s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        backout: function(x, t, b, c, d) {
            var s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        backinout: function(x, t, b, c, d) {
            var s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * t * t * (((s *= 1.525) + 1) * t - s) + b;
            return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
        },
        linear: function(x, t, b, c, d) {
            return c * t / d + b;
        },
        swing: function(p, n, firstNum, diff) {
            return (-Math.cos(p * Math.PI) / 2 + .5) * diff + firstNum;
        }
    };
})(jQuery);

$(function() {
    $(window).resize(function() {
        var queue = $.mzAddResize.queue;
        var param = $.mzAddResize.param;
        for (var i = 0, j = queue.length; i < j; i++) {
            queue[i].call(window, param[i]);
        }
    });
    (function() {
        $("input.mzInput").each(function() {
            var input = $(this);
            var wrap = input.parent();
            if (!wrap.hasClass("mzWrap")) {
                wrap = $(this).wrap('<span class="mzWrap"/>').parent();
            }
            var tail = input.attr("mztail");
            if (tail === "mzAngle") {
                wrap.append($('<span class="mzAngle1"> </span>'));
            }
        });
        $("input.mzInput2,textarea.mzInput2").each(function() {
            var input = $(this),
                ttip = input.attr("tailTip"),
                htip = input.attr("headTip"),
                wrap = input.parent();
            !wrap.hasClass("mzWrap") && (wrap = input.wrap('<span class="mzWrap inputDefClass"/>').parent().css("paddingLeft", "0px")) && input.css("paddingLeft", "10px");
            if (ttip) {
                var itip = $('<span class="tailTip">' + ttip + "</span>");
                wrap.append(itip).addClass("");
                var w = input.width();
                input.css({
                    width: w - itip.width() - 10
                });
                wrap.width(w + 10);
            }
            if (htip) {
                input.val(htip).addClass("headTipCls").focus(function() {
                    if (this.value == htip) {
                        this.value = "";
                        $(this).removeClass("headTipCls");
                    }
                    $($(this).parent()).addClass("foucsCls");
                }).blur(function() {
                    if (this.value == "") {
                        this.value = htip;
                        $(this).addClass("headTipCls");
                    }
                    $($(this).parent()).removeClass("foucsCls");
                });
            }
        });
        $("input.mzBtnGray,input.mzBtnBlue").each($.BtnEffect.hander);
    })();
});