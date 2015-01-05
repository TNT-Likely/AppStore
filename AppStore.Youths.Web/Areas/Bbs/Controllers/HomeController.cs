using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AppStore.Youths.Web.Areas.Bbs.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Bbs/Home/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Category()
        {
            return View();
        }

        public ActionResult Detail()
        {
            return View();
        }
    }
}
