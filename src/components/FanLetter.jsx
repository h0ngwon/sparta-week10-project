import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { deleteItem, modifyItem } from 'redux/reducers/workout';
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const BtnContainer = styled.div`
	margin: 20px;
`;

const HomeBtn = styled.button`
	font-size: 30px;
	padding: 20px;
	color: white;
	border: none;
	background: black;
	border-radius: 20px;
	cursor: pointer;

	&:hover {
		background-color: #333847;
	}
`;

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 1000px;
	height: 800px;
	background-color: #787276;
	border-radius: 20px;
	margin: 20px;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 100%;
	height: 20%;
	margin: 50px;
	background-color: black;
	padding: 20px;
`;

const ImageContainer = styled.div`
	width: 10rem;
	margin-right: 20px;
	height: 100%;
`;

const UserImage = styled.img`
	height: 100%;
	box-sizing: border-box;
`;

const Nickname = styled.h1`
	font-size: 40px;
	color: white;
`;

const CreatedTime = styled.div`
	color: white;
`;

const WritedContainer = styled.div`
	font-size: 30px;
	color: white;
`;

const ArticleContainer = styled.div`
	background-color: black;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 50px;
	width: 50rem;
	height: 20rem;
	border-radius: 20px;
	color: white;
	padding: 20px;
	text-align: center;
	font-size: 24px;
`;

const Article = styled.textarea`
	display: flex;
	align-items: center;
	background-color: black;
	color: white;
	font-size: 24px;
	margin: 40px;
	width: 50rem;
	height: 18rem;
	border-radius: 20px;
	padding: 20px;
`;

const BtnsContainer = styled.div`
	width: 50%;
	display: flex;
	justify-content: space-between;
`;

const ModifyBtn = styled.button`
	color: white;
	background-color: black;
	font-size: 30px;
	width: 200px;
	border: none;
	border-radius: 50px;
	padding: 20px;
	cursor: pointer;
	&:hover {
		background-color: #333847;
	}
`;
const DeleteBtn = styled(ModifyBtn)``;

const ConfirmBtn = styled(ModifyBtn)`
	width: 100%;
`;

const FanLetter = () => {
    const dispatch = useDispatch();
    const workoutData = useSelector(state => state.workoutReducer);
	const { id } = useParams();
	const filteredData = workoutData.filter((w) => w.id === id)[0];
	const [isModifyBtnClicked, setIsModifyBtnClicked] = useState(false);
	const [modifyText, setModifyText] = useState(filteredData.content);

	const data = {
		createdAt: filteredData.createdAt,
		nickname: filteredData.nickname,
		avatar: filteredData.avatar,
		content: modifyText,
		writedTo: filteredData.writedTo,
		id: filteredData.id,
	};

	const navigate = useNavigate();

	const navigateHandler = () => {
		navigate("/");
	};

	const deleteWorkoutHandler = (id) => {
		if (window.confirm("삭제하시겠습니까?")) {
            dispatch(deleteItem(id));
			navigateHandler();
		}
	};

	const modifyHandler = () => {
		setIsModifyBtnClicked(!isModifyBtnClicked);
	};

	const textModifyHandler = (e) => {
		setModifyText(e.target.value);
	};

	const textModifyConfirmHandler = (e) => {
		if (window.confirm("수정하시겠습니까?")) {
			if (modifyText.trim() === "") {
				alert("내용을 채워주세요");
				return;
			}
			if (filteredData.content === modifyText) {
				alert("변경된 내용이 없습니다.");
				return;
			}

            dispatch(modifyItem(data));
			setIsModifyBtnClicked(!isModifyBtnClicked);
			navigateHandler();
		}
	};

	return (
		<Container>
			<BtnContainer>
				<HomeBtn onClick={navigateHandler}>홈으로</HomeBtn>
			</BtnContainer>
			<ContentContainer>
				<Header>
					<ImageContainer>
						<UserImage src={filteredData.avatar}></UserImage>
					</ImageContainer>
					<Nickname>{filteredData.nickname}</Nickname>
					<CreatedTime>
						{new Date(filteredData.createdAt).toLocaleDateString(
							"ko-KR"
						)}{" "}
						{new Date(filteredData.createdAt).toLocaleTimeString(
							"ko-KR"
						)}
					</CreatedTime>
				</Header>
				<WritedContainer>For {filteredData.writedTo}</WritedContainer>
				{isModifyBtnClicked ? (
					<Article
						maxLength={40}
						defaultValue={filteredData.content}
						onChange={textModifyHandler}
					></Article>
				) : (
					<ArticleContainer>{filteredData.content}</ArticleContainer>
				)}

				{isModifyBtnClicked ? (
					<BtnsContainer>
						<ConfirmBtn onClick={textModifyConfirmHandler}>
							수정완료
						</ConfirmBtn>
					</BtnsContainer>
				) : (
					<BtnsContainer>
						<ModifyBtn onClick={modifyHandler}>수정</ModifyBtn>
						<DeleteBtn
							onClick={() =>
								deleteWorkoutHandler(filteredData.id)
							}
						>
							삭제
						</DeleteBtn>
					</BtnsContainer>
				)}
			</ContentContainer>
		</Container>
	);
};

export default FanLetter;
