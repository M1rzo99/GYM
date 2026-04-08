import { registerSchema } from '@/lib/validation'
import { useAuthState } from '@/store/auth.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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

type RegisterFormValues = z.infer<typeof registerSchema>

const Register = () => {
	const { setAuth } = useAuthState()

	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: { email: '', password: '', confirmPassword: '' },
	})

	const onSubmit = async (values: RegisterFormValues) => {
		console.log(values)
		// API chaqiruv shu yerda
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col'>
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

				<div className='grid grid-cols-2 gap-4 mt-4'>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input placeholder='********' type='password' {...field} />
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
									<Input placeholder='********' type='password' {...field} />
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
