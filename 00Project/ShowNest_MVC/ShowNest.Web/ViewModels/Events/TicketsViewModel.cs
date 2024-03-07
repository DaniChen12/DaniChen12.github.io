using System.Data.SqlTypes;

namespace ShowNest.Web.ViewModels.Events
{
    public class TicketsViewModel
    {
        public string TicketTypeName { get; set; }
        public decimal TicketPrice { get; set; }
        public int  PurchaseAmount { get; set; }

        public DateTime TicketSalseBegin { get; set; }
        public DateTime TicketSalseEnd { get; set; }
    public List<TicketsViewModel> AllTickets { get; set; }
    }
}
