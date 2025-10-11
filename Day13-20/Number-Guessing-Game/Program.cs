using System;
class NumberGuessingGame
{
    static void Main(string[] args)
    {
        Random random = new Random();
        int target = random.Next(1, 101);
        int attempts = 0;
        while (true)
        {
            Console.WriteLine("Enter the Guessed Number : ");
            int number=Convert.ToInt32(Console.ReadLine());
            attempts++;
            if (number == target)
            {
                Console.WriteLine("Congratulations! You Guessed the Correct Number");
                Console.WriteLine("You Guessed the Number by "+attempts+" Attempts");
                break;
            }
            else if (number < target)
            {
                Console.WriteLine("Too Low");
            }
            else
            {
                Console.WriteLine("Too High");
            }
        }
    }
}