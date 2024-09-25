import { menuConfig } from '@/config/menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebarContext } from '../layout/layout-context'
import Logo from '../shared/logo'
import { SidebarItem } from './sidebar-item'
import { SidebarMenu } from './sidebar-menu'
import { Sidebar } from './sidebar.styles'

export const SidebarWrapper = () => {
	const pathname = usePathname()
	const { collapsed, setCollapsed } = useSidebarContext()

	return (
		<aside className='h-screen z-[20] sticky top-0'>
			{collapsed ? (
				<div className={Sidebar.Overlay()} onClick={setCollapsed} />
			) : null}
			<div
				className={Sidebar({
					collapsed: collapsed,
				})}
			>
				<div className={Sidebar.Header()}>
					<Link href='/' className='block'>
						<Logo className='w-full' />
					</Link>
				</div>
				<div className='flex flex-col justify-between h-full'>
					<div className={Sidebar.Body()}>
						<SidebarMenu title=''>
							{menuConfig.sidebar.map(item => (
								<SidebarItem
									key={item.href}
									isActive={pathname === item.href}
									href={item.href}
									title={item.name}
									icon={item.icon}
								/>
							))}
							<SidebarItem
								key='https://localhost:3000'
								href='https://localhost:3000'
								title='Интернет-магазин'
								target='_blank'
							/>
						</SidebarMenu>
					</div>
					<div className={Sidebar.Footer()}></div>
				</div>
			</div>
		</aside>
	)
}
