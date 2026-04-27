import { taskSchema } from '@/lib/validation'
import { useUserState } from '@/store/user.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import FillLoading from '../shared/fill-loading'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

interface Props {
	title?: string
	isEdit?: boolean
	onClose?: () => void
	handler: (values: z.infer<typeof taskSchema>) => Promise<void | null>
}

const TaskForm = ({ title = '', handler, onClose, isEdit }: Props) => {
	const [isLoading, setIsLoading] = useState(false)
	const { user } = useUserState()

	const form = useForm<z.infer<typeof taskSchema>>({
		resolver: zodResolver(taskSchema),
		defaultValues: { title },
	})

	const onSubmit = async (values: z.infer<typeof taskSchema>) => {
		if (!user) return null
		setIsLoading(true)
		const promise = handler(values).finally(() => {
			setIsLoading(false)
		})
		toast.promise(promise, {
			loading: 'Adding task...',
			success: 'Task added successfully',
			error: 'Failed to add task',
		})
	}
	return (
		<>
			{isLoading && <FillLoading />}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col'>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder='Enter a task'
										type='text'
										disabled={isLoading}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='flex justify-end gap-1'>
						{isEdit && (
							<Button
								disabled={isLoading}
								className='w-20 h-10 mt-2'
								type='button'
								variant={'destructive'}
								onClick={onClose}
							>
								Cancel
							</Button>
						)}
						<Button
							disabled={isLoading}
							className='w-20 h-10 mt-2 '
							type='submit'
						>
							Submit
						</Button>
					</div>
				</form>
			</Form>
		</>
	)
}

export default TaskForm
