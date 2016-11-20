import { get, set, merge } from 'lodash/object'
import { isString, isUndefined } from 'lodash/lang'

import { matchProperty } from '../util'

export const SET_PLAYER_PROPERTY = 'finbar/player/SET_PLAYER_PROPERTY'

const initialState = {
	// name: 'Wallis Finbar',
	// occupation: 'Car Deliveryman'
}

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
	case SET_PLAYER_PROPERTY: {
		const branch = set({}, action.key, action.value)
		return merge({}, state, branch)
	}
	default:
		return state
	}
}

/* Selectors */

export const getPlayerProperty = (state, key) => get(state.player, key)
export const matchPlayerProperty = (state, key, cmp, value) => {
	return matchProperty(getPlayerProperty(state, key), cmp, value)
}

/* Actions */

export function setPlayerProperty(key, value) {
	return { type: SET_PLAYER_PROPERTY, key, value }
}
