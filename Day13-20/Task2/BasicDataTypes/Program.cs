using System;
class DataTypes
{
    static void Main(String[] args)
    {
        //DataTypes
        //Integer
        int age = 20;

        //Double
        double Cgpa = 9.09;

        // Boolean
        bool isStudent = true;

        //Character
        char grade = 'O';

        // String
        string name = "Santhosh Krishna K S";

        Console.WriteLine("Name: " + name);
        Console.WriteLine("Age: " + age);
        Console.WriteLine("CGPA: " + Cgpa);
        Console.WriteLine("Is student: " + isStudent);
        Console.WriteLine("Grade: " + grade);

        //Arithmetic Operation
        int x = 10;
        int y = 3;
        Console.WriteLine("x + y = " + (x + y));     // Addition
        Console.WriteLine("x - y = " + (x - y));     // Subtraction
        Console.WriteLine("x * y = " + (x * y));     // Multiplication
        Console.WriteLine("x / y = " + (x / y));     // Integer division
        Console.WriteLine("x % y = " + (x % y));     // Modulus
        // Comparison operators
        Console.WriteLine("x > y: " + (x > y));      // Greater than
        Console.WriteLine("x < y: " + (x < y));      // Less than
        Console.WriteLine("x == y: " + (x == y));    // Equal to
        Console.WriteLine("x != y: " + (x != y));    // Not equal to
        // Logical operations
        bool result1 = (x > y) && isStudent;
        Console.WriteLine("(x > y) && isStudent: " + result1); // AND

        bool result2 = (x < y) || isStudent;
        Console.WriteLine("(x < y) || isStudent: " + result2); // OR

        bool result3 = !isStudent;
        Console.WriteLine("!isStudent: " + result3); // NOT
    }
}