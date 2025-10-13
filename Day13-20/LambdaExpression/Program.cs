using System;
using System.Collections.Generic;

class Program
{
    static void Main(string[] args)
    {
        List<int> list=new List<int>();
        list.Add(1);
        list.Add(2);
        list.Add(3);
        list.Add(4);
        list.Add(5);
        list.Add(6);
        list.Add(7);
        list.Add(8);
        list.Add(9);
        list.Add(10);
        List<int> evennumbers = list.FindAll(x => x % 2 == 0);
        Console .Write("Filtered Even Numbers: ");
        foreach(int x in evennumbers)
        {
            Console.Write(x+" ");
        }
          
    }
}