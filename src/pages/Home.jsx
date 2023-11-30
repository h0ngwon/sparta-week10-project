import FanLetters from 'components/FanLetters';
import Form from 'components/Form';
import Header from 'components/Header';
import Navigation from 'components/Navigation';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { userActions } from 'redux/modules/user';

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const Home = () => {
	const repository = localStorage;
	const dispatch = useDispatch();
	const getUser = async () => {
		try {
			await axios
				.get('https://moneyfulpublicpolicy.co.kr/user', {
					headers: {
						Authorization: `Bearer ${repository.getItem(
							'accessToken'
						)}`,
					},
				})
				.then((res) => {
					const { data } = res;

					const user = {
						id: data.id,
						nickname: data.nickname,
						avatar: data.avatar,
						accessToken: repository.getItem('accessToken'),
					};
					dispatch(userActions.getUserInfo(user));
				});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<Container>
			<Header />
			<Navigation />
			<Form />
			<FanLetters />
		</Container>
	);
};

export default Home;
