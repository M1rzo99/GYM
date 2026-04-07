import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './components/providers/theme-provider.tsx'
import './style/index.css'

createRoot(document.getElementById('root')!).render(
	<ThemeProvider defaultTheme='dark'>
		<App />
	</ThemeProvider>
)
