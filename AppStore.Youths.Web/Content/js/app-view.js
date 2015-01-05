var apps = {
    totalCount: 10, // 总数据
    currentPage: 1, // 当前页码
    pageSize: 10, // 每页显示的资源条数
    catId: $('#count').attr("data-cid"),
    categoryName: $('#count').attr("data-cname"),
    name: $('#count').attr("data-name"),
    appId: $('#count').attr("data-appId"),
    
    init: function () {
        this.formartDes();
        this.initTitle();
        this.loadData();
        this.bindEvents();
        mzScroll.init();
        $("#imagesList li .detail_img").imgbox({
            'speedIn'		: 0,
            'speedOut'		: 0,
            'alignment'		: 'center',
            'overlayShow'	: true,
            'allowMultiple'	: false
        });
    },

    formartDes: function(){
        $(".description_detail").each(function(){
            var $obj = $(this);
            var lineH = $obj.css("line-height");
            var totalH = parseInt(lineH) * 5;
            if ( $obj.height() > totalH  ) {
                $obj.css({
                    height: totalH + 'px',
                    'overflow-y': 'hidden'
                }).after('<div class="moreDes">查看更多&gt;&gt;</div>');
                $(".moreDes").one("click", function(){
                    $(this).hide().prev().css('height', 'auto');
                });
            }
        });
    },

    initTitle: function(){
        
        var self = this;
        
        var delimiter = "&nbsp;&nbsp;&gt;&nbsp;&nbsp;";
        var cateType_url = '<a class="current" href ="/apps/public/index">应用</a>';
        var category_url = '<a class="current" href ="/apps/public/category/' + self.catId + '/all/feed/index/0/18">' + self.categoryName + '</a>';

        var end = '<span class="ellipsis" title="'+self.name+'">'+self.name+'</span>';
        mz_util.selectMenu("app");
        mz_util.setNavTitle(cateType_url + delimiter + category_url + delimiter + end);
    },
    
    bindEvents:function(){
        
        var self = this;
        //show more
        util.showMore();
    },
    loadData: function () {
        var self = this;
        self.currentPage = 1; //强制从第一页开始加载
        var start = 0;
        var parameter = {};
        var action = '/apps/public/evaluate/list';
        parameter = {"app_id": self.appId,"start": start, "max": self.pageSize,"mzos": '3.0', "screen_size": '1080x1800'};
        $.getJSON(action, parameter, function (result) {
            self.viewData(result.value);
            self.buildPage();
        });
    },
    viewData: function (data) {
      //显示数据
       var self = this;
       
       var eva = $('#eva');
       eva.html('');
       
       var commentList = data.list;
       if( commentList == null ){
           eva.append('暂无评论');
           return;
       }
           
       for (i = 0, size = commentList.length; i < size; i++) {
           if(!commentList[i].comment || !commentList[i].comment.trim()){
               continue;
           }
           text = document.createElement('div');
           $(text).addClass('user_comment');
           var htmlText = commentList[i].comment;
           var htmlTextOmit = commentList[i].comment_omit;
           if(htmlTextOmit){
               $(text).html('<ul>' +
                   '<li><div class="commentList"><span>' + htmlTextOmit + '...</span>&nbsp;&nbsp;<a href="javascript:void(0);" class="current show_more">查看更多>></a><input type="hidden" value="'+commentList[i].comment +'" class="detail_input" /></div></li>'+
                   '<li>'+
                   '<div class="left user_left"><span class="user_name gray">' + commentList[i].user_name +
                   '</span><span class="comments_time gray">' + commentList[i].create_time +
                   '</span></div>' +
                   '<div class="right user_right"><span class="version gray">版本' + commentList[i].version_name + '</span><span class="star_bg" data-num="' + commentList[i].star + '"></span></div></li>'+
                   '</ul>');
           }else{
               $(text).html('<ul>' +
                   '<li>' + htmlText + '</li>'+
                   '<li>'+
                   '<div class="left user_left"><span class="user_name gray">' + commentList[i].user_name +
                   '</span><span class="comments_time gray">' + commentList[i].create_time +
                   '</span></div>' +
                   '<div class="right user_right"><span class="version gray">版本' + commentList[i].version_name + '</span><span class="star_bg" data-num="' + commentList[i].star + '"></span></div></li>'+
                   '</ul>');
           }

           eva.append(text);
       }
        util.showMore();
        mz_util.initStars();
       self.totalCount = data.totalCount;
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
                var url = '/apps/public/evaluate/list';
                var parameter ={};
                 parameter = {"app_id": self.appId,"start": start, "max": self.pageSize,"mzos": '3.0', "screen_size": '1080x1800'};
                $.get(url, parameter, function (result) {
                    if (result.code == 200) {
                        self.totalCount = result.value.totalCount;
                        window['pager'].reload({'pagenumber': p, 'pageSize': self.pageSize, 'totalCount': result.value.totalCount});
                        self.viewData(result.value);

                    }
                });
            }
        });
    }

};
$(function () {
    apps.init();
});