import React, { PropTypes } from 'react'

const ActionHolder = (props) => {
	return (
		<div>
			{props.actions.map((action) => (
				<button
					key={action.text}
					onClick={() => onClick(props, action)}
				>
					{action.text}
				</button>
			))}
		</div>
	)
}

const onClick = (props, action) => {
	if (action.feedback) {
		props.onFeedback(action.feedback)
	}
	if (action.node) {
		props.onAdvance(action.node)
	}
}

ActionHolder.propTypes = {
	actions: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string,
		feedback: PropTypes.string,
		node: PropTypes.string
	})),
	onFeedback: PropTypes.func.isRequired,
	onAdvance: PropTypes.func.isRequired
}

export default ActionHolder
