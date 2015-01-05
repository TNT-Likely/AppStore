using System.Web.Mvc;

namespace AppStore.Youths.Web.Areas.Bbs
{
    public class BbsAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Bbs";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Bbs_default",
                "Bbs/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
