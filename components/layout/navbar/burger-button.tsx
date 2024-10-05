import { useSidebarContext } from '../layout-context'
import { StyledBurgerButton } from './navbar.styles'

export const BurgerButton = () => {
	const { collapsed, setCollapsed } = useSidebarContext()

	return (
		<div
			className={StyledBurgerButton()}
			// open={collapsed}
			onClick={setCollapsed}
		>
			<div />
			<div />
		</div>
	)
}
