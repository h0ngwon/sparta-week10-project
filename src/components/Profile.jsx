import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	height: 100vh;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin: auto;
`;

const ProfileContainer = styled.div`
	width: 50%;
	height: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background-color: #5a6673;
`;

const ProfileTitle = styled.div`
	font-size: 36px;
	color: white;
	font-weight: 700;
	margin: 10px;
`;

const ProfileImageContainer = styled.div`
	width: 100px;
	height: 100px;
`;

const ProfileImage = styled.img`
	width: 100%;
	height: 100%;
	border-radius: 24px;
	object-fit: cover;
	cursor: pointer;
`;

const ProfileImageInput = styled.input`
	display: none;
`;

const UserNickname = styled.div`
	font-size: 24px;
	font-weight: 700;
	color: white;
	margin: 20px;
`;

const UserId = styled.div`
	color: white;
	font-size: 20px;
	margin: 10px;
`;

const ModifyBtn = styled.button`
	width: 100%;
	color: white;
	font-size: 24px;
	font-weight: bold;
	border-radius: 24px;
	background-color: black;
	border: none;
	padding: 20px;
`;

const Profile = () => {
	const nickname = useSelector((state) => state.user.nickname);
	const id = useSelector((state) => state.user.id);

	const [file, setFile] = useState(
		'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg'
	);
	const imageRef = useRef(null);

	const onFileUpload = (e) => {
		if (!e.target.files[0]) return;
		setFile(URL.createObjectURL(e.target.files[0]));
	};

	const refClickHandler = () => {
		imageRef.current.click();
	};

	return (
		<Container>
			<ProfileContainer>
				<ProfileTitle>프로필 관리</ProfileTitle>
				<ProfileImageContainer onClick={refClickHandler}>
					<ProfileImage src={file} />
					<ProfileImageInput
						type='file'
						accept='image/*'
						id='file'
						onChange={onFileUpload}
						ref={imageRef}
					/>
				</ProfileImageContainer>
				<UserNickname>닉네임 : {nickname}</UserNickname>
				<UserId>{id}</UserId>
				<div>
					<ModifyBtn>수정하기</ModifyBtn>
				</div>
			</ProfileContainer>
		</Container>
	);
};

export default Profile;
