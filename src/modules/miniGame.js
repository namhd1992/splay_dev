import axios from 'axios'
import Ultilities from '../Ultilities/global'
import {SERVER_ERROR} from './server'
export const MINI_GAME_REQUEST = 'miniGame/MINI_GAME_REQUEST'
export const MINI_GAME_RESPONSE = 'miniGame/MINI_GAME_RESPONSE'
export const MINI_GAME_DETAIL_RESPONSE = 'miniGame/MINI_GAME_DETAIL_RESPONSE'

const initialState = {
	data: [],
	waiting: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case MINI_GAME_REQUEST:
			return {
				...state,
				waiting: true
			}
		case MINI_GAME_RESPONSE:
			return {
				...state,
				data: action.data,
				totalRecords: action.totalRecords,
				waiting: false
			}
		case MINI_GAME_DETAIL_RESPONSE:
			return {
				...state,
				dataDetail: action.data,
				totalRecords: action.totalRecords,
				waiting: false
			}
		default:
			return state
	}
}

export const getDataGame = (limit, offset) => {
	return dispatch => {
		dispatch({
			type: MINI_GAME_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/splayArticle?limit=" + limit + "&offset=" + offset;
		return axios.get(url).then(function (response) {
			dispatch({
				type: MINI_GAME_RESPONSE,
				data: response.data.dataArr,
				totalRecords: response.data.totalRecords
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}

export const getDataGameDetail = ( id) => {
	return dispatch => {
		dispatch({
			type: MINI_GAME_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/splayArticle";
		if (id !== undefined) {
			url += "?id=" + id;
		}
		return axios.get(url).then(function (response) {
			dispatch({
				type: MINI_GAME_DETAIL_RESPONSE,
				data: response.data.dataArr,
				totalRecords: response.data.totalRecords
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}