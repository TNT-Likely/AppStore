// JavaScript Document	公共js
// JavaScript Document
var	isIE 	= /msie/i.test(navigator.userAgent);			// 是否是 IE
var isIE6 	= /msie(\s?)6.0/i.test(navigator.userAgent);	// 是否是  IE 6
var isIE7 	= /msie(\s?)7.0/i.test(navigator.userAgent);	// 是否是  IE 6
var isIE8 	= /msie(\s?)8.0/i.test(navigator.userAgent);	// 是否是  IE 6

var DONATEID = 2839280;		// 2010-03-18 11:16:34 赠送2万个现金特殊活动的帖子ID
/**
 * 由于 jquery 的冲突，己把 jquery 的命名空间改为   $j 
 */
var is_newsNum_live_mouseover = 0;
var is_newsNum_live_mouseover_execute = 0;
//页面初始化
$j(function(){
	//若用户已登录，取用户信息
	if($j("#mzCust").attr("rel") == 1){
		if(!navigator.userAgent.match(/pad|gt-p1000/i) && $j('#footer_mobile_switch').length == 0 && navigator.userAgent.match(/android|webos|ip(hone|od)|opera (mini|mobi|tablet)|iemobile|windows.+phone|mobile|fennec|kindle (Fire)|maemo|blackberry|playbook|bb10\; (touch|kbd)|Symbian(OS)|Ubuntu Touch/i)){
			var mobile_switch = '<a id= "footer_mobile_switch" class="bottoma" href="javascript:goto_mobile_href();">触屏版</a>'+
            					'<img class="footline" src="http://common.res.meizu.com/resources/common/images/default/space.gif">';
			$j('#footer1').prepend(mobile_switch);
		}
	}
	if($j("#mzCust").attr("attribute") == 1){
		
		if(is_newsNum_live_mouseover<=0){
			is_newsNum_live_mouseover = 1;
			$j("#newsNum").live('mouseover',function(){
				if(is_newsNum_live_mouseover_execute<=0){
					is_newsNum_live_mouseover_execute = 1;
					newsLevelFun();
				
				}
			});
		}
		getNoticeAll();
	}
	//网站语言切换
	$j(".globalName").hover(function(){
		$j("#globalContainer").show();
	},function(){
		$j("#globalContainer").hide();
	})	
        
//        if(isIE){
//            var urlis = window.location.toString();
//            var urlid = url.split('#')[1];
//            if(urlid == 'f_pst'){
//                alert('1111');
//            }
//        }
})

// 去掉a标签的虚线框
try{
$j(
  	function (){
	  	// onfocus="this.blur()" hidefocus
            if(isIE){
                $j("a").attr('hidefocus','true');
            }
	} 
);
}catch(e){}

//判断浏览器类型（pc/mobile）
var _browser={
	versions:function(){
		var u = navigator.userAgent, app = navigator.appVersion;
		return {                
			trident: u.indexOf('Trident') > -1, //IE内核                
			presto: u.indexOf('Presto') > -1, //opera内核                
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核                
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核                
			mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端                
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端                
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器                
			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器                
			iPad: u.indexOf('iPad') > -1, //是否iPad                
			webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部            
		};
	}()
} 
// 首页的 js
index_js = {
	init:function(){
		this.load_index_list('load_index_list');
		this.scroll_last();	// 滚动条到最后， 开始加载数据
		
		change_box.init( $j('.tagbox') );
		change_box.init( $j('.tagbox2') );
		
		var tttt=new picTurn();
		tttt.picControl();
		
		var tuji1	= new tuji_show_desc();
		tuji1.init('tuji_frame1');
		var tuji2	= new tuji_show_desc();
		tuji2.init('tuji_frame2');
		
		
		//index_js.initImage($j);
		
		
		public.public_mouseover();
		
		//index_js.change_roll_html(1);
		//index_js.change_roll_html(2);
		//index_js.change_roll_html(3);
		
	},
	change_roll_html:function (id){	// 改变滚动的名字
		try{
			
			var html 	= document.getElementById('bbs_roll_img'+id).innerHTML;
			document.getElementById('roll_control_'+id).innerHTML	= html;
			html2 	= $j('#roll_control_'+id).text();
			document.getElementById ('roll_control_'+id).title = html2;
			
		}catch(e){}
	},
	load_index_list:function (id){
		$j('#'+id).click(function (){
			var self2 	= this;
			thisobj		= $j(this);
			if( thisobj.attr('is_lock')=='1' ){
				return ;
			}
			rhref	= thisobj.attr('rhref');
			page 	= $1.cint(thisobj.attr('page'))
			thisobj.attr('is_lock', '1');
			
			$j.ajax({url:rhref,
				   dataType:'json',
				   type:"GET",
				   data:{page:page},
				   async:false,
				   success:function(rest){
					   	try{
        				$j("#"+id).before(rest['data']);
						$j("#"+id).attr('page', rest['page']);
						
						if(rest['is_last']=='true'){	// 己经没有加载。    退出
							$j("#"+id).remove();
						}
						}catch(e){}
						$j(self2).attr('is_lock', '0');
    			   }});
			
		});
		
	},
	scroll_last:function(){
		$j(window).scroll(function(){
			dh 	= $j(document).height();
			wh 	= $j(window).height();
			st	= $1.__scrolltop();
			
			if((st+wh*2)>dh){
				//auth_load	= $1.cint( $j('#load_index_list').attr('auth_load') );		// auth_load 加载的次数
				//auth_load++;
				page	= $1.cint( $j('#load_index_list').attr('page') );
				if(page<=2){	// 最多自动加载 2次
					$j('#load_index_list').click();
					
					//$j('#load_index_list').attr('auth_load', auth_load);
				}
			}
		});
	}
};


function click_href(id){
    var url     = $j("#"+id).attr("rhref");
    $1.__href(url);
}

// 首页刷新按钮
var refresh_click_look 	= false;
function refresh_click(){
	if(refresh_click_look==true){
		return ;
	}
	refresh_click_look 	= true;
        var rand =  Math.ceil(Math.random(1,10000)*100000);
	$j.getJSON('/index_new_thread.php?'+rand ,function(data){
		refresh_click_look 	= false;
		if( $1.cint(data['status'])==1){
			$j('#new_threadlist').html(data['data']);
			delete_bottom_line();
		}
	});
}

//新注册用户邮箱检测
function check_email(){
        var rand =  Math.ceil(Math.random(1,10000)*100000);
        $j.ajax({
                type:'GET',
                url:'/check_email.php?'+rand,
                dataType:'json',
                success:function(data){
                        var url = window.location.href+'#f_pst';
                        if(data['status'] == 1){
                               window.location= url;
                               window.location.reload();                             
                        }else{
                               window.location= 'https://member.meizu.com/uc/webjsp/member/detail';
                        }
                }
        })
}



function delete_bottom_line(){
	tr 	= $j("#new_threadlist").find("table").find('tr').length;
	$j("#new_threadlist").find("table").find('tr').eq(tr-1).addClass('tr_threadlist_last');
	
	tr 	= $j("#index_threadlist").find("table").find('tr').length;
	$j("#index_threadlist").find("table").find('tr').eq(tr-1).addClass('tr_threadlist_last');
}






