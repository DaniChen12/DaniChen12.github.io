using Microsoft.AspNetCore.Mvc;

namespace ShowNest.Web.Controllers
{
    public class OrganizationsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult ContactOrganization()
        {
            return View();
        }
        public IActionResult CreateOrganization()
        {
            return View();
        }

    }
}
