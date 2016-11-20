import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
	nodeActions,
	advanceNode,
	logFeedback
} from '../reducers/story'

import ActionHolder from '../components/ActionHolder'
import InteractionLog from '../components/InteractionLog'

import styles from '../style/common.css'

class FinbarApp extends Component {
	render() {
		return (
			<div className={styles.finbarApp}>
				<div className={styles.feedbackArea}>
					<InteractionLog interactions={this.props.interactions}/>
					<ActionHolder
						actions={this.props.actions}
						onFeedback={this.props.logFeedback}
						onAdvance={this.props.advanceNode}
					/>
				</div>
			</div>
		)
	}
}

FinbarApp.propTypes = {
	nodeId: PropTypes.string.isRequired,
	interactions: PropTypes.arrayOf(PropTypes.object).isRequired,
	actions: PropTypes.arrayOf(PropTypes.object)
}

function inject(state) {
	return {
		nodeId: state.story.nodeId,
		interactions: state.story.interactions,
		actions: nodeActions(state) || []
	}
}

function bind(dispatch) {
	return bindActionCreators({
		advanceNode,
		logFeedback
	}, dispatch)
}

export default connect(inject, bind)(FinbarApp)
