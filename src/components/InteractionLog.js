import React, { PropTypes } from 'react'

import styles from '../style/common.css'

const InteractionLog = (props) => {
	const recent = props.interactions.slice(-10)
	return (
		<div>
			{recent.map((ia) => (
				<div key={ia.uid} className={styles.interactionItem}>{ia.text}</div>
			))}
		</div>
	)
}

InteractionLog.propTypes = {
	interactions: PropTypes.arrayOf(PropTypes.shape({
		uid: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired
	})).isRequired
}

export default InteractionLog