// heyuejuan function 的封装
/*==================               常用对象        =====================*/
$1	= {
	testfun:function(val){alert(val);},
	
	get_id:function(id){						// 获得 id 对象
		return document.getElementById(id);
	},
	get_name:function(name){					// 获得 name 对象
		return document.getElementsByName(name);
	},
	get_elem:function(element){					// 获得元素对象
		return document.getElementsByTagName(element);
	},
	gb:function(){								// IE 清除内存
		if(isIE){
			try{
				CollectGarbage();
			}catch(e){}
		}
	},
	rand:function(num){							// 生成一个随机数  最大值  生成  0-num 之间的值
		return this.cint(num*Math.random());
	},
	trim:function(str){							// 去掉前后空格 	
		if(!str)	return '';
		if(str==undefined) return '';
		if( ! isNaN(str) ) return str;
		return str.replace(/(^\s*)|(\s*$)/g, "");
	},
	cint:function(value){						//  parseInt  转成数字  整型
		if( (!value))	return 0;
		var number	=  parseInt(value,10);
		if(isNaN(number)) return 0;
		return number;
	},
	cNumber:function(value){					// 转成数字型  整型与浮点型  
		if( (!value))	return 0;
		var number	=  Number(value);
		if(isNaN(number)) return 0;
		return number;		
	},
	cabs:function(value){						// 取整
		number	= this.cNumber(value);
		number	= Math.abs(number);
		return number;
	},
	__eval:function(rest){						// 解析 json 成数组    返回数组   或 执行
		try{
			var obj	= eval("(" + rest + ")");
		}catch(e){
			var obj	= rest;
		}
		return obj;
	},
	is_email:function(email){					// 检测  email 
		 var myreg = /^[_.0-9a-zA-Z-]+@([0-9a-zA-Z-]+\.)+[a-zA-Z]{2,3}$/;
		 return myreg.test(email);
	},
	__scrolltop:function(){						// 滚动条高度
		var scrollTop=0;
		if(document.documentElement&&document.documentElement.scrollTop){
			scrollTop=document.documentElement.scrollTop;
		}else if(document.body){
			scrollTop=document.body.scrollTop;
		}
		return scrollTop;
	},
	__scrollleft:function(){
		var scrollLeft=0;
		if(document.documentElement&&document.documentElement.scrollLeft){
			scrollLeft=document.documentElement.scrollLeft;
		}else if(document.body){
			scrollLeft=document.body.scrollLeft;
		}
		return scrollLeft;
	},
	url_split:function(url){						//  把 url 后的参数分割  返回 arr行 
		var url_arr		= new Array();
		if(! url){	url	= window.location.href;}//没有传参表示用现在的url的
		var urls_a		= url.split('?');
		if(! urls_a[1]) urls_a[1] = urls_a[0];  
		if(urls_a[1]){
			urls_a2 		= urls_a[1].split('&');
			for(key in urls_a2){
				urls_a3		= urls_a2[key].split('=');
				if(urls_a3[0] && urls_a3[1]){
					url_arr[urls_a3[0]] = urls_a3[1];
				}
			}
		}
		return url_arr;
	},
	url_com:function(url_arr){					// /* 把 url 的数组的数据  组合 */
		var url			= window.location.href;
		var urls_a		= url.split('?');
		var aurl		= urls_a[0];
		aurl 			= aurl + '?';
		var n 			= 0;
		
		for(key in url_arr){
			if(url_arr[key]){
				if(n>0)	aurl = aurl + '&';
				// arr_key	= decodeURIComponent(url_arr[key]);  //encodeURI
				arr_key		= url_arr[key]+'';				
				arr_key		= $1.__encodeURI(arr_key);
				aurl	= aurl + key + '=' + arr_key;
			}
			n++;
		}
		return aurl;
	},
	middle_site:function($screen , $min ){		// 计算中间位置		
		return ($screen/2)-($min/2);
	},
	obj_json:function(o){  						// 对象转 json 字符串   0 必须是对象
		var r = [];  
		if(typeof o =="string") return "\""+o.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+"\"";  
		if(typeof o =="undefined") return "\"\"";  
		if(typeof o == "object"){  
			if(o===null) return "null";
			else if(!o.sort){  
				for(var i in o){  r.push("\""+i+"\""+":"+this.obj_json(o[i])); }
				r="{"+r.join()+"}"; 
			}else{
				for(var i =0;i<o.length;i++)  r.push(this.obj_json(o[i])) ; 
				r="["+r.join()+"]";
			}  
			return r;
		}else if(typeof o == "number"){
			return "\""+o+"\"";  
		}else{
			return "\"\"";
		}  
		return o.toString();
	},
	__reload:function(){						//重新装入当前页面
		window.location.reload();
	},
	__href:function(url){							// 页面跳转 与刷新网站
		window.location.href	= url;
	},
	__confirm:function(msg){						// 提示框
		if(! msg){	msg = "确定？"; }
		if (confirm(msg)==true){
			return true;
		}else{
			return false;
		}
	},
	time:function(){							// 获得 时间  秒 linux
		var now = new Date();
		return this.cint( now.getTime()/1000 );
	},
	is_int:function(str){						// 获得 整型  正负都是	return boolen
		var re = new RegExp(/^(-|\+)?\d+$/);
		return re.test(str);
	},
	is_positive_int:function(str){				// 正整 数 	return boolen
		var re = new RegExp(/^\d+$/);
		return re.test(str);
	},
	is_float:function(str){						// 浮点型
		var pos = new RegExp(/^(-|\+)?\d+(\.\d+)?$/);
		return re.test(str);
	},
	is_not_string:function(str){				// 特殊字符  return boolen     true 没有
		var reg = /^[\da-zA-Z\-\_\*]*$/;
		return reg.test(str);
	},
	is_phone:function(str){						// 手机格试
		//var reg = new RegExp(/^[\d]{4}(\-)?(([\d]{7,8})|([\d]{3,4}))$/);
		if(str.length!=11){
			return false;
		}
		var reg = new RegExp(/^0{0,1}(13[0-9]|15[0-9]|18[0-9]|14[0-9]|16[0-9])[0-9]{8}$/);
		return reg.test(str);
	},
	__focus:function(obj){						// 对象焦点的输入点移动到最后		只有  IE     如果是 query  这样传 a = $("#abc")  $1.__focus(a[0])
		if(isIE){								//					js 这样传   $1.__focus($1.get_id("abc"))
			try{	
				var   r   = obj.createTextRange();
				r.moveStart('character',obj.value.length);   
				r.collapse(true);  
				r.select();
			}catch(e){}
		}
	},
	__encodeURI:function(url){					// url 转码
		//if(url.indexOf("%")<0){
			url 	= decodeURIComponent(url);
			url 	= encodeURI(url);
		//}
		return url;
	},
	check_submit:function(id){					//  数据提交
		document.getElementById(id).submit();
	},
	getCookie:function(c_name){		// 获得 cookie 的值
		if(document.cookie.length>0){
			c_start=document.cookie.indexOf(c_name + "=")
			if(c_start!=-1){
				c_start=c_start + c_name.length+1
				c_end=document.cookie.indexOf(";",c_start)
				if(c_end==-1) c_end=document.cookie.length;
				return unescape(document.cookie.substring(c_start,c_end))
			}
		}
		return ""
	},
	setCookie:function(name,value){	// 写cookies		neme是key   value 是值
		var Days	= 30;
		var exp		= new Date();
		exp.setTime(exp.getTime() + Days*24*60*60*1000);
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	},
	delCookie:function(name){	//删除cookies
		var exp 	= new Date();
		exp.setTime(exp.getTime() - 1);
		var cval	= getCookie(name);
		if(cval!=null){
			document.cookie	= name + "="+cval+";expires="+exp.toGMTString();
		}
	} 
	
	
	
}
/*==================               常用对象        =====================*/










public = {
	init:function(){
		this.hide_window();
		this.document_click();
	},
	public_mouseover:function (){
		/*
		$j("body").mouseover(function (){
			// //if( !(isIE6 || isIE7 || isIE8) ){
			// //	$j(".tuji_desc").slideUp('slow');
			// //}
			
		});
		*/
	},
	box_simcheck:function(specify){	// 选中按钮		specify 要转移到的选中按钮的 class 里去
		/*
		$j(".box_simcheck").live('click',function(event){
			obj 	= $j(this).parents('.o').find('.'+specify);
			checked	= $j(obj).attr('checked');
			if(checked){
				$j(obj).attr('checked',false);
				$j(this).parents('.o').removeClass('checked_simcheck');
			}else{
				$j(obj).attr('checked',true);
				$j(this).parents('.o').addClass('checked_simcheck');
			}
			
			event.stopPropagation();
			event.preventDefault();
		});
		*/
		$j(".box_simcheck").click(function(event){
			obj 	= $j(this).parents('.o').find('.'+specify);
			
			checked	= $j(obj).attr('checked');
			if(checked){
				$j(obj).attr('checked',false);
				$j(this).parents('.o').removeClass('checked_simcheck');
			}else{
				$j(obj).attr('checked',true);
				$j(this).parents('.o').addClass('checked_simcheck');
			}
			
			event.stopPropagation();
			event.preventDefault();
		});
		
	},
	hide_window:function (){
		/*
		$j(".fwinmask").live('mouseleave', function(){
			wid 	= $j(this).attr('id');
			$j(document).click(function(){
				try{
					awid 	= wid.substr(5);
					hideWindow(awid);
					hideWindow('comment');
					
					
				}catch(e){}
			});
		});
		*/
		
		
		/*
		$j(document).click(function(){
			try{
				fwinobj	= $j("#append_parent").find(".fwinmask");
				fwinlen = fwinobj.length;
				var i = 0;
				for(i=0;i<fwinlen; i++){
					wid	 = $j(fwinobj[i]).attr('id');
					if(wid!='fwin_showblock' && wid!='fwin_cropper'){
						awid 	= wid.substr(5);
						hideWindow(awid,0);
					}
				}
				
				hideWindow('comment',0);
			}catch(e){}
		});
		*/
		
		
	},
	document_click:function(){
		
		$j(document).live('click',function(e){
			$j(".space_card_user_box").hide();
			$j(".sign_card_user_box5").hide();
		});	
		
	}
};
public.init();






/**
 * 切换框
 * cs 是框的 class
 * 		页框头为 tag_tags->tg	  	活动为  activity
 * 		页框内容	tag_main->ctag	
 * 调用方法如  change_box.init('tagbox');
 */
change_box = {
	init:function(obj){
		
		//try{
			var tabs = $j(obj).find(".tag_tags .tg");
			if(!tabs[0]){
				return ;
			}
			
			var mains = $j(obj).find(".tag_main .ctag");
			if(!mains[0] ) 	return;
			
			active_obj 	= $j(obj).find(".tag_tags .activity");
			index		= $j(tabs).index(active_obj);
			if(index>=(tabs.length-1) ) index = tabs.length-1;
			
			tabs.css("cursor","pointer");
			
	
			for(var i = 0 ;i<tabs.length ; i++ ){
				tabs[i].val = i;
				//获得CSS
				var cls_name = tabs[i].className;
	
				if(i==index){
					$j(tabs[i]).addClass('activity');
					mains[i].style.display = "block";
				}else{
					$j(tabs[i]).removeClass('activity');
					mains[i].style.display = "none";
				}
				$j(tabs[i]).live('click mousemove', function() {
					for(var k=0;k<tabs.length;k++){//上框架
						$j(tabs[k]).removeClass('activity');
					}
					
					$j(this).addClass('activity');
					
					mains.hide();  //下框架
					mains[this.val].style.display = "block";
					
				} );
				

			}
		//}catch(e){}
		
	}
	
}

/**
 * 头像浮动框
 * new avatar_drift();
 * 
 * isdrift="true"  为标记的所有都显示浮动框
 */
