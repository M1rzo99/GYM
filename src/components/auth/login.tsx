import { useAuthState } from '@/store/auth.store'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/lib/validation'
import { z } from 'zod'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'

const Login = () => {
	const { setAuth } = useAuthState()

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: '', password: '' },
	})

	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		console.log(values)
		// API chaqiruv shu yerda
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
								<Input placeholder='********' type='password' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit' className='w-full h-12 mt-4'>
					Login
				</Button>
			</form>
		</Form>
	)
}

export default Login
