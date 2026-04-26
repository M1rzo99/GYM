import { Edit2, Trash } from 'lucide-react'
import { CiPlay1 } from 'react-icons/ci'
import { HiStatusOnline } from 'react-icons/hi'
import { MdOutlineTaskAlt } from 'react-icons/md'
import { Button } from '../ui/button'
import { Card } from '../ui/card'

const TaskItem = () => {
	return (
		<Card className='relative grid items-center w-full grid-cols-4 p-4 shadow-md'>
			<div className='flex items-center col-span-2 gap-1'>
				<MdOutlineTaskAlt className='w-8 h-8 text-blue-500' />
				<span className='capitalize'>Tasksfsdfsfsfsfdsfs Name</span>
			</div>
			<div className='flex items-center gap-1'>
				<HiStatusOnline className='text-blue-500' />
				<span className='capitalize'>In Progress</span>
			</div>
			<div className='flex items-center gap-1 justify-self-end'>
				<Button variant={'ghost'} size={'icon'} className='w-8 h-8'>
					<CiPlay1 className='w-5 h-5 text-indigo-500' />
				</Button>
				<Button variant={'secondary'} size={'icon'} className='w-8 h-8 '>
					<Edit2 className='w-5 h-5' />
				</Button>
				<Button variant={'destructive'} size={'icon'} className='w-8 h-8'>
					<Trash className='w-5 h-5' />
				</Button>
			</div>
		</Card>
	)
}

export default TaskItem
