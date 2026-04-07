import { FaGithub, FaGoogle } from 'react-icons/fa'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

const Social = () => {
	return (
		<>
			<Separator />
			<div className='grid grid-cols-2 gap-2'>
				<Button className='h-14' variant={'secondary'}>
					<FaGithub />
					<span>Sign in with GitHub</span>
				</Button>

				<Button className='bg-red-800 h-14'>
					<FaGoogle />
					<span>Sign in with Google</span>
				</Button>
			</div>
		</>
	)
}

export default Social
