import React, { PropTypes } from 'react'

const ActionHolder = (props) => {
	return (
		<div>
			{props.actions.map((action) => (
				<button
					key={action.text}
					onClick={() => props.onClick(action)}
					style={{ marginRight: 5 }}
				>
					{action.text}
				</button>
			))}
		</div>
	)
}

ActionHolder.propTypes = {
	actions: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string
	})),
	onClick: PropTypes.func.isRequired
}

export default ActionHolder
