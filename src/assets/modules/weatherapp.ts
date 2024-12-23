import {api} from "./secrets"
import {WeatherApp} from "../types/types";
const getWeather = async (city:string) => {
    const res = await fetch(`${api.url}${city}&appid=${api.key}&units=metric`)
    if (!res.ok) {
        throw new Error(`Fetch went bad: Response was ${res.status} ${res.statusText} when trying to get the weather in ${city}`);
    }
    const data:WeatherApp = await res.json();
    return data;
}
export const requestweather = async(city:string) => {
	const resultEl = document.querySelector<HTMLDivElement>("#result")!;
	try {
		const data:WeatherApp = await getWeather(city);
		if (!data) {
			throw new Error("Whhopsie, something went very wrong for now")
		}
		console.log(data);
		const weatherConditions = data.weather.map((condition) => {
			return `<li><img src="http://openweathermap.org/img/wn/${condition.icon}@2x.png" alt="${condition.main}" title="${condition.description}"></li>`;
		});
		const freshness = new Date(data.dt * 1000);
		resultEl.innerHTML = `
		<div class="card-body">
			<h5 class="card-title" id="location">
				<span id="city">${data.name}</span>,
				<span id="country">${data.sys.country}</span>
			</h5>
			<p class="temp">
				<span id="temperature">${data.main.temp}</span>
				&deg;C
			</p>
			<p class="humidity">
				<span id="humidity">${data.main.humidity}</span>
				&percnt; humidity
			</p>
			<p class="wind">
				<span id="windspeed">${data.wind.speed}</span>
				m/s
			</p>

			<ul class="conditions">
				${weatherConditions.join("")}
			</ul>

			<p id="freshness" class="small">Updated: ${freshness.toLocaleString("sv-SE")}</p>
		</div>
	`;

	}catch (err) {
		resultEl.innerText = err as string;
		
	}

}
