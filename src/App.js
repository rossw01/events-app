import "./App.css";
import EventsList from "./components/EventsList/EventsList";
import Header from "./components/Header";

function App() {
	return (
		<div className="App">
			<Header />
			<EventsList />
		</div>
	);
}

export default App;
