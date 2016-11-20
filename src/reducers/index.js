import { combineReducers } from 'redux'

import inventory from './inventory'
import location from './location'
import player from './player'
import story from './story'

const combined = combineReducers({
	inventory,
	location,
	player,
	story
})

export {
	inventory,
	location,
	player,
	story,
	combined as default
}
