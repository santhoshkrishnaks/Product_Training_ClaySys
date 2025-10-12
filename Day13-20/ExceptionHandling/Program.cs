using System;

namespace ExceptionHandling
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Enter the Number 1");
            int num1=Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter the Number 2");
            int num2=Convert.ToInt32(Console.ReadLine());
            try
            {
                int res = num1 / num2;
                Console.WriteLine($"Answer: {res}");
            }
            catch (DivideByZeroException ex)
            {
                Console.WriteLine($"Error: {ex}");
            }
            finally
            {
                Console.WriteLine("Program Ended Successfully");
            }
        }
    }
}