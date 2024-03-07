namespace ShowNest.Web.ViewModels.Events;

public class TicketPriceViewModel
{
    public string SeatArea { get; set; }
    public string SeatSelectionMethod { get; set; }
    public TicketsViewModel Tickets { get; set; }
}