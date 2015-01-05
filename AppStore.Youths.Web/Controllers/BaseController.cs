using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AppStore.Youths.Model;
using AppStore.Youths.BLL;

namespace AppStore.Youths.Web.Controllers
{
    public class BaseController : Controller
    {
        //
        // GET: /Home/
        private BaseService<User> baseServiceU = new BaseService<User>();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public String Register(FormCollection fd)
        {
            var user = new User();
            TryUpdateModel<User>(user,fd);
            if (baseServiceU.Exist(p=>p.UserName==user.UserName))
            {
                return "0";
            }
            user.AddTime = DateTime.UtcNow;
            user.UpdateTime = DateTime.UtcNow;
            baseServiceU.Add(user);
            return "1";
        }

        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public String Login(FormCollection fd)
        {
            var user = new User();
            TryUpdateModel<User>(user, fd);
            if (baseServiceU.Exist(p => p.UserName == user.UserName && p.UserPassword == user.UserPassword))
            {
                Session["user"] = baseServiceU.Find(p => p.UserName == user.UserName);
                return "1";
            }
            else
            {
                return "0";
            }
        }

        [HttpPost]
        public void Logout(string url)
        {
            Session["user"] = null;
            Response.Redirect(url);
        }
    }
}
