import { auth } from '@/firebase'
import { loginSchema } from '@/lib/validation'
import { useAuthState } from '@/store/auth.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Button } from '../ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'

const Login = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const { setAuth } = useAuthState()
	const navigate = useNavigate()

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		const { email, password } = values
		setIsLoading(true)
		try {
			const res = await signInWithEmailAndPassword(auth, email, password)
			navigate('/')
		} catch (error) {
			const result = error as Error
			setError(result.message)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col'>
				<h2 className='text-xl font-bold'>Login</h2>
				<p className='text-muted-foreground'>
					Don't have any account?{' '}
					<span
						className='text-blue-500 cursor-pointer hover:underline'
						onClick={() => setAuth('register')}
					>
						Sign up
					</span>
				</p>
				<Separator className='my-3' />

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder='example@gmail.com'
									type='email'
									disabled={isLoading}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem className='mt-4'>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									placeholder='********'
									type='password'
									{...field}
									disabled={isLoading}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit' className='w-full h-12 mt-4' disabled={isLoading}>
					Login
				</Button>
			</form>
		</Form>
	)
}

export default Login
