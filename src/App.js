import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'

import AuthProvider from './contexts/AuthContext'

import Routes from './routes/Routes'

// Base Components
import { Template, Body } from './components/MainStyles'
import SideBar from './components/SideBar'
import Footer from './components/Footer'

const App = () => {

	return (
		<BrowserRouter>
			<AuthProvider>

				<Template>

					<SideBar />

					<Body>

						<Routes />

					</Body>

					<Footer />

				</Template>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App
