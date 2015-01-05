using System.Web.Mvc;

namespace AppStore.Youths.Web.Areas.app
{
    public class appAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "app";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "app_default",
                "app/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
