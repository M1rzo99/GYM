import { Route, Routes } from 'react-router-dom'
import Navbar from './components/shared/navbar'
import Auth from './pages/auth'
import Home from './pages/Home'
import Programs from './pages/Programs'

export default function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/auth' element={<Auth />} />
				<Route path='/programs' element={<Programs />} />
			</Routes>
		</>
	)
}
