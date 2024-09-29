import { Switch } from '@nextui-org/react'
import { useTheme as useNextTheme } from 'next-themes'

export function DarkModeSwitchButton() {
	const { setTheme, resolvedTheme } = useNextTheme()

	return (
		<Switch
			isSelected={resolvedTheme === 'dark'}
			onValueChange={e => setTheme(e ? 'dark' : 'light')}
		/>
	)
}
