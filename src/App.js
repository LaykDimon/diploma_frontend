import {Routes, Route, BrowserRouter as Router} from "react-router-dom";
import React from 'react';
import Register from "./components/Register";
import './style.css';
import Header from './components/Header';
import AnalyzeField from './components/Analyzer';
import Login from "./components/Login";
import Terms from "./components/Terms";
import { Profile } from "./components/Profile";

export default function App() {

	
	return (
		<div className="App">

			<Router>
				<Header />
				<Routes>
					<Route exact path="/" element={App} />
					<Route path="/about" element={<Terms />} />
					<Route path="/signup" element={<Register />} />
					<Route path="/analyzer" element={<AnalyzeField />} />
					<Route path="/login" element={<Login />} />
					{/*<Route path="/logout" element={<Logout />} />*/}
					<Route path="/profile" element={<Profile />} />
				</Routes>

			</Router>	
		</div>
	);
}
