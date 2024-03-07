using ShowNest.Web.ViewModels.UserAccount;

namespace ShowNest.Web.ViewModels.Events
{
    public class RegistrationViewModel
    {
        public EventDetailViewModel EventDetail { get; set; }
        public TicketsViewModel Tickets { get; set; }
        public SeatsViewModel Seat { get; set; }
        public PrefillsInfoViewModel Prefills { get; set; }

        public bool ShownParticipatedCampaign { get; set; }

    }
}