var avatar_drift_geturl_lock = new Object();
var avatar_drift_mouseover	= new Object();	// 1,0
function avatar_drift(){}
avatar_drift.prototype = {
	init:function(){
		this.load_user_data();
		
	},
	load_user_data:function(){	// http://bbs2.meizu.com/home.php?mod=space&uid=409691&ajaxmenu=1&inajax=1&ajaxtarget=card_2775_menu_content
		var clsself 	= this;
		$j("[isdrift='true']").parent().mouseenter(function (){
			$j(this).find("[isdrift='true']").css("cursor","pointer");
			var uid		= $j(this).find("[isdrift='true']").attr('uid');
			avatar_drift_mouseover[uid]	= 1;
			html_id 	= 'space_card_new_'+uid;
			
			
			soffset	= $j(this).find("[isdrift='true']").offset();
			imgleft	= soffset.left;
			imgtop	= soffset.top
			html_top	= imgtop - 20;
			html_left	= imgleft - 20;
				
			if( $j('#'+html_id).length>0 ){
				$j('#'+html_id).css('top',html_top+'px').css('left',html_left+'px');
				
				$j('#'+html_id).show();return ;
			}
			if(avatar_drift_geturl_lock[uid]==1)	return ;	// 被锁定,退出
			

			
			setTimeout(function(){clsself.auto_load_userinfo(uid, html_left, html_top)},500);

			
			
		});
		
		$j("[isdrift='true']").parent().mouseleave(function(){
			var uid		= $j(this).find("[isdrift='true']").attr('uid');
			avatar_drift_mouseover[uid]	= 0;
			
		});
		
		$j(".space_card_user_box").live('mouseleave', function(){
			$j(this).hide();
		});
		
	},
	auto_load_userinfo:function(uid , imgleft , imgtop ){	// uid, 对象left , 对象top\
		if(avatar_drift_mouseover[uid]!=1){return ;}
		
		avatar_drift_geturl_lock[uid]	= 1;
		$j.ajax({
			type: 'GET',
			url: 'home.php?mod=space&uid='+uid+'&ajaxmenu=1&inajax=1&card=space_card_new',
			cache: false,
			success: function(data){
				html_id 	= 'space_card_new_'+uid;
				html 	= '<div id="'+html_id+'" class="space_card_user_box" style="position:absolute;display:none;top:'+html_top+'px;left:'+html_left+'px; " >';
				html 	+= data;
				html 	+= '</div>';
				
				$j("#append_parent").append(html);
				avatar_drift_geturl_lock[uid] = 0;
				
				if(avatar_drift_mouseover[uid]==1){
					$j("#"+html_id).show();
				}
			}

		});
	}
}




// 菜单框初使化	aa = new menu_box();
function menu_box(){};
menu_box.prototype	= {
	box_class:'',
	viewtype:'',
	init:function(ls , viewtype){
		this.box_class	= ls;
		this.viewtype	= viewtype;
		this.mouse_move();
		this.mouse_click();
		this.box_menu();
		this.mouse_leave();
		
		
		// 选中的移上
		selct_obj	= $j( "."+ this.box_class + " .son_menu li[is_select]");
		if(selct_obj.length>0){
			var vl		 = $j(selct_obj).attr('vl');
			var html 	= $j(selct_obj).html();
			arrow_dark_len 	= $j( "."+ this.box_class + " .box_menu").find('.arrow_dark').length;
			if(arrow_dark_len>=1){
				html	= html + '<span class="arrow_dark"></span>';
			}
			$j( "."+ this.box_class + " .box_menu").attr('vl',vl);
			$j( "."+ this.box_class + " .box_menu").attr('value',vl);
			$j( "."+ this.box_class + " .box_menu").html(html);
		}
		
	},
	mouse_move:function(){	// 鼠标移上去
		var self	= this;
		
		$j( "."+ this.box_class + " .son_menu li").mousemove(function(){
			$j( "."+ self.box_class + " .son_menu li").removeClass('activity');
			
			$j(this).addClass('activity');
			
			
		});
	},
	mouse_click:function(){
		var self	= this;
		$j( "."+ this.box_class + " .son_menu li").click(function(){
			var html	= $j(this).html();
			var value	= $j(this).attr("vl");
			arrow_dark_len 	= $j( "."+ self.box_class + " .box_menu").find('.arrow_dark').length;
			if(arrow_dark_len>=1){
				html	= html + '<span class="arrow_dark"></span>';
			}
			$j( "."+ self.box_class + " .box_menu").html(html);
			$j( "."+ self.box_class + " .box_menu").attr('value',value);
			$j( "."+ self.box_class + " .box_menu").attr('vl',value);
			
			$j( "."+ self.box_class + " .son_menu").hide();
			
			// URL跳转 个人中心--帖子
			filter	= $j( "."+ self.box_class + " .box_menu").attr('filter');
			if(filter=='true'){
				self.filter();
			}
			// URL跳转 个人中心--关系--好友
			change_group	= $j( "."+ self.box_class + " .box_menu").attr('change_group');
			if(change_group=='true'){
				self.change_group();
			}
			if(self.box_class == "select_box_4"){
				self.post_uid(value);
			}
		});
	},
	box_menu:function(){
		var self	= this;
		$j( "."+ this.box_class + " .box_menu").click(function(e){
			$j(".son_menu").hide();
			
			is_hidden	= $j( "."+ self.box_class + " .son_menu").is(":hidden")
			if(is_hidden){
				$j( "."+ self.box_class + " .son_menu").show();
			}else{
				$j( "."+ self.box_class + " .son_menu").hide();
			}
			//$j( "."+ self.box_class + " .son_menu").toggle();
			e.stopPropagation();
		});
	},
	filter:function (){		// 跳转
		var filter 	= $j( ".select_box_1 .box_menu").attr('vl');
		var fid 	= $j( ".select_box_2 .box_menu").attr('vl');
		
		location.replace('/forum.php?mod=guide&view=my&type=' + this.viewtype + '&filter=' + filter + '&fid=' + fid);
	},
	change_group:function (){	// 跳转
		var fkey 	= $j( "."+this.box_class+" .box_menu").attr('vl');
		location.replace('/home.php?mod=space&do=friend&group=' + fkey);
	},
	post_uid:function(_vl){
		var items = $j("#friend_ul li");
		var uArray = [];
		items.each(function(){
			var _uId = $j(this).attr("attribute");
			if($j(this).find(".checked_simcheck").length>=1){
				uArray.push(_uId);
			}
		})
		var uString = uArray.join(",");
		
		$j.ajax({
			type:"GET",
			url:"/home.php?mod=spacecp&ac=friend&op=changegroup&uid="+encodeURIComponent(uString)+"&group="+_vl+"&inajax=1&changegroupsubmit=true&handlekey=friend_group_2&formhash=e4c05c7d",
			success:function(){
				setTimeout(function(){$1.__reload();},2000);
				if(uString==''){
					showDialog('请选择用户', 'right', null, null, 0, null, null, null, null, null, 3);
				}else{
					showDialog('操作成功', 'right', null, null, 0, null, null, null, null, null, 3);
				}
				
			}
		})
	},
	mouse_leave:function(){
	   var self	= this;
		$j( "."+ this.box_class + " .son_menu").live("mouseleave",function(){
			var _box = $j( "."+ self.box_class + " .son_menu");
			$j(document).click(function(){
				$j(".son_menu").hide();
			})
		})    
	}
}



// 回到顶部
function goto_top(){}
goto_top.prototype 	= {
	init:function(){
		var self 	= this;
		self.scrolltop2_click();
		self.scrolltop2_mousemove();
		
		$j(window).scroll(function(){
			// dh 	= $j(document).height();// 页面总高度
			wh 	= $j(window).height();	// 页面可视高度
			wh2 = wh/2;
			st	= $1.__scrolltop();
			if(st>(wh+wh2)){
				self.show_scrolltop();
			}else{
				self.hide_scrolltop();
			}
			
		});
	
		// dh 	= $j(document).height();
		// wh 	= $j(window).height();
		// st	= $1.__scrolltop();
	},
	show_scrolltop:function(){
		obj 	= $j("#scrolltop2");
		offset	= $j("#wp").offset();
		scroll_left 	= offset.left+1080;
		
		if(obj.length>0){
			obj.show();
			if(isIE6){
				st	= $1.__scrolltop();
				wh 	= $j(window).height();
				//try{
				var top2 = $1.cint(st)+$1.cint(wh)-180;
				//}catch(e){}
				obj.css({ left: scroll_left+"px", position: "absolute" , top : top2+'px'});
			}else{
				
				obj.css("left",scroll_left+"px");
			}
		}else{
			html	= '<div id="scrolltop2" style="left:'+scroll_left+'px;"> </div>';
			$j("body").append(html);
		}
		
	},
	hide_scrolltop:function(){
		$j("#scrolltop2").hide();
	},
	scrolltop2_click:function(){
		$j("#scrolltop2").live('click', function(){
			window.scrollTo('0','0');
		});
	},
	scrolltop2_mousemove:function(){
		$j("#scrolltop2").live("mouseover",function(){
			$j(this).addClass("scrolltop2_mousemove");										
		});
		$j("#scrolltop2").live("mouseleave",function(){
			$j(this).removeClass("scrolltop2_mousemove");										
		});
		
	}
}






