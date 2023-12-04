import Layout from 'components/ui/Layout';
import Detail from 'pages/Detail';
import Home from 'pages/Home';
import LoginPage from 'pages/LoginPage';
import ProfilePage from 'pages/ProfilePage';
import RegisterPage from 'pages/RegisterPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { authActions } from 'redux/modules/auth';

const Router = () => {
	const dispatch = useDispatch();
	const isLogin = useSelector((state) => state.auth.isLogin);

	useEffect(() => {
		if (localStorage.getItem('accessToken')) dispatch(authActions.login());
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				{isLogin ? (
					<>
						<Route element={<Layout />}>
							<Route path='/' element={<Home />} />
							<Route path='/detail/:id' element={<Detail />} />
							<Route path='/profile' element={<ProfilePage />} />
							<Route
								path='*'
								element={<Navigate replace to='/' />}
							/>
						</Route>
					</>
				) : (
					<>
						<Route path='/login' element={<LoginPage />} />
						<Route path='/register' element={<RegisterPage />} />
						<Route
							path='*'
							element={<Navigate replace to='/login' />}
						/>
					</>
				)}
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
