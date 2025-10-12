using System;

namespace ECommerceApp
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public double Price { get; set; }
        public int Quantity { get; set; }

        public void Setting(int id, string name, double price, int quantity)
        {
            this.Id = id;
            this.Name = name;
            this.Price = price;
            this.Quantity = quantity;
        }

        public void DisplayProduct()
        {
            Console.WriteLine($"{Id}   {Name}   ₹{Price}   Qty: {Quantity}");
        }
    }
}
