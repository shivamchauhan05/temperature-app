const button=document.getElementById("search-btn");
const input=document.getElementById("input-city");
const city=document.getElementById("city-name");
const time=document.getElementById("tim");
const temp=document.getElementById("tem");


async function getData(cityName){
     const promise= await   fetch
     (`https://api.weatherapi.com/v1/current.json?key=93aa1d6897d349978dc172815243108&q=${cityName}&aqi=yes`);
      return await promise.json()
}
button.addEventListener("click",async ()=>{
        const value=input.value;
        const result=await getData(value);
        city.innerText=`${result.location.name},${result.location.region},${result.location.country}`
        time.innerText=`${result.location.localtime}`
        temp.innerText=`${result.current.temp_c}`
});

//http://api.weatherapi.com/v1/current.json?key=93aa1d6897d349978dc172815243108&q=London&aqi=yes
