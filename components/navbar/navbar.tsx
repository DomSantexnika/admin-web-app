import { Navbar, NavbarContent } from '@nextui-org/react'
import React from 'react'
import { BurgerButton } from './burger-button'

interface Props {
	children: React.ReactNode
}

export const NavbarWrapper = ({ children }: Props) => {
	return (
		<div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
			<Navbar
				isBordered
				className='w-full'
				classNames={{
					wrapper: 'w-full max-w-full',
				}}
			>
				<NavbarContent className='md:hidden'>
					<BurgerButton />
				</NavbarContent>
			</Navbar>
			{children}
		</div>
	)
}
