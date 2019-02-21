import axios from 'axios'
import Ultilities from '../Ultilities/global'
import {SERVER_ERROR} from './server'
export const EVENT_REQUEST = 'event/EVENT_REQUEST'
export const EVENT_ACTION = 'event/EVENT_ACTION'
export const EVENT_GETLINK = 'event/EVENT_GETLINK'


const initialState = {
	data: [],
	waiting: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case EVENT_REQUEST:
			return {
				...state,
				waiting: true
			}
		case EVENT_ACTION:
			return {
				...state,
				data: action.data,
				waiting: false
			}
		case EVENT_GETLINK:
			return {
				...state,
				dataLink: action.data,
				waiting: false
			}
		default:
			return state
	}
}

export const changePoint = (scoinToken, eventGameId, giftValue) => {
	return dispatch => {
		dispatch({
			type: EVENT_REQUEST
		})
		var data = {
			"scoinToken": scoinToken,
			"eventGameId": eventGameId,
			"giftValue": giftValue
		}
		var url = Ultilities.base_url() + "/anonymous/event-game/exchange-gift";
		return axios.post(url, data).then(function (response) {
			dispatch({
				type: EVENT_ACTION,
				data: response.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}

export const getLink = (token) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": "bearer " + token,
		}
	}
	return dispatch => {
		dispatch({
			type: EVENT_REQUEST
		})
		var url = Ultilities.base_url() + "join-event";
		return axios.get(url, header).then(function (response) {
			dispatch({
				type: EVENT_GETLINK,
				data: response.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}