namespace ShowNest.Web.ViewModels.Events
{
    public class OrderPaymentMethodViewModel
    {
        public EventDetailViewModel EventDetail { get; set; }
        public SeatsViewModel Seats { get; set; }
        public TicketsViewModel Tickets { get; set; }
        public PaymentMethodViewModel PaymentMethod { get; set; }
        public string IdNumber {  get; set; }
    }
}
