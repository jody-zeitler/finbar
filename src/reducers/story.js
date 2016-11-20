import { sample } from 'lodash/collection'
import { isArray } from 'lodash/lang'
import { uniqueId } from 'lodash/util'

import reference from '../world/story.yaml'

export const ADVANCE_NODE    = 'finbar/story/ADVANCE_NODE'
export const LOG_FEEDBACK = 'finbar/story/LOG_FEEDBACK'

const MAX_INTERACTIONS = 50;

const pickElement = (array) => isArray(array) ? sample(array) : array
const idInteraction = (text) => ({
	uid: uniqueId(),
	text
})

const initialState = {
	nodeId: 'beginning',
	interactions: [
		idInteraction(pickElement(reference['beginning'].text))
	]
}

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
	case ADVANCE_NODE:
		const node = reference[action.nodeId]
		const text = pickElement(node.text)
		return Object.assign({}, state, {
			nodeId: action.nodeId,
			interactions: [...state.interactions, idInteraction(text)].slice(-MAX_INTERACTIONS)
		})
	case LOG_FEEDBACK:
		return Object.assign({}, state, {
			interactions: [...state.interactions, idInteraction(action.text)].slice(-MAX_INTERACTIONS)
		})
	default:
		return state
	}
}

/* Selectors */

export const node = (state) => reference[state.story.nodeId]
export const nodeActions = (state) => node(state).actions

/* Actions */

export function advanceNode(nodeId) {
	return { type: ADVANCE_NODE, nodeId }
}

export function logFeedback(text) {
	return { type: LOG_FEEDBACK, text }
}

/* Util */
