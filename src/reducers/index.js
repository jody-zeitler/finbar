import { combineReducers } from 'redux'

import location from './location'

const combined = combineReducers({
	location
})

export {
	location,
	combined as default
}
