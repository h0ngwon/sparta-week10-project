import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: #7d8491;
`;

const LoginContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 50%;
	height: 500px;
	background-color: #fff;
`;

const LoginHeader = styled.div`
	font-size: 50px;
	font-weight: 700;
	border-radius: 24px;
	padding: 30px;
	width: 100%;
`;

const IdInputContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`;

const IdInput = styled.input`
	outline: none;
	border: none;
	border-bottom: 4px solid #ccc;
	font-size: 28px;
	padding: 10px;
	margin: 24px;
	width: 80%;
	transition: 0.3s ease;

	&:focus {
		border-color: #5c8ded;
		transition: 0.3s ease;
	}
`;

const PasswordInputContainer = styled(IdInputContainer)``;
const PasswordInput = styled(IdInput)``;

const LoginBtn = styled.button`
	width: 80%;
	font-size: 36px;
	font-weight: 700;
	padding: 20px;
	margin: 20px;
	border-radius: 24px;
	border: none;
	background-color: #5c8ded;
	color: white;

	&:hover {
		background-color: #265bc7;
	}
`;

const RegisterNav = styled.div`
	text-align: center;
	font-size: 24px;
	font-weight: 700;
	cursor: pointer;
	transition: 0.2s ease;
	padding: 12px;
	border-radius: 12px;

	&:hover {
		background-color: #5c8ded;
		color: white;
		transition: 0.2s ease;
	}
`;

const Login = () => {
	const navigate = useNavigate();
	return (
		<Container>
			<LoginContainer>
				<LoginHeader>로그인</LoginHeader>
				<IdInputContainer>
					<IdInput
						type='text'
						placeholder='아이디 (4 ~ 10글자)'
						minLength={4}
						maxLength={10}
					/>
				</IdInputContainer>
				<PasswordInputContainer>
					<PasswordInput
						type='password'
						placeholder='비밀번호 (4 ~ 15글자)'
						minLength={4}
						maxLength={15}
					/>
				</PasswordInputContainer>
				<LoginBtn>로그인</LoginBtn>
				<RegisterNav
					onClick={() => {
						navigate('/register');
					}}
				>
					회원가입
				</RegisterNav>
			</LoginContainer>
		</Container>
	);
};

export default Login;
