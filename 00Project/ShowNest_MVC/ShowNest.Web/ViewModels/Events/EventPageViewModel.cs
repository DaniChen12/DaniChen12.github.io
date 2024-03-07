using ShowNest.Web.ViewModels.Organization;
using ShowNest.Web.ViewModels.Events;

public class EventPageViewModel
    {
        public EventDetailViewModel EventDetail { get; set; }

        public List<TicketsViewModel> AllTickets { get; set; }

        public OrganizationDetailViewModel OrganizationDetail { get; set; }

    
} 

