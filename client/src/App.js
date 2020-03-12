import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { NewStore } from './components/NewStore';
import { NewItem } from './components/NewItem';

function App() {
	return (
		<div className="App">
			<Header />
			<NewStore />
			<NewItem />
		</div>
	);
}

export default App;
