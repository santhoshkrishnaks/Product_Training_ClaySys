using System;

class Program
{
    public delegate int MathOperation(int x, int y);

    private static int add(int x, int y)
    {
        return x + y;
    }
    private static int subtract(int x, int y) { return x - y; }
    private static int multiply(int x, int y) { return x * y; }
    private static int divide(int x, int y) { return x / y; }


    static void Main(string[] args)
    {
        MathOperation addobj = add;
        MathOperation subobj = subtract;
        MathOperation mulobj = multiply;
        MathOperation divobj = divide;
        Console.WriteLine("Using the delegate calling add 2+3 =  "+addobj(2, 3));
        Console.WriteLine("Using the delegate calling subtract 8-6= "+subobj(8,6));
        Console.WriteLine("Using the delegate calling multiply 2*3= "+mulobj(2,3));
        Console.Write("Using the delegate calling divide 8/4= "+divobj(8,4));

    }
}