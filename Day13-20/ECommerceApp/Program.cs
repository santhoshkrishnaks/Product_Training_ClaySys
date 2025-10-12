using System;
using System.Collections.Generic;

namespace ECommerceApp
{
    class Program
    {
        static void Main(string[] args)
        {
            List<Product> products = new List<Product>();
            List<ShoppingCart> list = new List<ShoppingCart>();
            ShoppingCart o = new ShoppingCart();

            // Sample Products
            Product p1 = new Product(); p1.Setting(1, "Laptop", 60000, 10);
            Product p2 = new Product(); p2.Setting(2, "Headphones", 2000, 15);
            Product p3 = new Product(); p3.Setting(3, "Mouse", 500, 25);
            products.Add(p1);
            products.Add(p2);
            products.Add(p3);

            while (true)
            {
                Console.WriteLine("\n======= E-Commerce App =======");
                Console.WriteLine("1. View Products");
                Console.WriteLine("2. Add Product to Cart");
                Console.WriteLine("3. View Cart");
                Console.WriteLine("4. Remove Product from Cart");
                Console.WriteLine("5. Checkout");
                Console.WriteLine("6. Exit");
                Console.Write("Select an option (1-6): ");

                string option = Console.ReadLine();
                Console.WriteLine();

                switch (option)
                {
                    case "1":
                        Console.WriteLine("Available Products:");
                        foreach (Product p in products)
                            p.DisplayProduct();
                        break;

                    case "2":
                        o.AddProduct(products, list);
                        break;

                    case "3":
                        o.DisplayCart(list);
                        break;

                    case "4":
                        o.RemoveProduct(list);
                        break;

                    case "5":
                        o.Checkout(list);
                        break;

                    case "6":
                        Console.WriteLine("Exiting the application. Thank you!");
                        return;

                    default:
                        Console.WriteLine("Please enter a valid option (1-6).");
                        break;
                }
            }
        }
    }
}
