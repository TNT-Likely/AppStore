var appCenter = {
    type: 'app',
    catId: 1,
    init: function(){
        if (location.href.indexOf("games") != -1) {
            this.catId = 2;
            this.type = "game";
        }
        this.initTitle();
        this.bindEvent();
        photoesController.initImgSlider();
    },

    initTitle: function(){
        mz_util.selectMenu(appCenter.type);
        $(".content_nav").css({"margin-top": 0, "margin-bottom": "10px"});
        if (appCenter.type == 'game') {
            document.title = 'Flyme 杞欢鍟嗗簵-娓告垙';
            $(".app_category.category .title_18").html("娓告垙鍒嗙被");
            $("#hotTitle").text("鐑棬娓告垙");
            $(".app_recommend.paid").hide();
            mz_util.footBottom();
        }
    },

    bindEvent: function(){
        $(".more.subject").click(function(){
            location = "/"+appCenter.type+"s/public/special/list";
        });
        $(".more.new").click(function(){
            location = "/"+appCenter.type+"s/public/category/"+appCenter.catId+"/all/new/index/0/18";
        });
        $(".more.free").click(function(){
        	if(appCenter.type=='game')
    		{
        		location = "/"+appCenter.type+"s/public/category/"+appCenter.catId+"/all/feed/index/0/18";
    		}
        	else{
        		location = "/"+appCenter.type+"s/public/category/"+appCenter.catId+"/free/feed/index/0/18";
        	}
        });
        $(".more.paid").click(function(){
        	if(appCenter.type=='game')
    		{
        		 location = "/"+appCenter.type+"s/public/category/"+appCenter.catId+"/all/feed/index/0/18";
    		}
        	else{
        		 location = "/"+appCenter.type+"s/public/category/"+appCenter.catId+"/paid/feed/index/0/18";
        	}
        });
        $("#freeLink").click(function(){
            $("#freeList").show();
            $("#paidList").hide();
            $(this).addClass("current").siblings().removeClass("current");
        });
        $("#paidLink").click(function(){
            $("#freeList").hide();
            $("#paidList").show();
            $(this).addClass("current").siblings().removeClass("current");
        });

        $("#categoryList").on("click", "li", function(){
            location = "/"+appCenter.type+"s/public/category/" + $(this).attr("data-param") + "/all/feed/index/0/18";
        });
        $(".app_recommend").on("click", ".app_one", function(){
            location = "/"+appCenter.type+"s/public/detail?package_name=" + $(this).attr("data-param");
        });
        $(".app_recommend.subject").on("click", "img", function(){
            location = "/"+appCenter.type+"s/public/special/" + $(this).attr("data-param") + "/list";
        });
        $(".app_category.rank").on("click", "li", function(){
            location = "/"+appCenter.type+"s/public/detail?package_name=" + $(this).attr("data-param");
        });
        $(".enter.dev").click(function(){
            window.open("http://developer.meizu.com");
        });
        $(".enter.mz_mail").click(function(){
            $("body").append("<iframe src='mailto:mzdn@meizu.com' class='none'></iframe>");
        });

        $("#bannerImgList").on("click", "img", function(){
            location = $(this).attr("data-type") == "app"
                    ? "/"+appCenter.type+"s/public/detail?package_name=" + $(this).attr("data-param")
                    : "/"+appCenter.type+"s/public/special/" + $(this).attr("data-content") + "/list";
        });
    }
};

$(function(){
    appCenter.init();
});