import Profile from 'components/Profile';
import Layout from 'components/ui/Layout';
import Detail from 'pages/Detail';
import Home from 'pages/Home';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

const Router = () => {
	const isLogin = useSelector((state) => state.auth.isLogin);

	return (
		<BrowserRouter>
			<Routes>
					<Route element={isLogin ? <Layout /> : <Navigate to='/login'/>}>
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
