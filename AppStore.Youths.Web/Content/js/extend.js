function formError(aim,msg) {
    fu=aim.parent(".normalInput");
    fu.addClass("error");
    if (fu.next("span").length == 0) {
        fu.after("<span class='error'>" + msg + "</span>");
    }
}

function jump(seconds, url) {
    setTimeout("location.href='"+url+"'", seconds);
}

function logout(url) {
    $.ajax({
        type: "POST",
        url: "/base/logout?url="+url
    });
}
var emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;