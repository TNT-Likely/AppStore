var category = {
    totalCount: 100, // 总数据
    currentPage: 1, // 当前页码
    pageSize: 18, // 每页显示的资源条数
    catId:'1',
    
    generateUrl: function () {
        
        var category_id = $("#category_id").val();
        var all_paid_free = $("#all_paid_free").val();
        var new_hot = $("#new_feed").val();
        
        var action = "/apps/public/category/" + category_id + "/" + all_paid_free + "/" + new_hot;
        return action;
    },
    
    init: function (totalCount) {
        this.initTitle();
        
        this.totalCount = totalCount;
        
        var category_id = $("#category_id").val();
        var all_paid_free = $("#all_paid_free").val();
        var new_hot = $("#new_feed").val();
        
        $("li[data-param='"+ category_id + "'] span").addClass("current");
        $("li[data-param='"+ category_id + "']").siblings().find("span").removeClass("current");
        $("li[data-param='"+ category_id + "']").addClass('category_checked');
        
        $("a[data-param='"+ all_paid_free + "']").css("color", "#32A5E7");
        $("a[data-param='"+ all_paid_free + "']").siblings().css("color", "rgb(165,165,165)");
        $("a[data-param='"+ all_paid_free + "']").addClass('category_checked');
        
        $("a[data-param='"+ new_hot + "']").css("color", "#32A5E7");
        $("a[data-param='"+ new_hot + "']").siblings().css("color", "rgb(165,165,165)");
        $("a[data-param='"+ new_hot + "']").addClass('category_checked');
        
        this.buildPage();
        this.bindEvents();

        if ( !$.trim($(".download_container").text()) ) {
            $(".download_container").append("<span class='none_data'>暂无数据！</span>")
        }
    },

    initTitle: function(){
        var delimiter = "&nbsp;&nbsp;&gt;&nbsp;&nbsp;";
        var cateType_url = '<a class="current" href ="/apps/public/index">应用</a>';
        var end = '分类';
        mz_util.selectMenu("app");
        mz_util.setNavTitle( cateType_url + delimiter + end);
    },

    bindEvents:function(){
        
        var self = this;
        
        $("#categoryList").on("click", "li", function(){
            
            var category_id = $(this).attr("data-param");
            
            var all_paid_free = $("#all_paid_free").val();
            var new_hot = $("#new_feed").val();
            window.location.href="/apps/public/category/" + category_id + "/" + all_paid_free + "/" + new_hot + "/index/0/18";
        });
        
        $(".price_type").on("click", "a", function(){
            
            var all_paid_free = $(this).attr("data-param");
            
            var category_id = $("#category_id").val();
            var new_hot = $("#new_feed").val();
            window.location.href="/apps/public/category/" + category_id + "/" + all_paid_free + "/" + new_hot + "/index/0/18";
        });
        
        $(".search_result").on("click", ".right a", function(){
            var new_hot = $(this).attr("data-param");
            
            var category_id = $("#category_id").val();
            var all_paid_free = $("#all_paid_free").val();
            window.location.href="/apps/public/category/" + category_id + "/" + all_paid_free + "/" + new_hot + "/index/0/18";
        });
    },

    viewData: function (apps) {
      //显示数据
       var self = this;
       
       var app = $('#app');
       app.html('');

       for (i = 0, size = apps.length; i < size; i++) {
           if(!apps[i]){
               continue;
           }

           text = document.createElement('div');
           $(text).addClass('search_one downloading').attr({
               "data-appId": apps[i].id,
               "data-catId": apps[i].categoryId
           });
//           if( (i+1) %3 == 0){
//               $(text).addClass('right');
//           }
           $(text).html('<a href="/apps/public/detail?package_name=' + apps[i].packageName + '"><img src=' + apps[i].icon + '></a>'+
                   '<div class="one_right"><a href="/apps/public/detail?package_name=' + apps[i].packageName + '"><span class="app_name" title="'+apps[i].name+'">' + apps[i].name + '</span></a>'+
                   '<div class="star_bg" data-num="' + apps[i].star + '"></div><span class="download_num">' + apps[i].downloadCount + '</span><a class="price">' + apps[i].price + '</a></div>');
           app.append(text);
       }
       mz_util.initStars();
       mz_util.formatDownloadNum();
       mz_util.footBottom();
       mz_util.formatPrice();
    },
    buildPage: function () {
        //分页
        var self = this;
        window['pager'] = $('#pager').pager({
            pagenumber: self.currentPage,
            pageSize: self.pageSize,
            totalCount: self.totalCount,
            'callBack': function (p) {
                self.currentPage = p;
                var start = (self.currentPage - 1) * self.pageSize;
                var url = self.generateUrl() + '/' + start + '/' + self.pageSize;
                var parameter ={};
                $.get(url, parameter, function (result) {
                    if (result.code == 200) {
                        window['pager'].reload({'pagenumber': p, 'pageSize': self.pageSize, 'totalCount': result.value.totalCount});
                        self.viewData(result.value);
                    }
                });
            }
        });
    }
};

$(function(){
    category.init($("#category_count").val());
});
