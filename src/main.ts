import "./assets/style/app.scss";
import { db} from "./assets/firebase/firebase";
const appEl = document.querySelector<HTMLDivElement>("#app")!;
appEl.innerHTML= `
	<header>
		<h1> Welcome to Wajkie Development!<h1>
	</header>
	<section>
		<h2></h2>
	</section>
	<footer>
		&copy Wajkie - Fredrik Wiking
		<hr>
		<a href="https://github.com/Wajkie" target="blank">Wajkie on github</a>
	</footer>

`
