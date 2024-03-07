namespace ShowNest.Web.ViewModels.Events
{
    public class EventDetailViewModel
    {
        public string MainImage { get; set; }
        public string EventName { get; set; }
        public DateTime StartTime { get; set; }
        
        public int EventId { get; set; }
        public string EventLocation { get; set; }
        public string EventHost { get; set; }
        public string TicketCollectionChannel { get; set; }
        
        public PaymentMethodViewModel PaymentMethodName { get; set; }
        public string SeatAreaImage { get; set; }

        public string Content { get; set; } // 與 CKEditor 綁定的屬性
        public string EventAddress { get; set; } //活動地址
        public string EventAttendance { get; set; } //活動人數

        
    }
}
