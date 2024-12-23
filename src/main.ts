import "./assets/style/app.scss";
import {requestweather} from "./assets/modules/weatherapp";
import { WeatherApp } from "./assets/types/types";

const appEl = document.querySelector<HTMLDivElement>("#app")!;
appEl.innerHTML= `
	<header>
		<h1> Welcome to Wajkie Development!<h1>
	</header>
	<section>
		<h2></h2>
		<nav><button id="weatherapp">Weatherapp</button></nav>
	</section>
	<main id="appwindow">
	</main>
	<footer>
		&copy Wajkie - Fredrik Wiking
		<hr>
		<a href="https://github.com/Wajkie" target="blank">Wajkie on github</a>
	</footer>

`
// checkstuff("Wajkie");


const btnWeatherApp = document.querySelector<HTMLButtonElement>("#weatherapp");
if (btnWeatherApp) {
	btnWeatherApp.addEventListener("click", ()=> {
		const newEl =document.createElement("div");
		document.querySelector<HTMLElement>("#appwindow")!.appendChild(newEl);
		renderweatherApp(newEl, btnWeatherApp);
		btnWeatherApp.setAttribute("disabled", "true");
	});
};

const renderweatherApp = (newEl:HTMLDivElement, closeEl:HTMLButtonElement)=> {
	newEl.innerHTML = `
	<h5>My weatherapp - One of the workshops I've done in school!</h5>
	<div id="search-wrapper">
		<form id="search-form">
			<div class="input-group">
				<input type="text" id="query" name="city" class="form-control" placeholder="Enter city to search for" aria-label="City" aria-details="Search for city to show current weather for.">
				<button type="submit" class="btn btn-success">🔍</button>
			</div>
		</form>
	</div>
	<div id="result"></div>
	<button class="close" title="Close">X</button>
	`
	const btnCloseApp = document.querySelector<HTMLButtonElement>(".close");
		if (btnCloseApp) {
			btnCloseApp.addEventListener("click", (e)=> {
			const target = e.target as HTMLElement;
			target.parentElement?.remove();
			closeEl.removeAttribute("disabled");
			});
		};
	const formEl = document.querySelector<HTMLFormElement>("#search-form");
	if (formEl) {
		formEl.addEventListener("submit", (e) => {
			e.preventDefault();
			const city:string = formEl.city.value;
			if ((city.trim()).length !<= 3) {
				return
			}
			requestweather(city);
			formEl.reset;
		})
	}
}