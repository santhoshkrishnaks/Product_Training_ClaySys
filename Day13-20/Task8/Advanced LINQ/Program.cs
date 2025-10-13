using System;
using System.ComponentModel;
using System.Linq;

class Product
{
    public string Name { get; set; } = "";
    public string Category { get; set; } = "";
    public int Price { get; set; }
    public Product(string name, string category, int price)
    {
        Name = name;
        Category = category;
        Price = price;
    }
    public override string ToString()
    {
        return "" + this.Name + " " + this.Category + " " + this.Price;
    }
}

class Program
{
    static void Main(string[] args)
    {
        List<Product> products = new List<Product>(){
            new Product ("Laptop","Electronics",1200),
            new Product ("Smartphone","Electronics",800),
            new Product ("Refrigerator","Appliances",1500),
            new Product ("Microwave","Appliances",300),
            new Product ("TV","Electronics",1000),
            new Product ("Blender","Appliances",150)};

        var groupByCategroy = from i in products
                              group i by i.Category into g
                              orderby g.Count() descending
                              select new
                              {
                                  Category = g.Key,
                                  Count = g.Count(),
                                  Product = g.ToList()
                              };
        foreach(var item in groupByCategroy)
        {
            Console.WriteLine($"Category: {item.Category} Number of Products: {item.Count}");
            int i = 1;
            foreach(var item2 in item.Product)
            {
                Console.WriteLine((i++) + " " + item2);
            }
            Console.WriteLine();
        }
    }
}