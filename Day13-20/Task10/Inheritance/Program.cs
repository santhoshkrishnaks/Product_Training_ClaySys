using Microsoft.VisualBasic;
using System;
namespace Inheritance
{
    public interface ILogger
    {
        void LogInfo(string message);
        void LogWarning(string message);
        void LogError(string message);
    }
    public class ConsoleLogger : ILogger
    {
        public void LogInfo(string msg)
        {
            Console.WriteLine("Console Info=====>" + msg);
        }
        public void LogWarning(string msg)
        {
            Console.WriteLine("Console Warning=====>" + msg);
        }
        public void LogError(String msg)
        {
            Console.WriteLine("Console Error=====>" + msg);
        }
    }
    public class FileLogger : ILogger
    {
        private readonly string _filename;
        public FileLogger(string filename)
        {
            _filename = filename;
        }
        public void LogInfo(string msg)
        {
            Console.WriteLine("File Info=====>" + msg);
        }
        public void LogWarning(string msg)
        {
            Console.WriteLine("File Warning=====>" + msg);
        }
        public void LogError(String msg)
        {
            Console.WriteLine("File Error=====>" + msg);
        }
    }
    public class Injection
    {
        private readonly ILogger logger;
        public Injection(ILogger logger)
        {
            this.logger = logger;
        }
        public void display()
        {
            logger.LogInfo("This is done by Dependency Injection");
            logger.LogWarning("This warning done by dependency injection");
            logger.LogError("This error done by Dependency Injection");
        }

    }
    class Program
    {
        static void Main(string[] args)
        {
            ILogger logger1 = new ConsoleLogger();
            ILogger logger2 = new FileLogger("filename");
            Injection injection = new Injection(logger2);
            injection.display();
        }
    }
}