// 图记鼠标有移上去时	显示描述
function tuji_show_desc(){};
tuji_show_desc.prototype = {
	class_name:'',
	effect: {},	// 1 移入   2 移出  0 没有移
	init:function(name){
		
		this.class_name = name;
		this.mouseover();
		this.mouseout();
		this.tuji_img_box_mouseout();
	},
	mousemove:function(){	// 在里面移动
		var self	= this;
	},
	mouseover:function (){	// 移入
		var self	= this;
		$j("."+this.class_name).find("img").mouseover(function (){
			
			var desc 	= $j(this).attr('cc');
			try{
				desc	= emote(desc);
			}catch(e){}
			
			
			var tuji_desc 	= $j(this).parents("div.tuji_img_box").find(".tuji_desc");
			
			if(tuji_desc.length<=0){
				img_widht	= $j(this).width();
				img_height	= 48;
				if(img_widht<400){
					img_height	= 95;
				}
				img_widht 	= img_widht - 20;
				img_widht2 	= img_widht+4;
				rand 		= $1.rand(10000);
				html 	= '<div id="rand_'+rand+'" class="tuji_desc" style="display:none; width:'+img_widht+'px; max-height: '+img_height+'px; *width: '+img_widht2+'px;*+width: '+img_widht2+'px;" >'+desc+'</div>';
				$j(this).parents("div.tuji_img_box").append(html);	// 没有数据加入进来
				
			}
			var desc_obj	= $j(this).parents("div.tuji_img_box").find(".tuji_desc");
			id 	= $j(desc_obj).attr('id');
			if(self.effect[id]!=1){
				$j(desc_obj).slideDown('slow', function (){
					self.effect[id] = 1;
				});
				self.effect[id] = 1;
			}
			
		});
	},
	mouseout:function (){	// 移出
		var self 	= this;
		$j("."+this.class_name).find("img").mouseout(function (e){
			try{
				tuji 		= $j(this).parents("div.tuji_img_box").find(".tuji_desc");
				tuji_of 	= $j(tuji).offset();
				tuji_left	= tuji_of.left-1;
				tuji_top	= tuji_of.top-1;
				tuji_width	= $j(tuji).width()+1;
				tuji_height	= $j(tuji).innerHeight()+1;
				
				var xx 	= e.pageX;
				var yy 	= e.pageY;
				
				if( (xx>tuji_left && xx<(tuji_left+tuji_width)) && (yy>tuji_top && yy<tuji_top+tuji_height) ){
					return ;
				}else{
					var desc_obj	= $j(this).parents("div.tuji_img_box").find(".tuji_desc");
					id 				= $j(desc_obj).attr('id');
					if(self.effect[id]!=2){
						$j(desc_obj).slideUp('slow', function (){
							self.effect[id] = 2;
						});
						self.effect[id] = 2;
					}
					
				}
			}catch(e){}
		});
	},
	tuji_img_box_mouseout:function (){	// 隐藏
		var self 	= this;
		
		$j("."+this.class_name).find(".tuji_desc").live('mouseout', function(e){
			var xx = e.pageX;
			var yy = e.pageY;
			
			of 		= $j(this).offset();
			wid 	= $j(this).width();
			if(xx> of.left && xx<(of.left+wid)){
				if(yy<of.top){
					return ;	// 向上移去不做动作
				}
			}
			//alert(of.top);
			
			id 		= $j(this).attr('id');
			if(self.effect[id]!=2){
				$j(this).slideUp('slow',function (){
					self.effect[id] = 2;
				});
				self.effect[id] = 2;
			}
			
		});
		
		
	}
};


function img_move_float_box(){};
img_move_float_box.prototype = {
	class_name:'',
	init:function(class_name){	// 初使化
		this.class_name = class_name;
		this.mousemove();
		this.mouseout();
	},
	mousemove:function(){
		var self 	= this;
		$j("."+this.class_name).mousemove(function(){
			$j("."+self.class_name+"_absolute").show();
		});
	},
	mouseout:function(){
		var self 	= this;
		$j("."+this.class_name).mouseleave(function(e){
			$j("."+self.class_name+"_absolute").hide();
		});
	}
}


//售前售后
function customer_service(fid){
	html 	= '<div class="customer_service">';
	html 	+= '	<a target="_blank" href="http://www.meizu.com/services/repairdetail.html?action=ck&chasn=" onclick="hideMenu(\'fwin_dialog\', \'dialog\');" ><div class="custmoner1" > </div></a>';
	html 	+= '	<a target="_blank" href="http://www.meizu.com/services" onclick="hideMenu(\'fwin_dialog\', \'dialog\');"  ><div class="custmoner2" > </div></a>';
	html 	+= '	<div class="cr"></div>';
	html 	+= '	<a href="javascript:void(0);" onclick="hideMenu(\'fwin_dialog\', \'dialog\');window.open(\'/kf.php\',\'_blank\',\'height=473,width=703,fullscreen=3,top=200,left=200,status=yes,toolbar=no,menubar=no,resizable=no,scrollbars=no,location=no,titlebar=no,fullscreen=no\');" ><div class="custmoner3" ></div></a>';
	html 	+= '	<a href="forum.php?mod=post&action=newthread&fid='+fid+'&extra=" onclick="hideMenu(\'fwin_dialog\', \'dialog\');"  ><div class="custmoner4" ></div></a>';
	html 	+= '	<div class="cr"></div>';
	html 	+= '</div>';
	
	//showDialog('', 'info344', html);
	showDialog(html, 'info', 'not_flb_css', null, true, null, '', '', '');
	
}



/*pictureTurn*/
function picTurn(){};
var index_pic_num	= 0;
var index_pic_cont	= null;
var index_pic_itemW	= 1038;
var index_pic_index	= 0;
var index_pic_item = null;
var _int = null;
picTurn.prototype = {
	init : function(){
		var self	= this;
		var ox ,oy 	= 0;
		var img = document.getElementById('roll_img_cc');
		
		index_pic_num 	= $j(".roll_img_kk").length;
		index_pic_cont	= $j("#portal_block_500_content");
		index_pic_item  = $j("#portal_block_500_content .roll_img_kk");
                $j(".roll").hide();
                $j('.roll_opacity').hide();
                $j(".box1").mouseenter(function(){
                    var now_index = $j('.roll_small_signimg_div .current_con').index();
                    roll_title	= '<a target="_blank" href="'+$j(".roll_img_kk").eq(now_index).attr('rurl')+'">'+$j(".roll_img_kk").eq(now_index).attr('alt')+'</a>';
                    //roll_title	= '<a target="_blank" href="'+$j(".roll_img_kk").eq(index_pic_index).attr('rurl')+'">'+$j(".roll_img_kk").eq(index_pic_index).attr('alt')+'</a>';
                    $j(".roll_title").html(roll_title);
                    //picTurn.prototype.picSwitch();
                    $j('.roll_opacity').show();
                    $j('.roll').show();  
                });
                $j('.box1').mouseleave(function(){
                    $j('.roll_opacity').hide();
                    $j('.roll').hide();
                });

               
                
		// 生成缩略图
		for(k=0; k<index_pic_num; k++){
			this.pic_image(k);
		}
		
		
		// 图片按下事件
		//$j(".roll_img_kk").click(function(){
		//	url 	= $j(this).attr("rurl");
		//	$1.__href(url);
		//});
		
		
		/*
		// 图片拖动事件
		$j(".roll_img_kk").mousedown(function(evt){
			org_x 	= evt.pageX;
			org_y	= evt.pageY;
			$j(".roll_img_kk").mouseup(function(evt2){
				now_x 	= evt2.pageX;
				now_y 	= evt2.pageY;
				if(org_x==0 || org_y==0){
					return false;
				}
				
				if( org_x-now_x>=100 ){	// 左移动
					clearTimeout(_int);
					picTurn.prototype.picSwitch();
				}else if( org_x-now_x<=-100 ){	// 右移动
					self.previous_page();
				}
				try{
					evt2.stopPropagation();
				}catch(e){
					try{
						window.event.cancelBubble	= true;
					}catch(e){}
				}
				org_x=org_y=now_x=now_y=0;
				return false;
			});
			
		});
		*/
		try{
			img.addEventListener('touchstart', function(event) {
				event.preventDefault();
				try{
					self.ox = event.touches[0].pageX;
					self.oy = event.touches[0].pageY;
				}catch(e){
					try{
					self.ox = event.targetTouches[0].pageX;
					self.oy = event.targetTouches[0].pageY;
					}catch(e){}
				}
				
				try{
					event.stopPropagation();
				}catch(e){
					try{
						window.event.cancelBubble	= true;
					}catch(e){}
				}
				
			}, false);
			img.addEventListener('touchend', function(event) {
				event.preventDefault();
				try{
					nx = event.changedTouches[0].pageX;
					ny = event.changedTouches[0].pageY;
				}catch(e){
					nx = event.targetTouches[0].pageX;
					ny = event.targetTouches[0].pageY;
				}
				if( self.ox-nx>=100 ){	// 左移动
					clearTimeout(_int);
					picTurn.prototype.picSwitch();
				}else if( self.ox-nx<=-100 ){	// 右移动
					self.previous_page();
				}
				
				self.ox	= 0;
				self.oy	= 0;
				
					try{
						event.stopPropagation();
					}catch(e){
						try{
							window.event.cancelBubble	= true;
						}catch(e){}
					}
			}, false);
		}catch(e){}
		
		
		// 按下前翻
		$j(".leftbtn_picturn").click(function(){
			self.previous_page();
		});
		// 按下后翻
		$j(".rightbtn_picturn").click(function(){
			clearTimeout(_int);
			picTurn.prototype.picSwitch();						 
		});	
	},
	previous_page : function (){	// 上一页， （前翻）
		index_pic_index--;
		index_pic_index--;
		if(index_pic_index<0){
				index_pic_index	= index_pic_num-1;
		}
		clearTimeout(_int);
		picTurn.prototype.picSwitch();
	},
	pic_image : function (i){	// 显示image图片
		try{
                        var current_con = ''; 
                        if(i == 0) current_con = 'current_con';
			//src 	= $j(".roll_img_kk").eq(i).find("img").attr("src");
			src 	= $j(".roll_img_kk").eq(i).attr("src");
			html	= '<img class="roll_small_signimg '+current_con+' " width="50" height="29" src="'+src+'">';
			$j(".roll_small_signimg_div").append(html);
		}catch(e){}
		
	},
	picSwitch : function(){
		if(index_pic_index == index_pic_num){
			index_pic_index = 0;
		}
		
		left 	=  parseInt( 0- (index_pic_index * 686) ,10); 
		leftpx 	= left + 'px';
		//index_pic_item.css("display","none");
		//index_pic_item.eq(index_pic_index).fadeIn(1000);//.css("display","block");
		$j(".roll_img .roll_img_cc").animate({left:leftpx}, 400);
		//$j(".roll_img #portal_block_500_content").css('left',leftpx);
		
		roll_title	= '<a target="_blank" href="'+$j(".roll_img_kk").eq(index_pic_index).attr('rurl')+'">'+$j(".roll_img_kk").eq(index_pic_index).attr('alt')+'</a>';
		$j(".roll_title").html(roll_title);
		
		$j(".roll_small_signimg").eq(index_pic_index).addClass("current_con").siblings().removeClass("current_con");
		index_pic_index++;
		clearTimeout(_int);
		_int = setTimeout("picTurn.prototype.picSwitch()",6000);
	},
	picControl : function(){
		
		this.init();
		var that = this;
		
		//index_pic_cont.css("width",index_pic_itemW*index_pic_num);
		//index_pic_cont.css("position",'absolute');return ;
		picTurn.prototype.picSwitch();
		//$j(".roll_small_signimg").removeClass("current_con");
		//$j(".roll_small_signimg").eq(0).addClass("current_con");
		
		//点击进度条时，控制动画效果 mouseover
		$j(".roll_small_signimg").click(function(){
			var overIndex = $j(this).index(".roll_small_signimg");
			if(index_pic_index == Number(overIndex+1)){return false;}
			clearTimeout(_int);
			index_pic_index = overIndex;
			picTurn.prototype.picSwitch();
		});
		//鼠标悬浮在图片容器上停止动画，鼠标移开开始动画
		$j("#portal_block_500_content").hover(function(){
			clearTimeout(_int);
		},function(){
			_int = setTimeout("picTurn.prototype.picSwitch()",6000);
		});
	}
                
};




