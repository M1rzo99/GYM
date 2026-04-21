import { FaGithub, FaGoogle } from 'react-icons/fa'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

const Social = () => {
	return (
		<>
			<Separator />
			<div className='grid grid-cols-1 gap-2 xl:grid-cols-2'>
				<Button
					className='flex items-center justify-center gap-2 h-14'
					variant={'secondary'}
				>
					<FaGithub />
					<span className='hidden xl:inline'>Sign in with GitHub</span>
				</Button>

				<Button className='flex items-center justify-center gap-2 bg-red-800 h-14'>
					<FaGoogle />
					<span className='hidden xl:inline'>Sign in with Google</span>
				</Button>
			</div>
		</>
	)
}

export default Social
