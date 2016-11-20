import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import configureStore from './store'
import FinbarApp from './containers/FinbarApp'

import '!!style-loader!css-loader!./style/global.css'

const store = configureStore({})

function initDOM() {
	const div = document.createElement('div')
	div.setAttribute('id', 'root')
	document.body.appendChild(div)
	renderWithHotReload()
}

function renderWithHotReload() {
	render(
		<AppContainer>
			<Provider store={store}>
				<FinbarApp/>
			</Provider>
		</AppContainer>,
		document.getElementById('root')
	)
}

setTimeout(initDOM)

if (module.hot) {
  module.hot.accept('./containers/FinbarApp', () => {
    renderWithHotReload()
  })
}
