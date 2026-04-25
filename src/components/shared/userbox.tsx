import {
	Avatar,
	AvatarBadge,
	AvatarFallback,
	AvatarImage,
} from '@/components/ui/avatar'
import { auth } from '@/firebase'
import { useUserState } from '@/store/user.store'
import { LogOut, LucideLoader2 } from 'lucide-react'
import { TbGymnastics } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'

const UserBox = () => {
	const { user, setUser } = useUserState()
	const navigate = useNavigate()
	if (!user) return <LucideLoader2 className='animate-spin' />

	const onLogout = () => {
		auth.signOut().then(() => {
			setUser(null)
			navigate('/auth')
		})
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='cursor-pointer'>
					<AvatarImage src={user.photoURL!} />
					<AvatarFallback>{user.email![0]}</AvatarFallback>
					<AvatarBadge className='bg-green-600 dark:bg-green-800' />
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='w-w80 '
				align='start'
				alignOffset={11}
				forceMount
			>
				<div className='flex flex-col p-2 space-y-4'>
					<p className='text-xs font-medium leading-none text-muted-foreground'>
						{user.email}
					</p>
					<div className='flex items-center gap-x-2'>
						<div className='p-1 rounded-md bg-secondary'>
							<Avatar>
								<AvatarImage src={user.photoURL!} />
								<AvatarFallback>{user.email![0]}</AvatarFallback>
								<AvatarBadge className='bg-green-600 dark:bg-green-800' />
							</Avatar>
						</div>
						<div className='space-y-1'>
							<p className='text-sm line-clamp-1'>
								{user.displayName ?? user.email}
							</p>
						</div>
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className='cursor-pointer' onClick={onLogout}>
						<TbGymnastics className='w-4 h-4 mr-2' />
						<span>GYM</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuGroup className=''>
					<DropdownMenuItem className='cursor-pointer' onClick={onLogout}>
						<LogOut className='w-4 h-4 mr-2' />
						<span>Logout</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
export default UserBox