function click_product_omit_show(){
	$j('.click_product_omit_show').click(function (){
		obj	= $j(this).parents('.pls');
		$j(obj).find('.products_omit').hide();
		$j(obj).find('.products_all').show();
	});
}










	
try{
	function openCropper(pic) {
		width 	= $j('#id_img_width').val();
		height	= $j('#id_img_height').val();
		bid 	= $j('#id_hidden_bid').val();
		var url = 'misc.php?mod=imgcropper&cutting_type=index_cutting&width='+width+'&height='+height+'&bid='+bid+'&ictype=block&picflag=1&img='+pic;
		showWindow('cropper', url, 'get', 0);
	}
}catch(e){}


/*鼠标悬浮去掉样式*/
function hoverSub(box,cN){
	$j(box).live({
		mouseenter: function() {
			$j(this).removeClass(cN);
		},
		mouseleave: function() {
			$j(this).addClass(cN);
		}
	});
	
	
}
/*鼠标悬浮添加样式*/
function hoverAdd(box,cN){
	$j(box).live({
		mouseenter: function() {
			$j(this).addClass(cN);
		},
		mouseleave: function() {
			$j(this).removeClass(cN);
		}
	});
}
/*input textarea 获得焦点时添加样式*/
function focusBox(box){
	var cN = "focusBox";
	$j(box).live({
		focus: function(){
			$j(this).addClass(cN);
		},
		blur: function(){
			$j(this).removeClass(cN);
		}
	})	
}
/*模拟checkbox*/
var checkFun_items_live_click_object 	= new Object();
var checkFun_items_click				= new Object();	// 同一次按下只执行一次
function checkFun(items,cN){
	var self	= this;
	$j(items).each(function(){
		var checked = $j(this).find("input:checked").length;
		var checkC = checked == 0?"":cN;
		$j(this).addClass(checkC);
		
	});
	if(checkFun_items_live_click_object[items]){
		return ;
	}
	checkFun_items_live_click_object[items] = true;

	$j(items).bind("click",function(){
		if(checkFun_items_click[items]){
			return ;
		}
		
		if(items=='.wrap_full_screen'){		// 富文本与纯文件钮只执行一次
			checkFun_items_click[items]		= true;
			if($j(this).hasClass(cN)){
				$j(this).removeClass(cN);
				$j(this).find("input:checkbox").attr("checked",false);
				$j(this).find("input:checkbox").click();
			}else{
				$j(this).addClass(cN);
				$j(this).find("input:checkbox").attr("checked",true);
				$j(this).find("input:checkbox").click();
			}
			return ;
		}
		
		
		
		
		if($j(this).hasClass(cN)){
			$j(this).removeClass(cN);
			$j(this).find("input:checkbox").attr("checked",false);
			
			//判断是否点击纯文本链接，参数1 是取消纯文本模式
			if(this.id == "textId_1"){switchEditor(1);};
			
			isclick 	= $j(this).find("input:checkbox").attr('isclick');
			if(isclick=='true'){	// 允许click事件
				$j(this).find("input:checkbox").click();
			}else if( isclick=='showsyncinfo'){	// 动态 --> 广播块
				display('flw_post_subject');
				display('forumlistdev');
				
				var sObj = $('subject');
				sObj.value = '主题';
				strLenCalc(sObj, 'checklen', 70);
			}
			
		}else{
			$j(this).addClass(cN);
			$j(this).find("input:checkbox").attr("checked",true);
			
			//判断是否点击纯文本链接，参数0 是打开纯文本模式
			if(this.id == "textId_1"){switchEditor(0);}
			
			isclick 	= $j(this).find("input:checkbox").attr('isclick');
			if(isclick=='true'){	// 允许click事件
				$j(this).find("input:checkbox").click();
			}else if( isclick=='showsyncinfo'){	// 动态 --> 广播块
				display('flw_post_subject');
				display('forumlistdev');
				
				var sObj = $('subject');
				sObj.value = '主题';
				strLenCalc(sObj, 'checklen', 70);
			}
			
		}
		return false;
	});
	
}

function checkFun2(items){
	var cN = "checked_simcheck";
	$j(items).each(function(){
		var that = $j(this);
		var checked = $j(this).attr("checked");
		var checkC = checked == true?cN:"";
		var _wrap = '<label class="wrap_simcheck '+checkC+'"></label>'
		that.wrap(_wrap);
		that.before('<em class="box_simcheck"> </em>');
	})
	$j(".wrap_simcheck").live("click",function(){
		if($j(this).hasClass(cN)){
			$j(this).removeClass(cN);
			$j(this).find("input:checkbox").attr("checked",false);
		}else{
			$j(this).addClass(cN);
			$j(this).find("input:checkbox").attr("checked",true);
			
		}
		return false;
	})
}

function checkFunLine(e,cN){
		if($j(e).hasClass(cN)){
			$j(e).removeClass(cN);
			$j(e).find("input:checkbox").attr("checked",false);
		}else{
			$j(e).addClass(cN);
			$j(e).find("input:checkbox").attr("checked",true);
		}
		return false;
}

/**
 * 模拟select
 *  添加 onchange 事件
 */
