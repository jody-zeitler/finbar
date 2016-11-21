import { isArray, isBoolean, isString } from 'lodash/lang'

import { matchLocationProperty, nodeVisitedMatcher } from './location'
import { matchPlayerProperty } from './player'
import { pickElement } from '../util'

import STORY from '../world/story.yaml'

export const ADVANCE_NODE    = 'finbar/story/ADVANCE_NODE'
export const LOG_INTERACTION = 'finbar/story/LOG_INTERACTION'

const INTERACTION_RETENTION = 50;

const initialState = {
	nodeId: 'bedroom_bunk',
	interactions: []
}

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
	case ADVANCE_NODE:
		return Object.assign({}, state, {
			nodeId: action.nodeId
		})
	case LOG_INTERACTION:
		return Object.assign({}, state, {
			interactions: [...state.interactions, idInteraction(action.text)].slice(-INTERACTION_RETENTION)
		})
	default:
		return state
	}
}

/* Selectors */

export const node = (state) => STORY[state.story.nodeId]
export const nodeDescriptions = (state) => {
	const nodeId = state.story.nodeId
	const descriptions = node(state).description || []
	if (isString(descriptions)) {
		return [descriptions]
	}
	return descriptions
		.filter((desc) => {
			const initial = isBoolean(desc.initial) ? [nodeVisitedMatcher(nodeId, !desc.initial)] : []
			return matchAllConditions(state, initial.concat(desc.conditions || []))
		})
		.map((desc) => desc.text || desc)
}
export const nodeActions = (state) => {
	const actions = node(state).actions || []
	return actions.filter((act) => matchAllConditions(state, act.conditions))
}

/* Actions */

export function advanceNode(nodeId) {
	return { type: ADVANCE_NODE, nodeId }
}

export function logInteraction(text) {
	return { type: LOG_INTERACTION, text }
}

/* Util */

let interactionId = 0;
const idInteraction = (text) => ({
	uid: ++interactionId,
	text
})
const matchOneCondition = (state, condition) => {
	const branch = condition[0]
	const args = condition.slice(1)
	switch (branch) {
	case 'location':
		return matchLocationProperty(state, ...args)
	case 'player':
		return matchPlayerProperty(state, ...args)
	default:
		return true
	}
}
const matchAllConditions = (state, conditions = []) => {
	const ors = conditions.or
	const ands = conditions.and || conditions
	if (isArray(ors) && !ors.some((c) => matchOneCondition(state, c))) {
		return false
	}
	if (isArray(ands) && !ands.every((c) => matchOneCondition(state, c))) {
		return false
	}
	return true
}

if (module.hot) {
  module.hot.accept('../world/story.yaml', () => {
  })
}
