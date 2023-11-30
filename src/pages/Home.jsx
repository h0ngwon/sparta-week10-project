import FanLetters from 'components/FanLetters';
import Form from 'components/Form';
import Header from 'components/Header';
import Navigation from 'components/Navigation';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const Home = () => {
    
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
