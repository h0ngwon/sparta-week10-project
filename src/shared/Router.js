import Layout from 'components/ui/Layout';
import Detail from 'pages/Detail';
import Home from 'pages/Home';
import LoginPage from 'pages/LoginPage';
import ProfilePage from 'pages/ProfilePage';
import RegisterPage from 'pages/RegisterPage';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const Router = () => {
	const isLogin = useSelector((state) => state.auth.isLogin);

	return (
		<BrowserRouter>
			<Routes>
				{isLogin ? (
					<Route element={<Layout />}>
						<Route path='/' element={<Home />} />
						<Route path='/detail/:id' element={<Detail />} />
						<Route path='/profile' element={<ProfilePage />} />
						<Route path='*' element={<Navigate replace to='/' />} />
					</Route>
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
