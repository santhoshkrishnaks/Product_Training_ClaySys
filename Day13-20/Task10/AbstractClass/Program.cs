using System;

namespace AbstractClass
{
    public abstract class Shape
    {
        public abstract double GetArea();
        public abstract double GetPerimeter();
    }

    public class Circle : Shape
    {
        public double radius;
        public Circle(double radius)
        {
            this.radius = radius;
        }
        public override double GetArea()
        {
            return (Math.PI*Math.Pow(radius,2));
        }
        public override double GetPerimeter()
        {
            return 2*Math.PI*radius;
        }
    }
    public class Triangle : Shape
    {
        public double a, b, c;
        public double ba;
        public double h;
        public Triangle(double ba, double h,double a,double b,double c)
        {
            this.ba = ba;
            this.h = h;
            this.a = a;
            this.c = c;
            this.b = b;
        }
        public override double GetArea()
        {
            return (this.ba * this.h);
        }
        public override double GetPerimeter() 
        {
            return (this.a+this.b+this.c);
        }


    }
    public class Rectangle : Shape
    {
        public double l;
        public double w;
        public Rectangle(double l, double w)
        {
            this.l = l;
            this.w = w;
        }
        public override double GetArea()
        {
            return l*w;
        }
        public override double GetPerimeter()
        {
            return 2*(l+w);
        }

    }
    class Program
    {
        static void Main(string[] args)
        {
            Shape rect = new Rectangle(10,20);
            Shape triangle = new Triangle(20, 30, 3, 4, 5);
            Shape cir = new Circle(3.52);
            Console.WriteLine("Area of Rectangle ==="+rect.GetArea());
            Console.WriteLine("Perimeter of Rectangle ==="+rect.GetPerimeter());
            Console.WriteLine("Area of Circle ==== "+cir.GetArea());
            Console.WriteLine("Circumference of Circle ==== " + cir.GetPerimeter());
            Console.WriteLine("Area of Triangle ==== " + triangle.GetArea());
            Console.WriteLine("Perimeter of Triangle ==== " + triangle.GetPerimeter());
        }
    }
}