import FanLetters from 'components/FanLetters';
import Form from 'components/Form';
import Header from 'components/Header';
import Navigation from 'components/Navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getUserInfo } from 'redux/modules/user';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const Home = () => {
	const dispatch = useDispatch();
	const { avatar, id, nickname } = useSelector((state) => state.user);
	localStorage.setItem('avatar', avatar);
	localStorage.setItem('userId', id);
    localStorage.setItem('nickname', nickname)
	useEffect(() => {
		dispatch(__getUserInfo());
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
