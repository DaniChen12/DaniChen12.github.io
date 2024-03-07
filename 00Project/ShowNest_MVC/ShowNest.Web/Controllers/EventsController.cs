using System.Collections.Generic;
using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using ShowNest.Web.Services;
using ShowNest.Web.ViewModels.Events;
using ShowNest.Web.ViewModels.Organization;

namespace ShowNest.Web.Controllers
{
    public class EventsController : Controller
    {
        /// <summary>
        /// 測試於網址列輸入的參數並查詢資料庫內容
        /// </summary>
        /// <param name="OrganizationId"></param>
        /// <param name="EventId"></param>
        /// <returns></returns>
        //private readonly ShowNestContext _context;
        //public EventsController(ShowNestContext context)
        //{
        //    _context = context;
        //}
        //public IActionResult Index(string OrganizationId, string EventId)
        //{
        //    var organization = _context.Organizations.FirstOrDefault(x => x.OrganizationId == OrganizationId);
        //    if (organization == null)
        //    {
        //        // 組織不存在，返回相應的頁面或錯誤訊息
        //        return NotFound(); // 或者其他適當的處理
        //    }

        //    // 組織存在，繼續執行其他操作
        //    return View();
        //}
        //以上測試中--------------------------------------------------------------
        public IActionResult Index()
        {
			var eventCardService = new EventCardService();
			var eventCardsVM = eventCardService.SetEventCards();

			return View(eventCardsVM);
        }

        public IActionResult EventPage()
        {
            var model = new EventPageViewModel()
            {
                EventDetail = new EventDetailViewModel()
                {
                    MainImage = "https://picsum.photos/1300/600/?random=10",
                    EventName = "Build School Demo Test Activity",
                    StartTime = DateTime.Now,
                    EventLocation = "Build School",
                    Content="12",
                    EventAddress= "106台北市大安區忠孝東路三段96號11號樓之1",
                    EventAttendance = "500"
                 },
                AllTickets = new List<TicketsViewModel>{
                new TicketsViewModel {
                    TicketTypeName="搖滾票",
                    TicketSalseBegin= DateTime.Now,
                    TicketSalseEnd= DateTime.Now,
                    TicketPrice =3600
                },new TicketsViewModel {
                    TicketTypeName="一般票",
                    TicketSalseBegin= DateTime.Now,
                    TicketSalseEnd= DateTime.Now,
                    TicketPrice =2800
                },new TicketsViewModel {
                    TicketTypeName="優待票",
                    TicketSalseBegin= DateTime.Now,
                    TicketSalseEnd= DateTime.Now,
                    TicketPrice =1200
                },new TicketsViewModel {
                    TicketTypeName="站票",
                    TicketSalseBegin= DateTime.Now,
                    TicketSalseEnd= DateTime.Now,
                    TicketPrice =800
                }
                },
                OrganizationDetail=new OrganizationDetailViewModel()
                {

                },
                
            };
            return View(model);
        }


        //private static DateTime Function(string dateTimeStr)
        //{
        //    // 确保日期字符串符合 ISO 8601 标准
        //    string iso8601FormattedStr = dateTimeStr.Replace("/", "-").Replace(" ", "T") + ":00";  // 添加秒和时区信息

        //    // 解析日期时间（考虑时区）
        //    DateTimeOffset dateTimeOffset;

        //    // 如果字符串已经包含时区信息，则使用 DateTimeOffset.Parse
        //    if (iso8601FormattedStr.Contains("+"))
        //    {
        //        dateTimeOffset = DateTimeOffset.Parse(iso8601FormattedStr, CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal);
        //    }
        //    else
        //    {
        //        // 如果字符串不包含时区信息，需要添加它
        //        iso8601FormattedStr += "+08:00"; // 假设要解析的时间是 UTC+8
        //        dateTimeOffset = DateTimeOffset.ParseExact(iso8601FormattedStr, "yyyy-MM-ddTHH:mm:sszzz", CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal);
        //    }

        //    // 返回 UTC+8 时区的 DateTime
        //    return dateTimeOffset.LocalDateTime;
        //}

        public IActionResult TicketTypeSelection()
        {
            var model = new TicketTypeSelectionViewModel()
            {
                EventDetail = new EventDetailViewModel()
                {
                    MainImage = "https://picsum.photos/1300/600/?random=10",
                    EventName = "NOT SUPER JUNIOR-L.S.S. THE SHOW : TH3EE GUYS",
                    StartTime = DateTime.Now,
                    EventLocation = "亞洲國際博覽館 10號展館 / 國際機場亞洲國際博覽館",
                    EventHost = "ShowNest",
                    TicketCollectionChannel = "電子票券",
                    SeatAreaImage = "https://picsum.photos/1200/1200/?random=10"
                },
                PaymentMethods = new List<PaymentMethodViewModel>
                {
                    new PaymentMethodViewModel()
                    {
                        PaymentMethodName = "信用卡"
                    },
                    new PaymentMethodViewModel()
                    {
                        PaymentMethodName = "ATM"
                    }
                },
                TicketPriceRow = new List<TicketPriceViewModel>{
                    new TicketPriceViewModel()
                    {
                        SeatArea = "B1特一, B1特二",
                        SeatSelectionMethod = "自行選位",
                        Tickets = new TicketsViewModel()
                        {
                            TicketTypeName = "全票",
                            TicketPrice = 3000
                        }
                    },
                    new TicketPriceViewModel()
                    {
                        SeatArea = "紫1D, 紫1B, 黃2C, 紫1A, 紫1C, 紅1A, 紅1B, 紅1C, 紅1D",
                        SeatSelectionMethod = "自行選位",
                        Tickets = new TicketsViewModel()
                        {
                            TicketTypeName = "全票",
                            TicketPrice = 2600
                        }
                    },
                    new TicketPriceViewModel()
                    {
                        SeatArea = "紫2C, 紅2B, 紫1E, 紅2D, 紅2C, 紫2B, 紫2D, 黃2B, 紅1E, 黃2D",
                        SeatSelectionMethod = "自行選位",
                        Tickets = new TicketsViewModel()
                        {
                            TicketTypeName = "全票",
                            TicketPrice = 2400
                        }
                    },
                    new TicketPriceViewModel()
                    {
                        SeatArea = "紫2C, 紅2B, 紅2D, 紅2C, 紫2B, 紫2D, 紫2E, 紅2E, 黃2A, 黃2E",
                        SeatSelectionMethod = "自行選位",
                        Tickets = new TicketsViewModel()
                        {
                            TicketTypeName = "全票",
                            TicketPrice = 2200
                        }
                    }
                }
            };
            return View(model);
        }

        public IActionResult SelectArea()
        {
            return View();
        }

        public IActionResult SelectSeats()
        {
            return View();
        }

        public IActionResult Registrations()
        {
            return View();
        }

        public IActionResult PaymentInfo()
        {
            return View();
        }

        public IActionResult OrderDetail()
        {
            return View();
        }
    }
}