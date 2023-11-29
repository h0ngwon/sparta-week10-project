import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { addItem } from "redux/reducers/workout";
import styled from "styled-components";
const Container = styled.div`
	margin-top: 30px;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 700px;
	background-color: #5a6673;
	border-radius: 30px;
	padding: 20px;
`;

const NicknameContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	margin: 10px;
	width: 100%;
`;

const NicknameLabel = styled.label`
	font-size: 20px;
	margin-right: 20px;
	color: white;
`;

const Nickname = styled.input`
	font-size: 20px;
	padding: 20px;
	border-radius: 20px;
	border: none;
	width: 500px;
`;

const ContentContainer = styled.div`
	margin: 10px;
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 100%;
`;

const ContentLabel = styled.label`
	font-size: 20px;
	margin-right: 20px;
	color: white;
`;

const Content = styled.textarea`
	font-size: 20px;
	border-radius: 20px;
	padding: 25px;
	resize: none;
	width: 490px;
`;

const SelectContainer = styled.div`
	margin: 10px;
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 100%;
`;

const SelectLabel = styled.label`
	font-size: 20px;
	margin-right: 20px;
	color: white;
`;

const Select = styled.select`
	font-size: 30px;
	border-radius: 20px;
	width: 540px;
	text-align: center;
	padding: 21px;
`;

const Btn = styled.button`
	font-size: 30px;
	margin: 10px;
	color: white;
	background-color: black;
	border: none;
	border-radius: 20px;
	padding: 20px;
	cursor: pointer;
	width: 100%;
`;

const Form = () => {
	const dispatch = useDispatch();
	const [nickname, setNickname] = useState("");
	const [content, setContent] = useState("");
	const [workout, setWorkout] = useState("스쿼트");

	const nicknameHandler = (e) => {
		setNickname(e.target.value);
	};

	const contentHandler = (e) => {
		setContent(e.target.value);
	};

	const workoutHandler = (e) => {
		setWorkout(e.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();

		const data = {
			createdAt: new Date().toISOString(),
			nickname,
			avatar: "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg",
			content,
			writedTo: workout,
			id: uuid(),
		};

		if (nickname.trim() === "") {
			alert("Please enter a nickname");
			return;
		}

		if (content.trim() === "") {
			alert("Please enter a content");
			return;
		}

		dispatch(addItem(data));
        
		setNickname("");
		setContent("");
	};

    
	return (
		<Container>
			<NicknameContainer>
				<NicknameLabel>닉네임 : </NicknameLabel>
				<Nickname
					value={nickname}
					type="text"
					maxLength={20}
					placeholder="20자 내로 입력"
					onChange={nicknameHandler}
					autoFocus
					required={true}
				></Nickname>
			</NicknameContainer>

			<ContentContainer>
				<ContentLabel>내용 : </ContentLabel>
				<Content
					value={content}
					placeholder="40자 내로 입력"
					maxLength={40}
					onChange={contentHandler}
					required={true}
				/>
			</ContentContainer>

			<SelectContainer>
				<SelectLabel>운동 : </SelectLabel>
				<Select onChange={workoutHandler} value={workout}>
					<option value="스쿼트" defaultValue={workout}>
						스쿼트
					</option>
					<option value="벤치프레스">벤치프레스</option>
					<option vlaue="데드리프트">데드리프트</option>
					<option value="오버헤드프레스">오버헤드프레스</option>
				</Select>
			</SelectContainer>

			<Btn onClick={submitHandler}>등록</Btn>
		</Container>
	);
};

export default Form;
