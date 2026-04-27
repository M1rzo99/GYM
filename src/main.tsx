import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import AuthProvider from './components/providers/auth-provider.tsx'
import { ThemeProvider } from './components/providers/theme-provider.tsx'
import './style/index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<ThemeProvider defaultTheme='dark'>
			<AuthProvider>
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</AuthProvider>
		</ThemeProvider>
	</BrowserRouter>
)