var simSelectFun_islive 	= false;
function simSelectFun(items,clname){
	$j(items).each(function(){
		var that 	= $j(this);
		pclass 		= that.parent().attr('class');
		if( pclass=="simselect" ){
			return ;
		}
		
		var _name 	= $j(this).attr("name");
		var _id 	= that.attr("id");
		if(_name==undefined){_name=''}	// 没有数据为空
		if(_id==undefined){_id=''}	// 没有数据为空
		
		// 追加 onchange 事件		(heyuejaun)
		var ischange 		= that.attr('ischange');
		var change_event	= '';
		if(ischange=='true'){	// onchange 的属性只支持 单引号 ‘ 
			change_event 	= 'onchange="'+ that.attr('onchange')+'" ischange="true" ';
		}
		
		var _wrap = ['<span class="simselect">',
					'<strong title="',
					'',
					'">',
					'',
					'</strong>',
					'<em class="arrow_dark"></em>',
					'<select '+change_event+' name="'+_name+'" id="'+_id+'">',
					'',
					'</select>',
					'',
					'</span>']
		var _select = that.html();
		var _default = that.find("option:eq(0)").text();
		_wrap[2] = _wrap[4] = _default;
		_wrap[8] = _select;
		var w = that.width();
		w = w == 0?110:w+15;
		var array = [];
		var listItem 		= that.find("option");
		var selectedItem;
		
		listItem.each(function(){
			var isSelected = $j(this).is(":selected");
			if(isSelected == true){
				selectedItem = $j(this).text();
				_wrap[2] = _wrap[4] = selectedItem;
			};
			array.push({"key":$j(this).attr("value"),"value":$j(this).text()});					   
		})
		if(array.length > 6){
			var list = "<ul class='selectbox_simu' style='width:"+w+"px;height:240px;overflow-y:auto;'>";
		}else{
			var list = "<ul class='selectbox_simu' style='width:"+w+"px;'>";
		}
		for(i=0;i<array.length;i++){
			var cont = listItem
			if(i != array.length-1){
				list += "<li><a attribute='"+array[i].key+"'>"+array[i].value+"</a></li>";
			}else{
				list += "<li style='border:none;'><a attribute='"+array[i].key+"'>"+array[i].value+"</a></li>";
				list += "</ul>";
			}
		}
		_wrap[10] = list;
		that.replaceWith(_wrap.join(''));
		
	})
	if(simSelectFun_islive){	// live 只能用一次
		return ;
	}
	simSelectFun_islive = true;
	$j(".simselect strong").live("click",function(e){
		$j(".selectbox_simu").hide();
		$j(".simselect").css("z-index","");//为兼容IE6、7下层级问题
		$j(this).parent(".simselect").css("z-index","9")
		$j(this).parent(".simselect").find(".selectbox_simu").show();
		e.stopPropagation();
	})
	
	$j(".simselect").find("li a").live("click",function(){
		var _attr = $j(this).attr("attribute");
		var _val = $j(this).text();
		var _p = $j(this).parents(".simselect");
		var _box = $j(this).parents(".selectbox_simu");
		_p.css("z-index","");//为兼容IE6、7下层级问题
		_p.find("option").attr("selected",false);
		_p.find("option[value='" + _attr + "']").attr("selected",true); 
		_p.find("strong").text(_val).attr("title",_val);
		
		if(_p.find("select").attr('ischange')=='true'){	// 响应 change 事件		(heyuejaun)
			_p.find("select").trigger('change');
		}
		
		_box.hide();
	})
	$j(".simselect").live("mouseleave",function(){
		var _that = $j(this);
		var _box = $j(".selectbox_simu:visible");
		$j(document).click(function(){
			_box.hide();
			_that.css("z-index","");//为兼容IE6、7下层级问题
		})
	}) 
}
/*日期控件触发框*/
function timeControlBox(items){
	$j(items).each(function(){
		var that = $j(this);
		var _wrap = '<span class="wrap_timecon"></span>'
		that.wrap(_wrap);
		that.before('<em class="arrow_dark"></em>');
	})
}
/*获得焦点添加样式，失去焦点去掉样式（input textarea）*/
function boxFocusFun(fBox,wBox,cName){
	$j(fBox).focus(function(){
		$j(this).parents(wBox).addClass(cName);					
	}).blur(function(){
		$j(this).parents(wBox).removeClass(cName);					
	})
}
/*个人中心 -- 动态  顶部编辑框*/
function boxFocusFun2(fBox,fBox2,wBox,wBox2,cName,cName2,fVal,fVal2){
	$j(fBox).attr("value",fVal);
	$j(fBox).focus(function(){
		var curVal = $j(this).attr("value");
		if(curVal == fVal){
			$j(this).attr("value","");	
		}
		$j(wBox).addClass(cName);	
		if($j(wBox2).is(":visible")){
			$j(wBox2).addClass(cName2);	
		}
	}).blur(function(){
		var curVal = $j(this).attr("value");
		if(curVal == ''){
			$j(this).attr("value",fVal);
		}
		$j(wBox).removeClass(cName);	
		if($j(wBox2).is(":visible")){
			$j(wBox2).removeClass(cName2);
		}
	})
	$j(fBox2).live({
		focus: function(){
			var curVal = $j(this).attr("value");
			if(curVal == fVal2){
				$j(this).attr("value","");	
			}
			$j(wBox).addClass(cName);	
			$j(wBox2).addClass(cName2);
		},
		blur: function(){
			var curVal = $j(this).attr("value");
			if(curVal == ''){
				$j(this).attr("value",fVal2);
			}
			$j(wBox).removeClass(cName);
			$j(wBox2).removeClass(cName2);
		}
	})
}
/*个人中心 -- 动态 -- 关注 转播回复*/
function quickreply(fid, tid, feedid) {
	$j('#relaybox_'+feedid).css("display","none");
	var replyboxid = 'replybox_'+feedid;
	$j('.flw_replybox').html("");
	$j('.flw_replybox').css("display","none");
	if($j("#"+replyboxid).css("display") == "") {
		$j("#"+replyboxid).css("display","none");
	} else {
		ajaxget('forum.php?mod=ajax&action=quickreply&tid='+tid+'&fid='+fid+'&handlekey=qreply_'+feedid+'&feedid='+feedid, replyboxid);
		$j("#"+replyboxid).css("display","");
	}
}
function quickrelay(feedid, tid) {
	$j('#replybox_'+feedid).css("display","none");
	var replyboxid = 'relaybox_'+feedid;
	$j('.flw_replybox').html("");
	$j('.flw_replybox').css("display","none");
	if($j("#"+replyboxid).css("display") == "") {
		$j("#"+replyboxid).css("display","none");
	} else {
		ajaxget('home.php?mod=spacecp&ac=follow&op=relay&feedid='+feedid+'&tid='+tid+'&handlekey=qrelay_'+feedid, replyboxid);
		$j("#"+replyboxid).css("display","");
	}
	parentId = feedid;
}

/*mzDialog*/

/*function showBox(popCont,btn){
	var layerMask = '<div id="mzLayerMask" class="mzLayerMask" style="z-index: 10005; height: 515px; width: 1190px; display: block; top: 756px;"> </div>';
	var cont = ['<div id="mzDialog" class="mzdialog">',
				'',
				'</div>'];
	cont[1] = popCont;
	var endCont = cont.join('');
}*/


/*模拟radio*/
function radioController(pa){
	$j(pa + " .radiowrapper input[type='radio']").each(function(){
		if($j(this).attr('checked')){
			$j(pa).find(".radiowrapper").removeClass("radiochecked").next("input:radio").attr("checked",false);
			$j(this).parents('.radiowrapper').addClass("radiochecked").next("input:radio").attr("checked",true);
		}
	});
	$j(pa + " .radiowrapper").click(function(){
		if(!$j(this).hasClass("radiochecked")){
			$j(this).parents(pa).find(".radiowrapper").removeClass("radiochecked").next("input:radio").attr("checked",false);
			$j(this).addClass("radiochecked").next("input:radio").attr("checked",true);
			
			if( pa=='reportreason' ){
				$j('#message').val($j(this).find('.text_pway').text());
			}
			
			$j(this).find("[type='radio']").attr("checked","checked");
			
			return false;
		}
	});
	
}

/*列表项全选、单选控制删除按钮高亮灰显*///#deletepmform .checked_simcheck

function checkControlBtn(checkBtn,checkedItem,conBtn,classN,wrapper){
	$j(checkBtn).click(function(){
		var count = $j(checkedItem).length;
		if(count>0){
			$j(conBtn).removeClass(classN);
			$j(wrapper).attr("attribute","1")
		}else{
			$j(conBtn).addClass(classN);
			$j(wrapper).attr("attribute","0")
		}
		//alert($j(wrapper).attr("attribute"));
	})
}

var G ={
	scroll:null,
	radio:null,
	checkbox:null,
	testBtn:null,
	moreContent:null,
	checkBoxPlugIn3:null,
	checkBoxPlugIn4:null,
	dialog:null
};
function showBox(btn,box,w,h,closeBtn,okBtn){;
	$j(btn).click(function(){
		G.dialog = $j(box).mzDialog({'width':w,'height':h,'closeBtn':true,'nohide':true});/**调用弹出窗组件**/
		G.dialog.open()								
	})
	$j(".mzBlockLayer").live("click",function(){
		if(G.dialog){
			G.dialog.close();
		}
	}) //mzClose
	$j(".mzCancelBtn").live("click",function(){
		G.dialog.close();									 
	})
	hoverAdd(".mzClose","mzCloseh");
}

//页面顶部消息展开块操作
function newsLevelFun(){
	newsFirstLevelFun(4);
	hoverAdd(".item_newsmenu","hover_newsmenu");
	hoverAdd(".item_seclevel","hover_newsmenu");
}

