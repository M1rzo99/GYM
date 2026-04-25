import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Skeleton } from '../ui/skeleton'

const FillLoading = () => {
	return (
		<Skeleton className='absolute inset-0 z-50 flex items-center justify-center w-full h-full opacity-20'>
			<AiOutlineLoading3Quarters className='w-6 h-6 animate-spin' />
		</Skeleton>
	)
}
export default FillLoading
