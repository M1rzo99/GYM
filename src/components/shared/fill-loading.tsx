import { TbLoaderQuarter } from 'react-icons/tb'
import { Skeleton } from '../ui/skeleton'

const FillLoading = () => {
	return (
		<Skeleton className='absolute inset-0 z-50 flex items-center justify-center w-full h-full opacity-20'>
			<TbLoaderQuarter className='animate-spin' />
		</Skeleton>
	)
}

export default FillLoading
