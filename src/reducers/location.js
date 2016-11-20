import { get, set, merge } from 'lodash/object'
import { isArray, isNumber, isString, isUndefined } from 'lodash/lang'

export const SET_LOCATION_PROPERTY    = 'finbar/location/SET_LOCATION_PROPERTY'
export const TOGGLE_LOCATION_PROPERTY = 'finbar/location/TOGGLE_LOCATION_PROPERTY'
export const MUTATE_LOCATION_PROPERTY = 'finbar/location/INCREMENT_LOCATION_PROPERTY'

const initialState = {
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
	default:
		return state
	}
}

/* Selectors */

export const getLocationProperty = (state, key) => get(state.location, key)
export const matchLocationProperty = (state, key, cmp, value) => {
	if (isUndefined(value) && cmp !== '!') {
		if (isString(cmp)) {
			value = cmp
		} else {
			value = true
		}
		cmp = '=='
	}
	const current = getLocationProperty(state, key)
	switch (cmp) {
	case '!':
		return !current
	case '==':
		return current === value
	case '!=':
		return current !== value
	default:
		return false
	}
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
