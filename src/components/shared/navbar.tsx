import { navLinks } from '@/constants'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { ModeToggle } from './mode-toggle'

const Navbar = () => {
	return (
		<div className='w-full h-[10vh] shadow-sm fixed inset-0 z-50 bg-background'>
			<div className='container flex items-center justify-between h-full max-w-6xl mx-auto'>
				<Link to={'/'}>
					<h1 className='text-2xl font-bold uppercase'>workout</h1>
				</Link>
				<div className='flex items-center gap-3'>
					{navLinks.map(link => (
						<Link
							key={link.path}
							to={link.path} // ← href → to
							className='font-bold hover:underline'
						>
							{link.Label}
						</Link>
					))}
					<ModeToggle />
					<Link to={'/auth'}>
						<Button
							className='h-10 mt-1 font-bold bg-background w-fit'
							variant={'outline'}
						>
							Join Free
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Navbar
