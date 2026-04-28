import { db } from '@/firebase'
import { cn } from '@/lib/utils'
import { ITask, ITaskData } from '@/types'
import { QueryObserverResult } from '@tanstack/react-query'
import { doc, updateDoc } from 'firebase/firestore'
import { Edit2, Trash } from 'lucide-react'
import { useState } from 'react'
import { CiPause1, CiPlay1 } from 'react-icons/ci'
import { HiStatusOnline } from 'react-icons/hi'
import { MdOutlineTaskAlt } from 'react-icons/md'
import { RxReload } from 'react-icons/rx'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import FillLoading from './fill-loading'

interface Props {
	task: ITask
	onStartEditing: () => void
	onDelete: () => void
	refetch: () => Promise<QueryObserverResult<ITaskData, Error>>
}

const TaskItem = ({ task, onStartEditing, onDelete, refetch }: Props) => {
	const [isLoading, setIsLoading] = useState(false)
	const onStart = async () => {
		setIsLoading(true)
		const ref = doc(db, 'tasks', task.id)
		try {
			await updateDoc(ref, {
				status: 'in_progress',
				startTime: Date.now(),
			})
			refetch()
		} catch {
			toast.error('An error occured')
		} finally {
			setIsLoading(false)
		}
	}

	const onPause = async () => {
		setIsLoading(true)
		const ref = doc(db, 'tasks', task.id)
		try {
			const elapsed = task.startTime ? Date.now() - task.startTime : 0
			const newTotalTime = (task.totalTime || 0) + elapsed
			await updateDoc(ref, {
				status: 'paused',
				endTime: Date.now(),
				totalTime: newTotalTime,
			})
			refetch()
		} catch {
			toast.error('An error occured')
		} finally {
			setIsLoading(false)
		}
	}

	const renderBtns = () => {
		switch (task.status) {
			case 'unstarted':
				return (
					<Button
						variant={'default'}
						size={'icon'}
						className='w-8 h-8'
						onClick={onStart}
					>
						<CiPlay1 className='w-8 h-8' />
					</Button>
				)
			case 'in_progress':
				return (
					<Button
						variant={'default'}
						size={'icon'}
						className='w-8 h-8'
						onClick={onPause}
					>
						<CiPause1 className='w-8 h-8' />
					</Button>
				)
			case 'paused':
				return (
					<Button
						variant={'default'}
						size={'icon'}
						className='w-8 h-8'
						onClick={onStart}
					>
						<RxReload className='w-8 h-8' />
					</Button>
				)
		}
	}

	return (
		<Card className='relative grid items-center w-full grid-cols-4 p-4 shadow-md'>
			{isLoading && <FillLoading />}
			<div className='flex items-center col-span-2 gap-1'>
				<MdOutlineTaskAlt className='w-8 h-8 text-blue-500' />
				<span className='capitalize'>{task.title}</span>
			</div>
			<div className='flex items-center gap-1'>
				<HiStatusOnline
					className={cn(
						task.status === 'unstarted' && 'text-blue-500',
						task.status === 'in_progress' && 'text-green-500',
						task.status === 'paused' && 'text-red-500'
					)}
				/>
				<span className='capitalize'>{task.status}</span>
			</div>
			<div className='flex items-center gap-2 '>
				{renderBtns()}
				<Button
					variant={'secondary'}
					onClick={onStartEditing}
					size={'icon'}
					className='w-8 h-8 '
				>
					<Edit2 className='w-8 h-8' />
				</Button>
				<Button
					variant={'destructive'}
					onClick={onDelete}
					size={'icon'}
					className='w-8 h-8'
				>
					<Trash className='w-8 h-8' />
				</Button>
			</div>
		</Card>
	)
}

export default TaskItem
