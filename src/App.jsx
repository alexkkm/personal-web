// Basic tools
import { BrowserRouter, Routes, Route, } from "react-router-dom";

// Global Styling: store the font or other global styles only
import "./App.css";

// Pages
import Desktop from "./components/Desktop";
import DarkThemePage from "./components/darktheme";
import TestingPage from "./pages/TestingPage";
import NetworkPage from "./pages/Network";
import LocalStorageTutorial from "./tutorial/LocalStorage";
import FirebasePage from "./pages/FirebasePage";
import TutorialPage from "./pages/TutorialPage";
import Calendar from "./pages/Calendar";

// The main componenet of the app
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<Desktop />}>
					Home Page
				</Route>
				<Route
					path="/darktheme"
					element={<DarkThemePage />}
				/>
				<Route
					path="/testing"
					element={<TestingPage />}
				/>
				<Route
					path="/firebase"
					element={<FirebasePage />} />
				<Route
					path="/network"
					element={<NetworkPage />} />
				<Route
					path="/tutorial"
					element={<TutorialPage />} />
				<Route
					path="/localStorage"
					element={<LocalStorageTutorial />} />
				<Route
					path="/calendar"
					element={<Calendar />} />

			</Routes>
		</BrowserRouter>
	);
}
export default App;
