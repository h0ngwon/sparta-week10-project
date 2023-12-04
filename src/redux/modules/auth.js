import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi, jsonApi } from 'api/apis';
import { toast } from 'react-toastify';

const initialState = {
	isLogin: !!localStorage.getItem('accessToken'),
	userId: localStorage.getItem('userId'),
	nickname: localStorage.getItem('nickname'),
	avatar: localStorage.getItem('avatar'),
	isLoading: false,
	isError: false,
	error: null,
};

export const __login = createAsyncThunk(
	'login',
	async ({ id, password }, thunkAPI) => {
		try {
			const { data } = await authApi.post('/login', {
				id,
				password,
			});

			const { accessToken, avatar, nickname, userId } = data;

			if (data.success) {
				toast.success('로그인되었습니다!');
				return { accessToken, avatar, nickname, userId };
			}
		} catch (error) {
			const { response } = error;
			const { data } = response;
			const { message } = data;
			toast.error(message);
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const __modifyProfile = createAsyncThunk(
	'user/modifyProfile',
	async (payload, thunkAPI) => {
		const formData = new FormData();
		formData.append('avatar', payload.file);
		formData.append('nickname', payload.modifyNickname);

		try {
			const { data } = await authApi.patch(`/profile`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			const editingObj = {};
			const { nickname, avatar } = data;
			if (nickname) editingObj.nickname = nickname;
			if (avatar) editingObj.avatar = avatar;
			// JSON 서버에 내 코멘트들의 닉네임과 아바타 변경
            const userId = localStorage.getItem('userId')
            const {data: comments} = await jsonApi.get(`/comments?userId=${userId}`)

			for (const myComment of comments) {
				await jsonApi.patch(`/comments/${myComment.id}`, editingObj);
			}

			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

const auth = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state, action) => {
			state.isLogin = false;
			localStorage.clear();
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(__login.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(__login.fulfilled, (state, action) => {
				const { accessToken, avatar, nickname, userId } =
					action.payload;
				localStorage.setItem('accessToken', accessToken);
				localStorage.setItem('avatar', avatar);
				localStorage.setItem('userId', userId);
				localStorage.setItem('nickname', nickname);
				state.isLogin = true;
				state.avatar = avatar;
				state.nickname = nickname;
				state.userId = userId;
				state.isLoading = false;
			})
			.addCase(__login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.error = action.payload;
			})
			.addCase(__modifyProfile.pending, (state, _) => {
				state.isLoading = true;
			})
			.addCase(__modifyProfile.fulfilled, (state, action) => {
				const { avatar, nickname } = action.payload;
				if (avatar) {
					localStorage.setItem('avatar', avatar);
					state.avatar = avatar;
				}

				if (nickname) {
					localStorage.setItem('nickname', nickname);
					state.nickname = nickname;
				}
			})
			.addCase(__modifyProfile.rejected, (state, action) => {
				state.error = action.payload;
			});
	},
});

export default auth.reducer;
export const authActions = auth.actions;