//获取第一层级数据
function newsFirstLevelFun(_perPage){
	$j.ajax({
		type:"POST",
		url:"/misc.php?mod=message&first=1",
		dataType:"json",
		success:function(data){
			if(!data){return false;}
			var dataArray = data;
			var newsNum = 0;
			var newsCont = '<div class="title_newsmenu">全部消息</div>';
			for(i=0;i<dataArray.length;i++){
				var contC = ['<div class="item_newsmenu" attribute="'+dataArray[i].type+'">',
									'<div class="cont_itemnmenu">',
										'<h3>',
										'',
										'</h3>',
										'<p>',
										'',
										'</p>',
									'</div>',
								   '<div class="num_itemnmenu">',
								   '',
								   '</div>',
								   '<div class="itemcover_itemnmenu"></div>',
							   '</div>']
				contC[3] = dataArray[i].title;
				contC[6] = dataArray[i].text;
				contC[10] = dataArray[i].num;
				newsNum += Number(dataArray[i].num);
				if(dataArray[i].num != 0){
					var endContC = contC.join('');
					newsCont += endContC;
				}
			}
			
			$j("#newsNum").html(newsNum);
			if(newsNum == 0){
				$j("#newsNum_menu").removeClass("p_pop");
				$j("#newsNum").addClass("empty_newsnum");
				return false;
			}else{
				$j("#newsNum_menu").addClass("p_pop");
			}
			$j("#firstLevelNews").html(newsCont);
			$j(".item_newsmenu").unbind( "click" );
			$j(".item_newsmenu").click(function(){
				var msgType = $j(this).attr("attribute");
				newsSecLevelFun(msgType,_perPage);	 
			})
		}
	})
}
//获取第二层级数据
function newsSecLevelFun(type,number){
	var msgType = type;
	var _perPage = number;
	$j.ajax({
		type:"POST",
		url:"/misc.php?mod=message&type=" + msgType + "&perpage=" + _perPage,
		dataType:"json",
		success:function(data){
			var dataArray = data.list,
			dataNum = data.num,
			dataType = data.type,
			titleText = "",
			itemLink = 0;
			if(dataNum == 0){return false}
			if(dataType == "message"){
				titleText = "社区消息";
				itemLink = 1;
			}else if(dataType == "system"){
				titleText = "系统通知";
			}else if(dataType == "notice"){
				titleText = "社区提醒";
			}
			var newsCont = '<div class="title_newsmenu">' + titleText + '<span class="back_newsmenu">返回</span></div>';
			var className = "";
			if(msgType == "message"){
				className = "msgitem_seclevel";
			}
			try{	// 有报错
				for(i=0;i<dataArray.length;i++){
					var contC = ['<div class="item_seclevel ' + className + '" id="' + dataArray[i].id + '">',
									'<table cellspacing="0" cellpadding="0">',
										'<tr>',
											'<td class="head_seclevel"><a class="avatar">',
											'',
											'<span class="shadowbox_avatar"> </span></a></td>',
											'<td class="cont_seclevel"><div class="contwrap_seclevel">',
											'<div class="continner_seclevel">',
											'',
											'</div>',
											'<div class="btnbar_seclevel">',
												'<a href="javascript:;" title="忽略该条" class="readed_seclevel closenotice"></a>',
											'</div>',
											'</div></td>',
										'</tr>',
									'</table>',
								'</div>']	
					if(itemLink == 1){
						var locH = 'location.href="' + dataArray[i].url + '"';
						contC[0] = '<div class="item_seclevel ' + className + '" id="' + dataArray[i].id + '" onclick='+locH+'>';
					}
					contC[4] = dataArray[i].avatar;
					contC[8] = dataArray[i].text;
					var endContC = contC.join('');
					newsCont += endContC;
				}
			}catch(e){}
			newsCont += '<div class="item_seclevel more_seclevel"><a href="' + data.more_url + '">更多</a></div>';
			$j("#secLevelNews").html(newsCont);
			$j("#firstLevelNews").hide();
			$j("#secLevelNews").show();
			$j(".continner_seclevel").each(function(){//为每条提醒的最后一个链接添加清除本条功能
				$j(this).find("a:last").addClass("closenotice");
			})
			$j(".back_newsmenu").unbind("click");
			$j(".back_newsmenu").click(function(){
				newsFirstLevelFun(4);
				$j("#secLevelNews").hide();
				$j("#firstLevelNews").show();
			})
			$j(".closenotice").unbind("click");
			$j(".closenotice").click(function(){
				var thisP = $j(this).parents(".item_seclevel");
				var newId = thisP.attr("id");
				$j.ajax({
					type:'POST',
					url:'/misc.php?mod=message&read=1&type=' + dataType + '&id=' + newId,
					dataType:"json",
					success:function(data){
						var _num = $j("#newsNum").text();
						thisP.remove();	
						newsSecLevelFun(dataType,4);
						if(_num != 0){
							$j("#newsNum").text(Number(_num - 1));
							if(_num - 1 == 0){
								$j('#newsNum_menu').hide();
								$j('#newsNum').addClass('empty_newsnum')
								$j('#secLevelNews').empty()
							}
							
						}
					}
				})								  
			})
			
		}
	})	
}
function getNoticeAll(){
	$j.ajax({
		type:"POST",
		url:"/misc.php?mod=message&type=notice_all&isindex=" + $j("#mzCust").attr("rel"),
		dataType:"json",
		success:function(data){
			if(typeof(data.message_notice_all) != "undefined"){
				if(data.message_notice_all != 0){
					$j("#newsNum").removeClass('empty_newsnum');
				}else{
					$j("#newsNum").addClass('empty_newsnum');
				}
				$j("#newsNum").text(data.message_notice_all);
			}
			if(typeof(data.message_notice_num) != "undefined"  && parseInt(data.message_notice_num) > 0){
				$j('#message_notice_num').text('提醒' + parseInt(data.message_notice_num));
				$j('#message_notice_num').addClass('xi1');
			}
			if(typeof(data.message_system_num) != "undefined"  && parseInt(data.message_system_num) > 0){
				$j('#message_system_num').text('未读系统消息');
				$j('#message_system_num').addClass('xi1');
			}
			if(typeof(data.message_news_num) != "undefined"  && parseInt(data.message_news_num) > 0){
				$j('#message_news_num').text('未读消息');
				$j('#message_news_num').addClass('xi1');
			}
			if(typeof(data.is_today_singin) != "undefined" && data.is_today_singin){
				var cookie_mobile = ''
				if(typeof getCookie === 'function' && typeof(cookiepre)!=='undefined'){
					cookie_mobile = getCookie(cookiepre + 'mobile');
				}
				var  is_mobile = !navigator.userAgent.match(/pad|gt-p1000/i) && navigator.userAgent.match(/android|webos|ip(hone|od)|opera (mini|mobi|tablet)|iemobile|windows.+phone|mobile|fennec|kindle (Fire)|maemo|blackberry|playbook|bb10\; (touch|kbd)|Symbian(OS)|Ubuntu Touch/i);
				if(is_mobile && cookie_mobile!='no'){
					$j("#nosignin_link").text("已签到");
					$j("#nosignin_link").attr('onclick','javasctipt:void(0)');
				}else{
					$j("#signin_expand").addClass("hassignin_expand");
					$j("#signin_status").text("已签到");
				}
			}else{
				$j("#signin_status").text("签 到");
				if($j("#nosignin_link") && data.formhash){
					$j("#nosignin_link").attr('attribute','/plugin.php?id=dsu_amupper&ppersubmit=true&formhash='+ data.formhash +'&infloat=yes');
				}
			}
		}
	});
}
//默认文字
function defaultTxtFun(obj,val){
	$j(obj).attr("value",val);
	$j(obj).bind("focus",function(){
		var curVal = $j(this).attr("value");
		if(curVal == val){
			$j(this).attr("value","");	
		}
	})
	$j(obj).bind("blur",function(){
		var curVal = $j(this).attr("value");
		if(curVal == ''){
			$j(this).attr("value",val);
		}
	})
}
//批准好友请求
function deleteQueryNotice(uid, type) {
	var dlObj = $(type + '_' + uid);
	if(dlObj != null) {
		var id = dlObj.getAttribute('notice');
		var x = new Ajax();
		x.get('home.php?mod=misc&ac=ajax&op=delnotice&inajax=1&id='+id, function(s){
			dlObj.parentNode.removeChild(dlObj);
		});
	}
}

function errorhandle_pokeignore(msg, values) {
	deleteQueryNotice(values['uid'], 'pokeQuery');
}



var supportOpFun_lock   = 0;
//支持反对
function supportOpFun(btn){
	//if(successSup == false){return false;}
	var type = btn.split('_');
	var supNum;
	var btnItem = $j("#" + btn);
	var url = btnItem.attr("data-href");
        var time    = new Date().getTime();
        var rand    = Math.ceil( (Math.random()) * 1000 );
        if(supportOpFun_lock==1){
            return ;
        }
        
        if(url.indexOf('?')>0 ){
            url = url + '&random=' + time + rand;
        }else{
            url = url + '?random=' + time + rand;
        }
        supportOpFun_lock = 1;
	$j.ajax({
		type:"GET",
		url:url,
		dataType:"json",
		success:function(data){
                        supportOpFun_lock = 0;
			if(data.type == 1){
				var classN = "";
				var scoreBox = btnItem.parents(".cbar_postlist").find(".score_post a.xi2");
				if(type[1] == 'add'){
					classN = "hassupport_postlist";
                                        btnItem.attr("data-href",data.url);
				}else if(type[1] == 'subtract'){
					classN = "hasoppose_postlist";
                                        btnItem.attr("data-href",data.url);
				}
				btnItem.addClass(classN);
				scoreBox.addClass(classN);
				scoreBox.text(data.score + "分");
                                
                                
			}
                        if(data.type == 2){
				var classN = "";
				var scoreBox = btnItem.parents(".cbar_postlist").find(".score_post a.xi2");
				if(type[1] == 'add'){
					classN = "hassupport_postlist";
                                        btnItem.attr("data-href",data.url);
                                        //var textnameid = "recommend_add_text_" + type[2];
                                        //$j("#"+textnameid).text('支持');
                                        //$j("#"+textnameid).html('支持');
				}else if(type[1] == 'subtract'){
					classN = "hasoppose_postlist";
                                        btnItem.attr("data-href",data.url);
                                        //var textnameid = "recommend_subtract_text_" + type[2];
                                        //$j("#"+textnameid).text('反对');
                                        //$j("#"+textnameid).html('反对');
				}
				btnItem.addClass(classN);
				scoreBox.addClass(classN);
				scoreBox.text(data.score + "分");
			}
			if(data.message){
				tipPop("#" + btn,data.message);
			}
		}
	})
}
//pop框
function tipPop(btn,msg,closetime){
	var count = null;
	var tipContNum = $j("#tipBox").length;
	if(tipContNum == 0){
		var newNode = document.createElement("div");
		newNode.id = "tipBox";
		document.body.appendChild(newNode);
	}
	var tipCont = $j("#tipBox");
	tipCont.html(msg);
	var tipContH = tipCont.height() + 20;
	var offset = $j(btn).offset();
	var tipTop = offset.top - tipContH;
	var tipLeft = offset.left - tipCont.width() + 20;
	tipCont.css({top:tipTop,left:tipLeft}).show();
	var hideTip = function(){
		tipCont.hide();
	};
	if(!closetime){closetime = 3000}
	count = setTimeout(hideTip,closetime);
}

