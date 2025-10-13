using System;
using System.Collections.Generic;

namespace ECommerceApp
{
    public class ShoppingCart
    {
        private int p_id;
        private string p_name="";
        private double p_price;
        private int p_quantity;

        public ShoppingCart() { } // Default constructor

        public ShoppingCart(int id, string name, double price, int quantity)
        {
            this.p_id = id;
            this.p_name = name;
            this.p_price = price;
            this.p_quantity = quantity;
        }

        public void AddProduct(List<Product> products, List<ShoppingCart> list)
        {
            Console.Write("Enter the Id which you want to add to Cart: ");
            if (!int.TryParse(Console.ReadLine(), out int id))
            {
                Console.WriteLine("Invalid ID. Please enter a number.");
                return;
            }

            foreach (ShoppingCart cart in list)
            {
                if (cart.p_id == id)
                {
                    cart.p_quantity++;
                    Console.WriteLine("Product quantity updated in cart.");
                    return;
                }
            }

            foreach (Product p in products)
            {
                if (p.Id == id)
                {
                    ShoppingCart l = new ShoppingCart(p.Id, p.Name, p.Price, 1);
                    list.Add(l);
                    Console.WriteLine("Product added successfully.");
                    return;
                }
            }
            Console.WriteLine("Product ID not found.");
        }

        public void RemoveProduct(List<ShoppingCart> list)
        {
            Console.Write("Enter the Id which you want to remove from Cart: ");
            int id=Convert.ToInt32(Console.ReadLine());
            ShoppingCart toRemove = null;
            foreach (ShoppingCart product in list)
            {
                if (product.p_id == id)
                {
                    toRemove = product;
                    break;
                }
            }

            if (toRemove != null)
            {
                list.Remove(toRemove);
                Console.WriteLine("Product removed successfully.");
            }
            else
            {
                Console.WriteLine("Product not found in cart.");
            }
        }

        public void DisplayCart(List<ShoppingCart> list)
        {
            if (list.Count == 0)
            {
                Console.WriteLine("Cart is empty.");
                return;
            }

            Console.WriteLine("\nS.No   Name         Quantity   Price");
            int i = 1;
            foreach (ShoppingCart p in list)
            {
                Console.WriteLine($"{i}.   {p.p_name}      {p.p_quantity}        ₹{p.p_price}");
                i++;
            }
        }

        public double CalculateTotal(List<ShoppingCart> list)
        {
            double total = 0;
            foreach (ShoppingCart p in list)
            {
                total += p.p_quantity * p.p_price;
            }
            return total;
        }

        public void Checkout(List<ShoppingCart> cart)
        {
            if (cart.Count == 0)
            {
                Console.WriteLine("Cart is empty.");
                return;
            }

            Console.WriteLine($"Total amount: ₹{CalculateTotal(cart)}");
            Console.Write("Proceed to checkout (y/n)? ");
            string confirm = Console.ReadLine();
            if (confirm.ToLower() == "y")
            {
                cart.Clear();
                Console.WriteLine("Payment successful. Thank you for shopping!");

            }
            else
            {
                Console.WriteLine("Checkout cancelled.");
            }
        }
    }
}
