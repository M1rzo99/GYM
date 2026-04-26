import TaskItem from '@/components/shared/task-item'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { BadgePlus } from 'lucide-react'

const Dashboard = () => {
	return (
		<div className='flex items-center h-screen max-w-6xl mx-auto'>
			<div className='grid w-full grid-cols-1 gap-8'>
				<div className='flex flex-col space-y-3'>
					<div className='flex justify-between w-full p-4 rounded-md bg-gradient-to-t from-background to-secondary'>
						<div className='text-2xl font-bold'> Trainings</div>
						<Button size={'icon'}>
							<BadgePlus />
						</Button>
					</div>
					<Separator />
					<div className='relative flex justify-between w-full p-4 rounded-md bg-gradient-to-b from-background to-secondary min-h-60'>
						<div className='flex flex-col w-full space-y-3'>
							{Array.from({ length: 5 }, (_, i) => (
								<TaskItem key={i} />
							))}
						</div>
					</div>
				</div>
			</div>
			<div className='relative flex flex-col w-full space-y-3'>
				<div className='relative h-24 p-4 rounded-md bg-gradient-to-r from-blue-900 to-background'></div>
				<div className='relative h-24 p-4 rounded-md bg-gradient-to-r from-purple-900 to-background'></div>
				<div className='relative h-24 p-4 rounded-md bg-gradient-to-r from-red-900 to-background'></div>
			</div>
		</div>
	)
}

export default Dashboard
