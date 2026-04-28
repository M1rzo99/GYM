import TaskForm from '@/components/forms/task-form'
import FillLoading from '@/components/shared/fill-loading'
import TaskItem from '@/components/shared/task-item'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { db } from '@/firebase'
import { taskSchema } from '@/lib/validation'
import { TaskService } from '@/service/task.service'
import { useUserState } from '@/store/user.store'
import { ITask } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { addMilliseconds, addMinutes, format } from 'date-fns'
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	updateDoc,
} from 'firebase/firestore'
import { AlertCircleIcon, BadgePlus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import z from 'zod'

const Dashboard = () => {
	const [IsDelete, setIsDelete] = useState(false)
	const { user } = useUserState()
	const [open, setOpen] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [currentTask, setCurrentTask] = useState<ITask | null>(null)

	const { isPending, error, data, refetch } = useQuery({
		queryKey: ['tasks-data'],
		queryFn: TaskService.getTasks,
	})

	const onAdd = async ({ title }: z.infer<typeof taskSchema>) => {
		if (!user) return null

		return addDoc(collection(db, 'tasks'), {
			title,
			status: 'unstarted',
			startTime: null,
			endTime: null,
			userId: user.uid,
		})
			.then(() => {
				refetch()
			})
			.finally(() => {
				setOpen(false)
			})
	}

	const onUpdate = async ({ title }: z.infer<typeof taskSchema>) => {
		if (!user) return null
		if (!currentTask) return null

		const ref = doc(db, 'tasks', currentTask.id)
		return updateDoc(ref, { title })
			.then(() => refetch())
			.finally(() => setIsEditing(false))
	}
	const onDelete = async (id: string) => {
		setIsDelete(true)
		const promise = deleteDoc(doc(db, 'tasks', id))
			.then(() => refetch())
			.finally(() => setIsDelete(false))

		toast.promise(promise, {
			loading: 'Deleting task...',
			success: 'Successfully deleted!',
			error: 'Somthing went wrong!',
		})
	}

	const onStartEditing = (task: ITask) => {
		setIsEditing(true)
		setCurrentTask(task)
	}
	const formatDate = (time: number) => {
		const date = addMilliseconds(new Date(0), time)
		const formattedDate = format(
			addMinutes(date, date.getTimezoneOffset()),
			'HH:mm:ss'
		)
		return formattedDate
	}
	return (
		<>
			<div className='flex flex-col items-start max-w-6xl max-md:px-6 max-md:pt-[8vh] min-h-screen gap-5 p-4 mx-auto lg:flex-row lg:items-center'>
				<div className='grid w-full grid-cols-1 gap-8'>
					<div className='flex flex-col space-y-3'>
						<div className='flex justify-between w-full p-4 rounded-md bg-gradient-to-t from-background to-secondary'>
							<div className='text-2xl font-bold'> Trainings</div>
							<Button size={'icon'} onClick={() => setOpen(true)}>
								<BadgePlus />
							</Button>
						</div>
						<Separator />
						<div className='relative flex justify-between w-full p-4 rounded-md bg-gradient-to-b from-background to-secondary min-h-60'>
							{(isPending || IsDelete) && <FillLoading />}
							{error && (
								<Alert variant='destructive' className='max-w-md'>
									<div className='flex items-center gap-2'>
										<AlertCircleIcon className='w-4 h-4' />
										<AlertTitle className='mb-0'>Error</AlertTitle>
									</div>
									<AlertDescription className='text-color-500'>
										{error.message}
									</AlertDescription>
								</Alert>
							)}

							{data && (
								<div className='flex flex-col w-full space-y-3'>
									{!isEditing &&
										data.tasks.map(task => (
											<TaskItem
												refetch={refetch}
												task={task}
												key={task.id}
												onStartEditing={() => onStartEditing(task)}
												onDelete={() => onDelete(task.id)}
											/>
										))}
									{isEditing && (
										<TaskForm
											title={currentTask?.title}
											isEdit
											onClose={() => setIsEditing(false)}
											handler={
												onUpdate as (
													values: z.infer<typeof taskSchema>
												) => Promise<void | null>
											}
										/>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
				<div className='flex flex-col w-full space-y-3 '>
					<div className='relative h-24 p-4 rounded-md bg-gradient-to-r from-blue-900 to-background'>
						<div className='text-2xl font-bold'>Total week</div>
						{isPending ? (
							<FillLoading />
						) : (
							data && (
								<>
									<div className='text-3xl font-bold'>
										{formatDate(data.weekTotal)}
									</div>
								</>
							)
						)}
					</div>
					<div className='relative h-24 p-4 rounded-md bg-gradient-to-r from-purple-900 to-background'>
						<div className='text-2xl font-bold'>Total month</div>
						{isPending ? (
							<FillLoading />
						) : (
							data && (
								<>
									<div className='text-3xl font-bold'>
										{formatDate(data.monthTotal)}
									</div>
								</>
							)
						)}
					</div>
					<div className='relative h-24 p-4 rounded-md bg-gradient-to-r from-red-900 to-background'>
						<div className='text-2xl font-bold'>Total Time</div>
						{isPending ? (
							<FillLoading />
						) : (
							data && (
								<>
									<div className='text-3xl font-bold'>
										{formatDate(data.total)}
									</div>
								</>
							)
						)}
					</div>
				</div>
			</div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger></DialogTrigger>

				<DialogContent className='sm:max-w-md'>
					<DialogHeader>
						<DialogTitle className='text-xl'>Create a new task</DialogTitle>
					</DialogHeader>
					<Separator className='bg-white/40 h-[1px]' />
					<TaskForm handler={onAdd} />
				</DialogContent>
			</Dialog>
		</>
	)
}

export default Dashboard
