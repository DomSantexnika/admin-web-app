import { CustomersIcon } from '@/components/icons/sidebar/customers-icon'
import { HomeIcon } from '@/components/icons/sidebar/home-icon'
import { PaymentsIcon } from '@/components/icons/sidebar/payments-icon'
import { ProductsIcon } from '@/components/icons/sidebar/products-icon'
import { SettingsIcon } from '@/components/icons/sidebar/settings-icon'

export const menuConfig = {
	sidebar: [
		{
			name: 'Главная',
			href: '/',
			icon: <HomeIcon />,
		},
		{
			name: 'Заказы',
			href: '/orders',
			icon: <PaymentsIcon />,
		},
		{
			name: 'Товары',
			href: '/products',
			icon: <ProductsIcon />,
		},
		{
			name: 'Клиенты',
			href: '/customers',
			icon: <CustomersIcon />,
		},
		{
			name: 'Категории',
			href: '/categories',
			icon: <CustomersIcon />,
		},
		{
			name: 'Бренды',
			href: '/brands',
			icon: <CustomersIcon />,
		},
		{
			name: 'Настройки',
			href: '/settings',
			icon: <SettingsIcon />,
		},
	],
}
