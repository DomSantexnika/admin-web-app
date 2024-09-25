'use client'

import { createAuthCookie } from '@/actions/auth.action'
import { LoginSchema } from '@/helpers/schemas'
import { LoginFormType } from '@/helpers/types'
import { Button, Input } from '@nextui-org/react'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export function Login() {
	const router = useRouter()

	const initialValues: LoginFormType = {
		email: 'admin@example.com',
		password: 'password',
	}

	const handleLogin = useCallback(
		async (values: LoginFormType) => {
			await createAuthCookie()
			router.replace('/')
		},
		[router]
	)

	return (
		<>
			<div className='text-center text-[25px] font-bold mb-6'>
				Вход в систему
			</div>

			<Formik
				initialValues={initialValues}
				validationSchema={LoginSchema}
				onSubmit={handleLogin}
			>
				{({ values, errors, touched, handleChange, handleSubmit }) => (
					<>
						<div className='flex flex-col w-1/2 gap-4 mb-4'>
							<Input
								variant='bordered'
								label='Эл. почта'
								type='email'
								value={values.email}
								isInvalid={!!errors.email && !!touched.email}
								errorMessage={errors.email}
								onChange={handleChange('email')}
							/>
							<Input
								variant='bordered'
								label='Пароль'
								type='password'
								value={values.password}
								isInvalid={!!errors.password && !!touched.password}
								errorMessage={errors.password}
								onChange={handleChange('password')}
							/>
						</div>

						<Button
							onPress={() => handleSubmit()}
							variant='flat'
							color='primary'
						>
							Войти
						</Button>
					</>
				)}
			</Formik>

			<div className='font-light text-slate-400 mt-4 text-sm'>
				<a href='https://localhost:3000' target='_blank' className='font-bold'>
					Перейти в интернет-магазин
				</a>
			</div>
		</>
	)
}
