import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { auth } from '@/firebase'
import { registerSchema } from '@/lib/validation'
import { useAuthState } from '@/store/auth.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { AlertCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import FillLoading from '../shared/fill-loading'
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

const Register = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const { setAuth } = useAuthState()
	const navigate = useNavigate()

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof registerSchema>) => {
		const { email, password } = values
		setIsLoading(true)
		try {
			const res = await createUserWithEmailAndPassword(auth, email, password)
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
				{isLoading && <FillLoading />}
				<h2 className='text-xl font-bold'>Register</h2>
				<p className='text-muted-foreground'>
					Already have an account?{' '}
					<span
						className='text-blue-500 cursor-pointer hover:underline'
						onClick={() => setAuth('login')}
					>
						Sign in
					</span>
				</p>
				<Separator className='my-3' />

				{error && (
					<Alert variant='destructive' className='max-w-md'>
						<div className='flex items-center gap-2'>
							<AlertCircleIcon className='w-4 h-4' />
							<AlertTitle className='mb-0'>Error</AlertTitle>
						</div>
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							{' '}
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

				<div className='grid grid-cols-1 gap-4 mt-4 xl:grid-cols-2'>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
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

					<FormField
						control={form.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
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
				</div>

				<Button type='submit' className='w-full h-12 mt-4'>
					Register
				</Button>
			</form>
		</Form>
	)
}

export default Register
