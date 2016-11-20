import { get, set, merge } from 'lodash/object'
import { isArray, isBoolean, isNumber, isString, isUndefined } from 'lodash/lang'

import { matchProperty } from '../util'

export const SET_LOCATION_PROPERTY    = 'finbar/location/SET_LOCATION_PROPERTY'
export const TOGGLE_LOCATION_PROPERTY = 'finbar/location/TOGGLE_LOCATION_PROPERTY'
export const MUTATE_LOCATION_PROPERTY = 'finbar/location/MUTATE_LOCATION_PROPERTY'

export const SET_VISITED_FLAG = 'finbar/location/SET_VISITED_FLAG'

const initialState = {
	_visited: {},
	bedroom: {
		lightsOn: false
	}
}

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
	case SET_LOCATION_PROPERTY: {
		const branch = set({}, action.key, action.value)
		return merge({}, state, branch)
	}
	case TOGGLE_LOCATION_PROPERTY: {
		const newValue = !get(state, action.key)
		const branch = set({}, action.key, newValue)
		return merge({}, state, branch)
	}
	case MUTATE_LOCATION_PROPERTY: {
		const oldValue = get(state, action.key)
		let newValue = action.value
		if (isArray(oldValue)) {
			newValue = oldValue.concat(action.value)
		} else if (isNumber(oldValue) && isNumber(action.value)) {
			newValue = oldValue + action.value
		}
		const branch = set({}, action.key, newValue)
		return merge({}, state, branch)
	}
	case SET_VISITED_FLAG: {
		const branch = set({}, `_visited.${action.nodeId}`, action.value)
		return merge({}, state, branch)
	}
	default:
		return state
	}
}

/* Selectors */

export const getLocationProperty = (state, key) => get(state.location, key)
export const matchLocationProperty = (state, key, cmp, value) => {
	return matchProperty(getLocationProperty(state, key), cmp, value)
}

/* Actions */

export function setLocationProperty(key, value) {
	return { type: SET_LOCATION_PROPERTY, key, value }
}

export function toggleLocationProperty(key) {
	return { type: TOGGLE_LOCATION_PROPERTY, key }
}

export function mutateLocationProperty(key, value) {
	return { type: MUTATE_LOCATION_PROPERTY, key }
}

export function setVisitedFlag(nodeId, value) {
	return { type: SET_VISITED_FLAG, nodeId, value: isBoolean(value) ? value : true }
}

/* Util */

export const nodeVisitedMatcher = (nodeId, bool) => ['location', `_visited.${nodeId}`, bool ? '?' : '!']
