using AppStore.Youths.BLL;
using AppStore.Youths.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AppStore.Youths.Web.Areas.app.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /app/Home/

        private BaseService<AppClass>  baseServiceAC=new BaseService<AppClass>();
        private BaseService<App> baseServiceA = new BaseService<App>();
        private BaseService<AppTheme> baseServiceAT = new BaseService<AppTheme>();
        private BaseService<AppThemeDetail> baseServiceATD = new BaseService<AppThemeDetail>();
        private int a;
        public ActionResult Index()
        {
            
            ViewBag.user = Session["user"];
            ViewBag.category = baseServiceAC.FindList(p => p.AppClassName != "",true,p=>p.AppClassName);
            ViewBag.downloadPF = baseServiceA.FindPageList(1, 10, out a, p => p.AppName != "" && p.AppIsFree==true, "AppDownload", true);
            ViewBag.downloadPP = baseServiceA.FindPageList(1, 10, out a, p => p.AppName != "" && p.AppIsFree==false, "AppDownload", true);
            ViewBag.IsRecommand = baseServiceA.FindPageList(1, 10, out a, p => p.AppName != "" && p.AppIsRecommended == true, "AddTime", true);
            ViewBag.AppTheme = baseServiceAT.FindPageList(1, 3, out a, p => p.AppThemeName != "", "UpdateTime", true);
            ViewBag.newapp = baseServiceA.FindPageList(1, 10, out a, p => p.AppName != "" && p.AppIsNew==true, "AppDownload", true);
            ViewBag.freeapp = baseServiceA.FindPageList(1, 5, out a, p => p.AppName != "" && p.AppIsFree==true, "AppDownload", true);
            ViewBag.payapp = baseServiceA.FindPageList(1, 5, out a, p => p.AppName != "" && p.AppIsFree==false, "AppDownload", true);
            return View();
        }

        public ActionResult Category(int cid)
        {
            ViewBag.category = baseServiceAC.FindList(p => p.AppClassName != "", true, p => p.AppClassName);
            ViewBag.applist = baseServiceA.FindList(p => p.AppClassId == cid, true, p => p.Id);
            return View();
        }

        public ActionResult Detail(int did)
        {
            ViewBag.app = baseServiceA.Find(p => p.Id == did);
            return View();
        }


        public ActionResult tCategory()
        {
            ViewBag.apptheme = baseServiceAT.FindList(p => p.AppThemeName != "", true, p => p.UpdateTime);
            return View();
        }
        public ActionResult tDetail(int atid)
        {
            ViewBag.appthemedetail = baseServiceATD.FindList(p => p.Id == atid,true,p=>p.UpdateTime);
            ViewBag.apptheme = baseServiceAT.Find(p => p.Id == atid);
            return View();
        }

        public ActionResult index2()
        {
            return View();
        }
    }
}
