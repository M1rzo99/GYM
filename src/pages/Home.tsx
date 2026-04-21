import gymGr from '@/assets/gymGr.jpg'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { featuredItems, programs } from '@/constants'
import { Link } from 'react-router-dom'

const Home = () => (
	<>
		{/* HERO SECTION */}
		<div className='flex flex-col items-center w-full min-h-screen md:flex-row'>
			{/* TEXT */}
			<div className='flex flex-col justify-center w-full px-6 py-10 md:py-0 md:max-w-xl md:ml-20'>
				<h1 className='text-4xl font-semibold uppercase md:text-6xl lg:text-7xl'>
					Workout timer
				</h1>

				<p className='mt-4 text-sm md:text-base text-muted-foreground'>
					Join us for an amazing workout experience that will help you achieve
					your fitness goals. ipsum dolor sit amet consectetur adipisicing elit.
					Voluptas ipsum dolor sit amet consectetur adipisicing elit.
				</p>

				<Link to={'/auth'}>
					<Button
						className='w-full h-12 mt-6 font-bold md:w-fit'
						variant={'outline'}
					>
						Join club now
					</Button>
				</Link>

				{/* FEATURED */}
				<div className='mt-12 md:mt-20'>
					<p className='text-xs md:text-sm text-muted-foreground'>
						AS FEATURED IN
					</p>
					<div className='flex items-center gap-3 mt-3 md:gap-4'>
						{featuredItems.map((Icon, idx) => (
							<Icon key={idx} className='w-8 h-8 md:w-10 md:h-10' />
						))}
					</div>
				</div>
			</div>

			{/* IMAGE */}
			<div className='w-full md:w-1/2 h-[250px] md:h-screen'>
				<img src={gymGr} className='object-cover w-full h-full' alt='Gym' />
			</div>
		</div>

		{/* PROGRAMS SECTION */}
		<div className='px-6 py-10 md:container md:mx-auto'>
			<h1 className='text-2xl font-semibold md:text-3xl'>
				Not sure where to start?
			</h1>
			<p className='mt-2 text-sm md:text-base text-muted-foreground'>
				Programs are designed to help you achieve your fitness goals, whether
				you're looking to lose weight.
			</p>

			<div className='grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3'>
				{programs.map(item => (
					<Card
						key={item.title}
						className='relative p-5 transition hover:shadow-lg bg-background group rounded-2xl'
					>
						<h2 className='text-lg font-semibold'>{item.title}</h2>
						<p className='mt-2 text-sm text-muted-foreground'>
							{item.description}
						</p>

						<Button
							size={'icon'}
							variant={'ghost'}
							className='absolute transition-transform right-4 top-4 group-hover:rotate-180'
						>
							<item.icon />
						</Button>
					</Card>
				))}
			</div>
		</div>
	</>
)

export default Home
