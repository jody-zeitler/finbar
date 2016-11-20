import { sample } from 'lodash/collection'
import { isArray, isString, isUndefined } from 'lodash/lang'

export const pickElement = (array) => isArray(array) ? sample(array) : array

export const matchProperty = (stateValue, cmp, matchValue) => {
	if (isUndefined(matchValue) && cmp !== '!') {
		if (isString(cmp)) {
			matchValue = cmp
			cmp = '=='
		} else {
			cmp = '?'
		}
	}
	switch (cmp) {
	case '?':
		return !!stateValue
	case '!':
		return !stateValue
	case '==':
		return stateValue === matchValue
	case '!=':
		return stateValue !== matchValue
	default:
		return false
	}
}
