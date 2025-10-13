using System;
using System.Reflection;
using System.Text;

public static class ObjectProperty
{
    public static string ObjProperty(object obj)
    {
        if(obj == null)
        {
            return "null";
        }
        Type tyoe=obj.GetType();
        PropertyInfo[] p = tyoe.GetProperties();
        StringBuilder sb=new StringBuilder();
        sb.AppendLine("Object type: " + tyoe.Name);
        foreach (var pi in p)
        {
            object value=pi.GetValue(obj);
            sb.AppendLine($"{pi.Name}: {value}");
        }
            return sb.ToString();
    }
    class Student
    {
        public string Name { get; set; } = "";
        public int Age { get; set; }

    }
    class Book
    {
        public string Name { get; set; } = "";
        public string Title { get; set; } = "";
    }
    class Program
    {
        static void Main(string[] args)
        {
            Book book = new Book { Name = "George", Title = "1984" };
            Student student = new Student { Name = "Santhosh", Age = 20 };
            Console.WriteLine(ObjectProperty.ObjProperty(book));
            Console.WriteLine(ObjectProperty.ObjProperty(student));
        }
    }
}