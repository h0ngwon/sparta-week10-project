import Profile from 'components/Profile';
import Layout from 'components/ui/Layout';
import Detail from 'pages/Detail';
import Home from 'pages/Home';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { authActions } from 'redux/modules/auth';

const Router = () => {
	const dispatch = useDispatch();
	const repository = localStorage;
	const isLogin = useSelector((state) => state.auth.isLogin);

	const checkToken = () => {
		if (repository.getItem('accessToken')) {
			dispatch(authActions.login());
		}
	};

	useEffect(() => {
		checkToken();
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					element={isLogin ? <Layout/> : <Navigate to='/login' />}
				>
					<Route path='/' element={<Home />} />
					<Route path='/detail/:id' element={<Detail />} />
					<Route path='/profile' element={<Profile />} />
				</Route>

				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
