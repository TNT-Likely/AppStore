using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AppStore.Youths.BLL;
using AppStore.Youths.Model;
namespace AppStore.Youths.Web.Areas.Admin.Controllers
{
    public class AdController : Controller
    {
        //
        // GET: /Admin/Base/
        private BaseService<App> baseService=new BaseService<App>();
        private BaseService<Manager> baseServiceM = new BaseService<Manager>();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Login()
        {
            //App a = new App();
            //a.AppName = "aaa";
            //a.AppClassId = 1;
            //a.AppTypeId = 2;
            //a.AddTime = DateTime.UtcNow;
            //a.UpdateTime = DateTime.UtcNow;
            //baseService.Add(a);
            return View();
        }

        [HttpPost]
        public ActionResult Login(Manager manager)
        {
            //if (baseServiceM.Find)
            //{


            //}
            return View();
        }
    }
}
