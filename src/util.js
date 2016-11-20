import { sample } from 'lodash/collection'
import { isArray, isString } from 'lodash/lang'

export const pickElement = (array) => isArray(array) ? sample(array) : array
