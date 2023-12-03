import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	__getUserInfo,
	__modifyProfile,
	userActions,
} from 'redux/modules/user';
import styled from 'styled-components';
import { toast } from 'react-toastify';

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

const ButtonContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const ModifyBtn = styled.button`
	width: 50%;
	color: white;
	font-size: 24px;
	font-weight: bold;
	border-radius: 24px;
	background-color: black;
	border: none;
	padding: 20px;
	cursor: pointer;
	margin: 10px;

	&:hover {
		background-color: #76a3ad;
	}
`;

const ModifyNickname = styled.input`
	margin: 20px;
	padding: 15px;
	border: none;
	font-size: 24px;
	font-weight: 700;
	border-radius: 24px;
`;

const ButtonsContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	gap: 12px;
`;
const CancelModifyBtn = styled(ModifyBtn)`
	background-color: #ccc;
`;
const CompleteModifyBtn = styled(ModifyBtn)``;

const Profile = () => {
	const dispatch = useDispatch();
	const { nickname, id, avatar } = useSelector((state) => state.user);
	const [isModify, setIsModify] = useState(false);
	const [modifyNickname, setModifyNickname] = useState(nickname);
	const [preview, setPreview] = useState(
		avatar
			? avatar
			: 'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg'
	);
	const [file, setFile] = useState(
		avatar
			? avatar
			: 'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg'
	);
	const imageRef = useRef(null);

	const onFileUpload = (e) => {
		if (!e.target.files[0]) return;
		setPreview(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
	};

	const refClickHandler = () => {
		imageRef.current.click();
	};

	const modifyBtnHandler = () => {
		setIsModify(true);
	};

	const cancelModifyBtnHandler = () => {
		setIsModify(false);
	};

	const modifyNicknameHandler = (e) => {
		setModifyNickname(e.target.value);
	};

	const completeModifyHandler = () => {
		const data = {
			modifyNickname,
			file,
		};

		dispatch(__modifyProfile(data));
		toast.success('프로필 변경이 완료되었습니다');
		dispatch(__getUserInfo());
		setIsModify(false);
	};

	return (
		<Container>
			<ProfileContainer>
				<ProfileTitle>프로필 관리</ProfileTitle>
				<ProfileImageContainer onClick={refClickHandler}>
					<ProfileImage src={preview} />
					<ProfileImageInput
						type='file'
						accept='image/*'
						id='file'
						onChange={onFileUpload}
						ref={imageRef}
					/>
				</ProfileImageContainer>
				{isModify ? (
					<ModifyNickname
						defaultValue={nickname}
						maxLength={10}
						onChange={modifyNicknameHandler}
					/>
				) : (
					<UserNickname>닉네임 : {nickname}</UserNickname>
				)}
				<UserId>{id}</UserId>
				<ButtonContainer>
					{isModify ? (
						<ButtonsContainer>
							<CancelModifyBtn onClick={cancelModifyBtnHandler}>
								취소
							</CancelModifyBtn>
							<CompleteModifyBtn onClick={completeModifyHandler}>
								수정완료
							</CompleteModifyBtn>
						</ButtonsContainer>
					) : (
						<ModifyBtn onClick={modifyBtnHandler}>
							수정하기
						</ModifyBtn>
					)}
				</ButtonContainer>
			</ProfileContainer>
		</Container>
	);
};

export default Profile;
