using System;
using System.Threading.Tasks;
using System.Net.Http;
using Newtonsoft.Json.Linq;

class Program
{
    static async Task Main(string[] args)
    {
        Console.WriteLine("Enter the City Name");
        string city=Console.ReadLine();
        await GetWeather(city.Trim());
        Console.WriteLine("Fetched Successfully");

    }
    public static async Task GetWeather(string city)
    {
        try
        {
            string api = "7c7aad8c3b5cde7327e5f2c531850130\r\n";
            string url = $"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api}";
            using HttpClient client = new HttpClient();
            string result = await client.GetStringAsync(url);
            JObject json = JObject.Parse(result);
            string name = json["name"]?.ToString();
            string temp = json["main"]?["temp"]?.ToString();
            string weather = json["weather"]?[0]?["description"]?.ToString();
            Console.WriteLine($"City:               {name}");
            Console.WriteLine($"Temperature:                {temp}°C");
            Console.WriteLine($"Condition:              {weather}");
        }
        catch
        {
            Console.Write("Can't Find the City Error...................");
        }
    }
}