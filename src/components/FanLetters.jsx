import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { __getComments } from 'redux/modules/workout';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin: 20px;
	width: 70%;
	height: 100%;
	background-color: black;
	border-radius: 20px;
	border: none;
	color: white;
	padding: 20px;
`;

const CommentContainer = styled.div`
	width: 30rem;
	display: flex;
	flex-wrap: wrap;
	border: 1px solid white;
	margin: 20px;
	padding: 20px;
	border-radius: 20px;
	cursor: pointer;

	&:hover {
		transform: scale(1.1);
	}
`;

const ImageWrapper = styled.div`
	margin: 20px;
`;

const Image = styled.img`
	width: 4rem;
`;

const InfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 10px;
`;

const NicknameContainer = styled.div`
	color: white;
	font-weight: bold;
	margin-bottom: 5px;
`;

const CreatedTimeContainer = styled.div`
	color: white;
	margin-top: 5px;
`;

const ContentContainer = styled.div`
	width: 300px;
	background-color: #738290;
	padding: 10px;
	margin-top: 20px;
	border-radius: 10px;
	border: none;
	color: white;
`;

const DetailLink = styled(Link)`
	text-decoration: none;
`;

const FanLetters = () => {
	const dispatch = useDispatch();
	const menuWorkout = useSelector((state) => state.menu);
	const { comments } = useSelector(
		(state) => state.workout
	);

	useEffect(() => {
		dispatch(__getComments());
	}, [dispatch]);

	const nothing = `${menuWorkout}를 하고싶은 사람이 없어요!`;
	return (
		<Container>
			{comments.filter((w) => w.writedTo === menuWorkout).length > 0
				? comments
						.filter((w) => w.writedTo === menuWorkout)
						.map((w) => {
							return (
								<DetailLink to={`/detail/${w.id}`} key={w.id}>
									<CommentContainer key={w.id}>
										<ImageWrapper>
											<Image src={w.avatar} />
										</ImageWrapper>
										<InfoContainer>
											<NicknameContainer>
												{w.nickname}
											</NicknameContainer>
											<CreatedTimeContainer>
												{new Date(
													w.createdAt
												).toLocaleDateString(
													'ko-KR'
												)}{' '}
												{new Date(
													w.createdAt
												).toLocaleTimeString('ko-KR')}
											</CreatedTimeContainer>
											<ContentContainer>
												{w.content}
											</ContentContainer>
										</InfoContainer>
									</CommentContainer>
								</DetailLink>
							);
						})
				: nothing}
		</Container>
	);
};

export default FanLetters;
