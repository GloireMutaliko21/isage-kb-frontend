import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as articleService from './article.service';
import { STATUS } from '@/constants/constants';

const initialState: {
	articles: Article[];
	articlesByCateg: Article[];
	unStocked: Article[];
	selectedArticle: Article | null;
	status: {
		isLoading: boolean;
		isSuccess: boolean;
		isError: boolean;
	};
	message: string | null;
} = {
	articles: [],
	articlesByCateg: [],
	unStocked: [],
	selectedArticle: null,
	status: {
		isLoading: false,
		isSuccess: false,
		isError: false,
	},
	message: null,
};

const getArticles = createAsyncThunk(
	'articles/all',
	articleService.getArticles
);

const getArticleById = createAsyncThunk(
	'articles/one',
	articleService.getArticleById
);

const getArticleByCated = createAsyncThunk(
	'articles/categ',
	articleService.getByCated
);

const getUnstockArticles = createAsyncThunk(
	'articles/unstock',
	articleService.getUnstock
);

const createArticle = createAsyncThunk(
	'articles/create',
	articleService.createrticle
);

const updateArticle = createAsyncThunk(
	'articles/update',
	articleService.updateArticle
);

const articleSlice = createSlice({
	name: 'articles',
	initialState,
	reducers: {
		setArticleIsError: (state, { payload }) => {
			state.status.isError = payload;
		},
		setArticleIsSuccess: (state, { payload }) => {
			state.status.isSuccess = payload;
		},
	},
	extraReducers: (builder) => {
		builder
			//Get All articles
			.addCase(getArticles.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getArticles.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.articles = payload;
				state.message = null;
			})
			.addCase(getArticles.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedArticle = null;
				state.message = payload as string;
			})

			// Get articles group by category
			.addCase(getArticleByCated.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getArticleByCated.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.articlesByCateg = payload;
				state.message = null;
			})
			.addCase(getArticleByCated.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedArticle = null;
				state.message = payload as string;
			})

			//Get Unstock articles
			.addCase(getUnstockArticles.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getUnstockArticles.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.unStocked = payload;
				state.message = null;
			})
			.addCase(getUnstockArticles.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedArticle = null;
				state.message = payload as string;
			})

			//Get one artile by id
			.addCase(getArticleById.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getArticleById.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedArticle = payload;
				state.message = null;
			})
			.addCase(getArticleById.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			// Create new article
			.addCase(createArticle.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(createArticle.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.articles = [...state.articles, payload];
				state.message = 'Enregistrement réussi';
			})
			.addCase(createArticle.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			// update article
			.addCase(updateArticle.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(updateArticle.fulfilled, (state, { payload }) => {
				const updated = state.articles.filter((el) => el.id !== payload.id);
				state.status = STATUS.SUCCESS;
				state.selectedArticle = payload;
				state.articles = [...updated, payload];
				state.message = 'Mise à jour réussie';
			})
			.addCase(updateArticle.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			});
	},
});

export default articleSlice.reducer;
export {
	getArticles,
	getArticleById,
	getArticleByCated,
	getUnstockArticles,
	createArticle,
	updateArticle,
};
export const { setArticleIsError, setArticleIsSuccess } = articleSlice.actions;
