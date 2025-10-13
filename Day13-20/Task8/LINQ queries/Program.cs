using System;

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

        var groupByCategory=from i in products where i.Category=="Appliances" select i;
        var AveragePriceCategory = groupByCategory.Average(i=>i.Price);
        int i1 = 1;
        foreach(var item in groupByCategory)
        {
            Console.WriteLine((i1++)+" "+item);
        }
        Console.WriteLine("Average Price of the Category $"+AveragePriceCategory);

    }
}