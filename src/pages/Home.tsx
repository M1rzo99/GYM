import gymGr from '@/assets/gymGr.jpg'
import { Button } from '@/components/ui/button'

import { Card } from '@/components/ui/card'
import { featuredItems, programs } from '@/constants'
import { auth } from '@/firebase'
import { useUserState } from '@/store/user.store'
import { LogOut } from 'lucide-react'
import { TbGymnastics } from 'react-icons/tb'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
	const { user, setUser } = useUserState()
	const navigate = useNavigate()
	const onLogout = () => {
		auth.signOut().then(() => {
			setUser(null)
			navigate('/auth')
		})
	}

	return (
		<>
			<div className='flex items-center w-full h-screen'>
				<div className='flex flex-col justify-center h-full max-w-xl ml-60'>
					<h1 className='font-semibold uppercase text-8xl'>Workout timer</h1>
					<p className='text-muted-foreground'>
						Join us for an amazing workout experience that will help you achieve
						your fitness goals. ipsum dolor sit amet consectetur adipisicing
						elit. Voluptas ipsum dolor sit amet consectetur adipisicing elit.
						Suscipit repellendus facilis aperiam possimus quam sed fuga.
					</p>

					{user ? (
						<div className='flex gap-4'>
							<Link to={'/dashboard'}>
								<Button className='h-12 mt-6 font-bold w-fit'>
									<span>Go to GYM</span>
									<TbGymnastics className='w-4 h-4 ml-2' />
								</Button>
							</Link>
							<Button
								className='h-12 mt-6 font-bold w-fit '
								variant={'destructive'}
								size={'lg'}
								onClick={onLogout}
							>
								<span>Logout</span>
								<LogOut className='w-4 h-4 ml-2' />
							</Button>
						</div>
					) : (
						<Link to={'/auth'}>
							<Button
								className='h-12 mt-6 font-bold bg-background w-fit'
								variant={'outline'}
							>
								Join club now
							</Button>
						</Link>
					)}

					<div className='mt-24'>
						<p className='text-muted-foreground'>AS FEATURED IN</p>
						<div className='flex items-center gap-4 mt-2'>
							{featuredItems.map((Icon, idx) => (
								<Icon key={idx} className='w-12 h-12' />
							))}
						</div>
					</div>
				</div>
				<img src={gymGr} alt='Gym workout' className='object-cover w-1/2' />
			</div>

			<div className='container '>
				<h1 className='text-3xl'>Not sure where to start?</h1>
				<p className='mt-2 text-muted-foreground'>
					Programs are designed to help you achieve your fitness goals, whether
					you're looking to lose weight.
				</p>
				<div className='grid grid-cols-3 gap-4 my-8'>
					{programs.map(item => (
						<Card
							key={item.title}
							className='relative p-8 cursor-pointer bg-background group'
						>
							<h2>{item.title}</h2>
							<p className='mt-2 text-sm text-muted-foreground'>
								{item.description}
							</p>
							<Button
								size={'icon'}
								variant={'ghost'}
								className='absolute transition-transform right-20 top-4 group-hover:animate-spin'
							>
								<item.icon />
							</Button>
						</Card>
					))}
				</div>
			</div>
		</>
	)
}

export default Home
