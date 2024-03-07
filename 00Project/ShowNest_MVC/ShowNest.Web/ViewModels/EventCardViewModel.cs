namespace ShowNest.Web.ViewModels
{
    public class EventCardViewModel
    {
        public string EventName { get; set; }
        public string EventLink { get; set; }
        public string EventImgUrl { get; set; }
        public string EventTime { get; set; }
        public EventStatus EventStatus { get; set; }
    }

    public enum EventStatus
    {
        Selling = 0,
        ViewEvent = 1,
        Ended = 2
    }
}
