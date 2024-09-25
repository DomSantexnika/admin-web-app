import { deleteAuthCookie } from '@/actions/auth.action'
import {
	Avatar,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	NavbarItem,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export const UserDropdown = () => {
	const router = useRouter()

	const handleLogout = useCallback(async () => {
		await deleteAuthCookie()
		router.replace('/login')
	}, [router])

	return (
		<Dropdown>
			<NavbarItem>
				<DropdownTrigger>
					<Avatar
						as='button'
						color='secondary'
						size='md'
						src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
					/>
				</DropdownTrigger>
			</NavbarItem>
			<DropdownMenu
				aria-label='User menu actions'
				onAction={actionKey => console.log({ actionKey })}
			>
				<DropdownItem
					key='logout'
					color='danger'
					className='text-danger'
					onPress={handleLogout}
				>
					Log Out
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	)
}
