import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'

import AuthProvider from './contexts/AuthContext'

import { Template } from './components/MainStyles'
import Routes from './routes/Routes'

const App = () => {
	return (
		<BrowserRouter>
			<Template>
				<AuthProvider>
					<Routes />
				</AuthProvider>
			</Template>
		</BrowserRouter>
	);
}

export default App
