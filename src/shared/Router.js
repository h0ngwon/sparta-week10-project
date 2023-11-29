import Login from 'components/Login';
import Profile from 'components/Profile';
import Register from 'components/Register';
import Layout from 'components/ui/Layout';
import Detail from 'pages/Detail';
import Home from 'pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path='/' element={<Home />} />
					<Route path='/detail/:id' element={<Detail />} />
					<Route path='/profile' element={<Profile />} />
				</Route>
                
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
