namespace Server.Model
{
    public class OrderEntity
    {
        public int OrderId { get; set; }
        public string CustomerName { get; set; } = null!;
        public string TrackingId { get; set; } = null!;
        public DateTime OrderDate { get; set; }
        public int Quantity { get; set; }
        public string Location { get; set; } = null!;
        public decimal Total { get; set; }
        public string Status { get; set; } = null!;
    }
}
