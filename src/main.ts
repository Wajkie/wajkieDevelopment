import "./assets/style/app.scss";
import {requestweather} from "./assets/modules/weatherapp";
import {GetQuizCollection, quizQuestion} from "./assets/modules/opentdbQuiz"
import { doc } from "firebase/firestore";
const appEl = document.querySelector<HTMLDivElement>("#app")!;
appEl.innerHTML= `
	<header>
		<h1> Welcome to Wajkie Development!<h1>
	</header>
	<section>
		<h2></h2>
		<nav><button id="weatherapp">Weatherapp</button><button id="quizApp">Opentdb quiz</button></nav>
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
const btnquizApp = document.querySelector<HTMLButtonElement>("#quizApp");
if (btnquizApp) {
	btnquizApp.addEventListener("click", ()=> {
		const newEl =document.createElement("div");
		document.querySelector<HTMLElement>("#appwindow")!.appendChild(newEl);
		renderQuizApp(newEl, btnquizApp);
		btnquizApp.setAttribute("disabled", "true");
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
				return;
			}
			requestweather(city);
			formEl.reset();
		})
	}
}


const renderQuizApp = async (newEl:HTMLDivElement, closeEl:HTMLButtonElement)=> {
	const quizCollection= await GetQuizCollection() as quizQuestion[];
	console.log(quizCollection)
	const options = [...quizCollection.map((question: quizQuestion)=> {return ({category:question.category, question: question.question, correct: question.correct_answer,  options:[...question.incorrect_answers, question.correct_answer]})})]
	console.log("My options are", options)
	newEl.innerHTML = options.map((option)=> {
		return `<h4>${option.category}</h4>
				<ul class="mt-5 quizList" data-correct="${option.correct}">
					<li class="bg-primary ">${option.question}</li>
					${option.options.map((item)=> {return `<li data-option="${item}">${item}</li>`}).join("")}
				</ul>`
	}).join("") + '<button class="close" title="Close">X</button>'
	const btnCloseApp = document.querySelector<HTMLButtonElement>(".close");
	if (btnCloseApp) {
		btnCloseApp.addEventListener("click", (e)=> {
		const target = e.target as HTMLElement;
		target.parentElement?.remove();
		closeEl.removeAttribute("disabled");
		});
	};
	if (newEl) {
		newEl.addEventListener("click", (e)=> {
			const target = e.target as HTMLElement;
			if (target.tagName ==="LI" && target.parentElement) {
			console.log("Target dataset", target.dataset, "Target parent element dataset", target.parentElement.dataset)
			// target.dataset.option === target.parentElement?.dataset.correct ? target.classList.add("bg-success") : target.classList.add("bg-danger");
			}
		})
	}
}

