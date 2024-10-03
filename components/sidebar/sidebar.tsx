import { deleteAuthCookie } from '@/actions/auth.action'
import { menuConfig } from '@/config/menu'
import { Link as UILink } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { HomeIcon } from '../icons/sidebar/home-icon'
import { useSidebarContext } from '../layout/layout-context'
import Logo from '../shared/logo'
import { DarkModeSwitchButton } from '../ui/darkmode-switch-button'
import { SidebarItem } from './sidebar-item'
import { SidebarMenu } from './sidebar-menu'
import { Sidebar } from './sidebar.styles'

export const SidebarWrapper = () => {
	const pathname = usePathname()
	const { collapsed, setCollapsed } = useSidebarContext()

	const router = useRouter()

	const handleLogout = useCallback(async () => {
		await deleteAuthCookie()
		router.replace('/login')
	}, [router])

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
						<Logo className='w-full' color='#fff' />
					</Link>
				</div>
				<div className='flex flex-col justify-between h-full'>
					<div className={Sidebar.Body()}>
						<SidebarMenu title=''>
							<SidebarItem
								key='/'
								isActive={pathname.length < 2}
								href='/'
								title='Главная'
								icon={<HomeIcon />}
							/>
							{menuConfig.sidebar.map(item => (
								<SidebarItem
									key={item.href}
									isActive={pathname
										.substring(1)
										.includes(item.href.substring(1))}
									href={item.href}
									title={item.name}
									icon={item.icon}
								/>
							))}
						</SidebarMenu>
					</div>

					<div className={Sidebar.Footer()}>
						<div className='flex justify-between items-center'>
							<span>Темный режим</span>
							<DarkModeSwitchButton />
						</div>
						<UILink
							isExternal
							color='foreground'
							href='https://localhost:3000'
							target='_blank'
						>
							Интернет-магазин
						</UILink>
						<UILink color='danger' href='#' onClick={handleLogout}>
							Выйти
						</UILink>
						<div className='flex items-center gap-2 text-sm'>Версия: 1.0.0</div>
					</div>
				</div>
			</div>
		</aside>
	)
}
