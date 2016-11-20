import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { pickElement } from '../util'
import {
	nodeDescriptions,
	nodeActions,
	advanceNode,
	logInteraction
} from '../reducers/story'
import {
	setLocationProperty,
	setVisitedFlag
} from '../reducers/location'
import {
	setPlayerProperty
} from '../reducers/player'

import ActionHolder from '../components/ActionHolder'
import InteractionLog from '../components/InteractionLog'

import styles from '../style/common.css'

class FinbarApp extends Component {
	componentDidMount() {
		this.commitNode(this.props)
	}

	shouldComponentUpdate(nextProps) {
		if (nextProps.nodeId !== this.props.nodeId) {
			this.commitNode(nextProps)
			return false
		}
		return true
	}

	render() {
		return (
			<div className={styles.finbarApp}>
				<div className={styles.feedbackArea}>
					<InteractionLog interactions={this.props.interactions}/>
					<ActionHolder
						actions={this.props.actions}
						onClick={(action) => this.onAction(action)}
					/>
				</div>
			</div>
		)
	}

	onAction(action) {
		if (action.feedback) {
			this.props.logInteraction(pickElement(action.feedback))
		}
		if (action.effects) {
			action.effects.forEach((effect) => {
				if (effect[0] === 'location') {
					this.props.setLocationProperty(...effect.slice(1))
				} else if (effect[0] === 'player') {
					this.props.setPlayerProperty(...effect.slice(1))
				}
			})
		}
		if (action.node) {
			this.props.advanceNode(action.node)
		}
	}

	commitNode(props) {
		this.props.setVisitedFlag(props.nodeId)
		props.descriptions.forEach((desc) => {
			this.props.logInteraction(desc)
		})
	}
}

FinbarApp.propTypes = {
	nodeId: PropTypes.string.isRequired,
	descriptions: PropTypes.arrayOf(PropTypes.string).isRequired,
	actions: PropTypes.arrayOf(PropTypes.object).isRequired,
	interactions: PropTypes.arrayOf(PropTypes.object).isRequired
}

function inject(state) {
	return {
		nodeId: state.story.nodeId,
		descriptions: nodeDescriptions(state) || [],
		actions: nodeActions(state) || [],
		interactions: state.story.interactions
	}
}

function bind(dispatch) {
	return bindActionCreators({
		advanceNode,
		logInteraction,
		setLocationProperty,
		setVisitedFlag,
		setPlayerProperty
	}, dispatch)
}

export default connect(inject, bind)(FinbarApp)
