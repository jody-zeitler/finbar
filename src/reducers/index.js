import { combineReducers } from 'redux'

import location from './location'
import story from './story'

const combined = combineReducers({
	location,
	story
})

export {
	location,
	story,
	combined as default
}
