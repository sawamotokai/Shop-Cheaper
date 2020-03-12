import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { NewStore } from './components/NewStore';

function App() {
	return (
		<div className="App">
			<Header />
			<NewStore />
		</div>
	);
}

export default App;
