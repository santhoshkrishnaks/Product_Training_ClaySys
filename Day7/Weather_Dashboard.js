const api = "7c7aad8c3b5cde7327e5f2c531850130";
const searchbtn=document.getElementById("searchbtn");
searchbtn.onclick=getWeather;

async function getWeather() {
    const error=document.getElementById("error");
    const input=document.getElementById("city");
    const display=document.querySelectorAll(".data");
    let city=input.value.trim();
    input.value="";
    if(!city){
        
        display.forEach(el => el.style.display = "none");
        error.textContent="Please Enter City Name";
        error.style.display="block";
        return;
    }
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`);
        if (!response.ok) {
            throw new Error('Invalid City Name');
        }
        error.style.display="none";
        const data = await response.json();
        display.forEach(el => el.style.display = "flex");
        const name=document.getElementById("name");
        const Temperature=document.getElementById("Temperature");
        const Humidity=document.getElementById("Humidity");
        const icon=document.getElementById("icon");
        name.textContent=data.name;
        Temperature.textContent=data.main.temp+"°C";
        Humidity.textContent=data.main.humidity+"%";
        let iconCode=data.weather[0].icon;
        icon.src=`http://openweathermap.org/img/wn/${iconCode}.png`;
        console.log(data);
    } catch (error1) {
        display.forEach(el => el.style.display = "none");
        error.style.display="block";
        error.textContent=error1;
    }
}
