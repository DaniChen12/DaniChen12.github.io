using System.Security.Policy;

namespace ShowNest.Web.ViewModels.UserAccount

{
    public class UserAccountViewModel
    {
        public string UserName { get; set; }
        public string NickName { get; set; }
        public string Email { get; set; }
        public int PhoneNumberCode { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime BirthDay { get; set; }
        public Gender Gender { get; set; }
        public IEnumerable<ActivityRegion> PreferredActivityRegions { get; set; }

        public UserWebsiteViewModel Website { get; set; }
        public UserWebsiteViewModel Fb { get; set; }
        public UserWebsiteViewModel IG { get; set; }

        public string Biography { get; set; }
        public string Country { get; set; }
        //public TimeZone TimeZone { get; set; }
        public bool IsSubscribed { get; set; }
        public bool RestrictedLevel { get; set; }
        public bool OpenPersonalPage { get; set; }
        public UserImageViewModel Image { get; set; }
    }
    public enum Gender
    {
        Male=0,
        Female=1,
        Other=2
    };

    public enum ActivityRegion
    {
        Region1=0,
        Region2=1,
        Region3=2
    }
}
