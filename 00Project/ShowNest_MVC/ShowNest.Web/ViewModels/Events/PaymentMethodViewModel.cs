namespace ShowNest.Web.ViewModels.Events
{
    public class PaymentMethodViewModel
    {
        public string PaymentMethodName { get; set; }

        public string IconUrl { get; set; }
        public int BankID { get; set; }
        public int BankAccountNumber { get; set; }
        public string PaymentCode { get; set; }
        public string BankName {  get; set; }
        public string AccountName {  get; set; }

        public DateTime EndPayTime { get; set; }


        public bool Refundable { get; set; }

        public bool AgreedTerms { get; set; }

        public decimal MinAmount { get; set; }

        public decimal MaxAmount { get; set; }
    }
}