//click post
function clickPost(postBtn,url,callback){
	$j.ajax({
		type:"POST",
		url:url,
		success:function(){
			window.location.href = callback;
		}
	})
}

function transdate(endTime){
        var date=new Date();
        date.setFullYear(endTime.substring(0,4));
        date.setMonth(endTime.substring(5,7)-1);
        date.setDate(endTime.substring(8,10));
        date.setHours(endTime.substring(11,13));
        date.setMinutes(endTime.substring(14,16));
        date.setSeconds(endTime.substring(17,19));
        return Date.parse(date)/1000;
}

function servicemanage_click(){
       
            $j('#export').click(function(){
                          if((transdate($j('#enddate').val()) - transdate($j('#begindate').val()))/86400 > 80){
                             alert('超过查询范围');
                          }else{
                            $j('#servicform').attr('action','servicemanage.php?action=export');
                            $j('#servicform').submit();
                          }
            });

            $j('#manage_query').click(function(){
                       if((transdate($j('#enddate').val()) - transdate($j('#begindate').val()))/86400 > 80){
                            alert('超过查询范围');
                        }else{      
                            $j('#servicform').attr('action','servicemanage.php');
                            $j('#servicform').submit();
                        }
            });
}

//个人中心 - 动态 空间锁定提示信息 关闭按钮操作
function spaceClosedFun(){
	$j('#closebtn').live('click',function(){
		var boxPa = $j(this).parent().parent();
		if(boxPa.hasClass('flw_replybox')){
			boxPa.hide();
		}
	})
}
//发表按钮点击后置灰，几秒后恢复
function subClickFun(btn,s){
	$j(btn).live('click',function(){
		var btnP = $j(this).parents('.normalbtn');
		if(btnP.hasClass('disabledgraybtn')){
			return false;
		}else{
			subDisableFun(btnP,s)
		}
	})
}
function subDisableFun(btnP,s){
	btnP.removeClass('bluebtn').addClass('disabledgraybtn');
	subDisableFun.prototype = {
		recoverBtn : function(){
			btnP.removeClass('disabledgraybtn').addClass('bluebtn');
		}
	}
	setTimeout('subDisableFun.prototype.recoverBtn()',s*1000);
}
function subOnclickFun(btn,s){
	var btnP = $j("#" + btn).parents('.normalbtn');
	if(btnP.hasClass('disabledgraybtn')){
		return false;
	}else{
		var that = $j("#" + btn);
		btnP.removeClass('bluebtn').addClass('disabledgraybtn');
		that.submit();
		subOnclickFun.prototype = {
			recoverBtn : function(){
				btnP.removeClass('disabledgraybtn').addClass('bluebtn');
			}
		}
		setTimeout('subOnclickFun.prototype.recoverBtn()',s*1000);
	}
}
//点击后隐藏块A，显示块B
function clickShowHidden(divA,divB,paC){
	$j("#" + divA).show();
	$j("#" + divB).hide();
	if(paC){
		$j("#" + divA).parent("." + paC).removeClass(paC);
	}
}
//拓展阅读块 - 可能感兴趣的人 换一组功能
function turnMayLike(btn,box){
	$j(btn).click(function(){
		turnMayLikeFunc(btn,3,"table tr","#mayLikeBox");
	})
}
function turnMayLikeFunc(urlBox,count,turnItem,box){
	var _url = $j(urlBox).attr("data-href");
	var uidItem = $j(box).find(".userhead_expand .avatar");
	var uidGroup = "";
	var uidNum = 0;
	uidItem.each(function(){
		var uid = $j(this).attr("data-uid");
		if(uidNum == 0){
			uidGroup += uid;
		}else{
			uidGroup += "_" + uid;
		}
		uidNum ++;
	})
	$j.ajax({
		type:"GET",
		url:_url + "&count=" + count + "&uidgroup=" + uidGroup,
		dataType:'json',
		success:function(data){
			var num = data.length;
			if(num == 0){return false;}
			var endCont = '';
			for(i=0;i<num;i++){
				var cont = ['<tr>',
							'<th class="userhead_expand"><a href="home.php?mod=space&uid='+data[i].uid+'" class="avatar" data-uid="'+data[i].uid+'">'+data[i].avatar+'<span class="shadowbox_avatar"> </span></a></th>',
							'<td class="userinfo_expand"><a href="home.php?mod=space&uid='+data[i].uid+'">'+data[i].username+'</a><p>'+data[i].reason+'</p></td>',
							'<td class="attention_expand"><a href="javascript:;" data-href="/home.php?mod=spacecp&ac=follow&op=add&hash=775b4d8b&fuid='+data[i].uid+'&infloat=yes&handlekey=followmod&inajax=1&ajaxtarget=fwin_content_followmod" >收听</a></td>',
							'</tr>']
				endCont += cont.join('');
			}
			$j(box).find(turnItem).remove();
			$j(box).find("table").append(endCont);
		}
	});
}
/*点击切换按钮样式*/
/*function turnBtnClass(btn,cName,cont){
	$j(btn).toggle(
	function(){
		$j(this).removeClass(cName);
		$j(cont).css({height:"160px",overflow:"hidden"});
	},
	function(){
		$j(this).addClass(cName);
		$j(cont).css({height:"",overflow:""});
	})
}*/
/*签到插件*/
function signinFunc(btn,tipBox){
	$j(btn).click(function(){
		var _url = $j(this).find("a").attr("attribute");
		var _tipCont = $j(tipBox).find(".tipcont_signin");
		var _btnCont = $j(btn).find(".btncont_signin");
		var _signin = $j(this).hasClass("hassignin_expand")?1:0;
		if(_signin == 1){return false;}//若已签到，跳出方法
		if(_url.match("login") != null){//若为登录链接，给出登录提示
			clearTimeout(counter);
			_tipCont.html("请先<a href='/login.php' target='_blank'>登录</a>");
			$j(tipBox).show();
			var hideTip = function(){$j(tipBox).hide()};
			var counter = setTimeout(hideTip,5000);
		}else{
			$j.ajax({
				url:_url,
				dataType:'json',
				type:"POST",
				success:function(data){
					var status = data.status,
					message = data.message,
					checkin = data.checkin;
					if(status == 1 && checkin == 1 && _signin == 0){
						$j(btn).addClass("hassignin_expand");
						_btnCont.text("已签到");
					}
					if(message){
						clearTimeout(counter);
						_tipCont.html(message);
						$j(tipBox).show();
						var hideTip = function(){$j(tipBox).hide()};
						var counter = setTimeout(hideTip,5000);
					}
				}
			})
		}
	})
}
/* 帖子列表页 - 收听 */
function followmodFunc(btn){
	$j(btn).live('click',function(){
		var that = this;
		var btnItem = $j(that);
		var url = btnItem.attr("data-href");
		var count2;
		$j.ajax({
			type:'GET',
			url:url + '&block=maylike',
			dataType:'json',
			success:function(data){
				if(data.message){
					tipPop(that,data.message);
				}
				if(data.type == 1){
					turnItem = btnItem.parents("tr");
					turnMayLikeFunc(".turnbtn_maylike",1,turnItem,"#mayLikeBox");
				}
			}
		})
	})
}
/* 帖子内容页 - 回复按钮 */
function fastReplyFunc(btn,box){
	$j(btn).live("click",function(){
		var that = this;
		var btnItem = $j(this);
		var listItem = btnItem.parents(".item_postlist");
		var url = $j(this).attr("data-href");
		var offset = $j("#" + box).offset();
		var ifLogin = $j("#tipBoxLogin").length;
		var ifOld = $j("#oldThreadTip").length;
		if(ifLogin != 0){//若为未登录情况下
			tipPop(that,"请先<a target='_blank' href='/login.php'>登录</a>");
		}else{
			if(listItem.hasClass("firstitem_postlist")){//如果是主题，直接跳转到快速回复框
				window.scrollTo(0,offset.top);
				checkFocus();
				return false;
			}
			$j.ajax({
				type:'GET',
				url:url + '&infloat=yes&handlekey=reply&inajax=1&ajaxtarget=fwin_content_reply',
				dataType:'json',
				success:function(data){
					if(data.type == 1){
						window.scrollTo(0,offset.top);
						checkFocus();
						$j("#fastposteditor .area").removeClass("defaulttext_area");
						$j("#fastposthiddenview").html(data.message).css('height','auto').append("<div id='quoteDelBtn'></div>");
						var form = $j("#fastpostform");
						form.find("input:hidden[name=reppost]").val(data.reppost);
						form.find("input:hidden[name=reppid]").val(data.reppid);
						form.find("input:hidden[name=noticeauthormsg]").val(data.noticeauthormsg);
						form.find("input:hidden[name=noticetrimstr]").val(data.noticetrimstr);
						form.find("input:hidden[name=noticeauthor]").val(data.noticeauthor);
					}else{
						tipPop(that,data.message);
					}
				}
			})
		}
	})
}
