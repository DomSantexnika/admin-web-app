import Chart, { Props } from 'react-apexcharts'

const state: Props['series'] = [
	{
		name: 'Заказы',
		data: [11, 32, 45, 32, 34, 52, 41],
	},
]

const options: Props['options'] = {
	chart: {
		type: 'bar',
		animations: {
			easing: 'linear',
			speed: 300,
		},

		brush: {
			enabled: false,
		},
		id: 'basic-bar',
		foreColor: 'hsl(var(--nextui-default-800))',
		stacked: true,
		toolbar: {
			show: false,
		},
	},

	xaxis: {
		categories: [
			'20.09.2024',
			'21.09.2024',
			'22.09.2024',
			'23.09.2024',
			'24.09.2024',
			'25.09.2024',
			'26.09.2024',
			'27.09.2024',
			'28.09.2024',
		],
		labels: {
			// show: false,
			style: {
				colors: 'hsl(var(--nextui-default-800))',
			},
		},
		axisBorder: {
			color: 'hsl(var(--nextui-nextui-default-200))',
		},
		axisTicks: {
			color: 'hsl(var(--nextui-nextui-default-200))',
		},
	},
	yaxis: {
		labels: {
			style: {
				// hsl(var(--nextui-content1-foreground))
				colors: 'hsl(var(--nextui-default-800))',
			},
		},
	},
	tooltip: {
		enabled: false,
	},
	grid: {
		show: true,
		borderColor: 'hsl(var(--nextui-default-200))',
		strokeDashArray: 0,
		position: 'back',
	},
	stroke: {
		curve: 'smooth',
		fill: {
			colors: ['red'],
		},
	},
}

export const Steam = () => {
	return (
		<>
			<div className='w-full z-20'>
				<div id='chart'>
					<Chart options={options} series={state} type='bar' height={425} />
				</div>
			</div>
		</>
	)
}
