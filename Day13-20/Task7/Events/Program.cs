using System;


class Clock
{
    public delegate void EventHandler(object sender, EventArgs e);
    private System.Timers.Timer timer;
    public event EventHandler OnTick;
    public Clock()
    {
        timer = new System.Timers.Timer(1000);
        timer.Elapsed += TimerElapsed;
        timer.AutoReset= true;
    }
    public void Start()
    {
        timer.Start();
    }
    public void Stop()
    {
        timer.Stop();
    }
    public void TimerElapsed(object sender, EventArgs e)
    {
        OnTick?.Invoke(this, EventArgs.Empty);
    }
}
class Display
{
    public void Subscribe(Clock clock)
    {
        clock.OnTick += ShowTime;
    }
    public void ShowTime(object sender, EventArgs e)
    {
        Console.WriteLine("Current Time: "+DateTime.Now.ToLongTimeString());
    }
}
class Program
{
    static void Main(string[] args)
    {
        Clock clock = new Clock();
        Display display = new Display();
        display.Subscribe(clock);
        Console.WriteLine("Press Any Key To stop  the clock");
        clock.Start();
        Console.ReadKey();
        clock.Stop();
        

    }    
}