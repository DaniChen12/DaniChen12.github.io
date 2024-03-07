using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Identity.Client;
using ShowNest.Web.ViewModels.Events;
using System.ComponentModel;

namespace ShowNest.Web.ViewModels.Dashboard
{
    public class SetActivityViewModel
    {
        public int EventId { get; set; }
        public string MainImage { get; set; }
        public string EventName { get; set;}
        public bool PrivacyStatus { get; set; }
        public string WebsiteLink {  get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        
        public int EventAttendance { get; set; } //活動人數

        public int LocationId { get; set; }//場所id
        public string LocationName { get; set; }//場所名稱
        public string EventAddress { get; set; } //活動地址
        public string EventIntroduction {  get; set; }//活動簡介

        public string EventDescription {  get; set; }//活動描述

    }
}
