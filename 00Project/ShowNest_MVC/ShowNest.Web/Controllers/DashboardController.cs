using Microsoft.AspNetCore.Mvc;

namespace ShowNest.Web.Controllers
{
    public class DashboardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult NewEvent()
        {
            return View();
        }

        public IActionResult Events(string viewType)
        {
            if (viewType == "CreateActivity")
            {
                return View("CreateActivity");
            }

            if (viewType == "SetActivity")
            {
                return View("SetActivity");
            }

            if (viewType == "SetTicket")
            {
                return View("SetTicket");
            }

            if(viewType == "SetTable")
            {
                return View("SetTable");
            }

            if (viewType == "ActivitiesList")
            {
                return View("ActivitiesList");
            }
            if (viewType == "RegistrationList")
            {
                return View("RegistrationList");
            }

            return BadRequest("Invalid view type.");
        }

        public IActionResult Organizations(string viewType)
        {
            switch (viewType)
            {
                case "Overview":
                    return View("Overview");
                case "Eventslist":
                    return View("Eventslist");
                case "info":
                    return View("info");

                default: 
                    return BadRequest("Invalid view type.");

            }

        }
    }
}
