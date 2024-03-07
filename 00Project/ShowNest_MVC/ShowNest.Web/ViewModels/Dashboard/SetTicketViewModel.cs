namespace ShowNest.Web.ViewModels.Dashboard
{
    public class SetTicketViewModel
    {
        public int TicketId { get; set; }
        public string TicketName { get; set; }
        public DateTime PurchaseTime { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }

        public int SalesQuantity { get; set; }
        public int SalesUnit {  get; set; }
    }
}
