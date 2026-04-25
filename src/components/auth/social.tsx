import { auth } from '@/firebase'
import {
	GithubAuthProvider,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth'
import { useState } from 'react'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import FillLoading from '../shared/fill-loading'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

const Social = () => {
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	const onGoogle = () => {
		setIsLoading(true)
		const googleProvider = new GoogleAuthProvider()
		signInWithPopup(auth, googleProvider)
			.then(() => {
				navigate('/')
			})

			.finally(() => {
				setIsLoading(false)
			})
	}

	const onGithub = () => {
		setIsLoading(true)
		const gitHubProvider = new GithubAuthProvider()
		signInWithPopup(auth, gitHubProvider)
			.then(() => {
				navigate('/')
			})

			.finally(() => {
				setIsLoading(false)
			})
	}
	return (
		<>
			{isLoading && <FillLoading />}
			<Separator />
			<div className='grid grid-cols-1 gap-2 xl:grid-cols-2'>
				<Button
					className='flex items-center justify-center gap-2 h-14'
					variant={'secondary'}
					disabled={isLoading}
					onClick={onGithub}
				>
					<FaGithub />
					<span className='hidden xl:inline'>Sign in with GitHub</span>
				</Button>

				<Button
					className='flex items-center justify-center gap-2 bg-red-800 h-14'
					onClick={onGoogle}
					disabled={isLoading}
				>
					<FaGoogle />
					<span className='hidden xl:inline'>Sign in with Google</span>
				</Button>
			</div>
		</>
	)
}

export default Social
