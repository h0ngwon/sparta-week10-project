import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { authActions } from 'redux/modules/auth';

const Container = styled.div`
	width: 100%;
	height: 80px;
	background-color: black;
	color: white;
	display: flex;
	align-items: center;
	justify-content: space-around;
`;
const LogoContainer = styled.div`
	font-size: 36px;
	cursor: pointer;
`;

const Menu = styled.ul`
	display: flex;
	gap: 20px;
`;

const MenuItem = styled.li`
	cursor: pointer;
	padding: 20px;
	border-radius: 12px;

	&:hover {
		background-color: #ccc;
	}
`;

const Nav = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logout = () => {
		dispatch(authActions.logout());
		navigate('/login');
	};

	return (
		<Container>
			<LogoContainer
				onClick={() => {
					navigate('/');
				}}
			>
				HOME
			</LogoContainer>
			<Menu>
				<MenuItem
					onClick={() => {
						navigate('/profile');
					}}
				>
					내 프로필
				</MenuItem>
				<MenuItem onClick={logout}>로그아웃</MenuItem>
			</Menu>
		</Container>
	);
};

export default Nav;
