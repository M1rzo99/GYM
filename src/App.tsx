import { Route, Routes } from 'react-router-dom'
import Navbar from './components/shared/navbar'
import Home from './pages/Home'
import Auth from './pages/auth'

export default function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/auth' element={<Auth />} />
			</Routes>
		</>
	)
}
