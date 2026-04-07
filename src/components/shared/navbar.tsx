import { navLinks } from '@/constants'
import { Button } from '../ui/button'
import { ModeToggle } from './mode-toggle'

const Navbar = () => {
	return (
		<div className='w-full h-[10vh] shadow-sm  fixed inset-0 z-50 bg-background'>
			<div className='container flex items-center justify-between h-full max-w-6xl mx-auto'>
				<a href='#home' className='text-2xl font-bold uppercase'>
					workout
				</a>
				<div className='flex items-center gap-3'>
					{navLinks.map(link => (
						<a
							key={link.path}
							href={link.path}
							className='font-bold hover:underline'
						>
							{link.Label}
						</a>
					))}
					<ModeToggle />
					<Button
						className='h-10 mt-1 font-bold bg-background w-fit'
						variant={'outline'}
					>
						Join Free
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Navbar
