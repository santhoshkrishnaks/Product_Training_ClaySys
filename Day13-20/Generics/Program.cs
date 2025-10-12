using System;
namespace Generics
{
    class Program
    {
        static void Main(string[] args)
        {
            Stack<int> stack = new Stack<int>();

            stack.Push(1);
            stack.Push(2);
            stack.Push(3);
            stack.Push(4);
            Console.WriteLine(stack.ToString());
            Console.WriteLine(stack.Pop());
            Console.WriteLine(stack.ToString());
            Console.WriteLine(stack.Peek());
            Stack<string> stack1= new Stack<string>();
            stack1.Push("A");
            stack1.Push("B");
            stack1.Push("C");
            stack1.Push("D");
            Console.WriteLine(stack1.ToString());
            Console.WriteLine(stack1.Pop());
            Console.WriteLine(stack1.ToString());
            Console.WriteLine(stack1.Peek());

        }
    }
}