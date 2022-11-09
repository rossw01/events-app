import { ApiClient } from "./apiClient";
import "./App.css";
import EventsList from "./components/EventsList/EventsList";
import Header from "./components/Header";

function App() {
	// const [token, changeToken] = useState(window.localStorage.getItem("token"));
	const client = new ApiClient();
	return (
		<div className="App">
			<Header />
			<EventsList client={client} />
		</div>
	);
}

export default App;
