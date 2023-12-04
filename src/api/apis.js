import axios from 'axios';
import { toast } from 'react-toastify';
import { authActions } from 'redux/modules/auth';

let store;

import('redux/store/store').then((module) => {
	store = module.default();
});

export const authApi = axios.create({
	baseURL: 'https://moneyfulpublicpolicy.co.kr',
	headers: {
		'Content-Type': 'application/json',
	},
});

export const jsonApi = axios.create({
	baseURL: 'http://localhost:5000',
	headers: {
		'Content-Type': 'application/json',
	},
});

authApi.interceptors.request.use(
	(config) => {
		//헤더에 토큰추가
		const accessToken = localStorage.getItem('accessToken');
		if (accessToken) {
			config.headers['Authorization'] = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.all(error);
	}
);

authApi.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		toast.error(error.response.data.message);
		if (error.response.data.message.includes('만료')) {
			return store.dispatch(authActions.logout());
		}

		return Promise.reject(error);
	}
);

jsonApi.interceptors.request.use(
	async (config) => {
		const { data } = await authApi.get('/user');
		if (data.success) {
			return config;
		}
	},
	(error) => {
		return Promise.reject(error);
	}
);
