let Promise = require('es6-promise').Promise;
export const ADD_STEPS = 'ADD_STEPS';
export const REMOVE_STEPS_BY_TAG = 'REMOVE_STEPS_BY_TAG';
export const REMOVE_STEP_ATTRIBUTE = 'REMOVE_STEP_ATTRIBUTE';
export const ADD_STEP_ATTRIBUTE = 'ADD_STEP_ATTRIBUTE';


export function addSteps(steps = {}, index = 0)
{
	return {
		type: ADD_STEPS,
		steps: steps,
		index: index
	};
}

export function removeStepsByTag(tag = '') {
	return {
		type: REMOVE_STEPS_BY_TAG,
		tag: tag
	};
}

export function removeStepAttribute(attributeName = '', index = 0) {
	return {
		type: REMOVE_STEP_ATTRIBUTE,
		attributeName: attributeName,
		index: index
	};
}

export function addStepAttribute(attributeName = '', attributeValue = '', index = 0) {
	return {
		type: ADD_STEP_ATTRIBUTE,
		attributeName: attributeName,
		attributeValue: attributeValue,
		index: index
	};
}

export function moveStepAttribute(attributeName = '', sourceIndex = 0, destIndex = 1) {
	return (dispatch, getState) => {
		let state = getState();
		let attributeValue = '';
		if (state.steps[sourceIndex] && state.steps[destIndex]) {
			if (state.steps[sourceIndex][attributeName]) {
				attributeValue = state.steps[sourceIndex][attributeName];

				let addStepAttributePromise = Promise.resolve(dispatch(addStepAttribute(attributeName, attributeValue, destIndex)))

				let removeStepAttributePromise = addStepAttributePromise.then(
					() => Promise.resolve(dispatch(removeStepAttribute(attributeName, sourceIndex)))
				);

				return removeStepAttributePromise;
			}
		}

		return Promise.resolve();
	}
}

export function submitSteps(selector = (state) => state, endpointUrl = '') {
	return (dispatch, getState) => {
		let state = getState();
		if (!endpointUrl) {
			return Promise.resolve();
		}

		var data = new URLSearchParams();
		let requestData = selector(state);

		for (let item in requestData) {
			if (typeof requestData[item] !== 'undefined') {
				data.append(item, requestData[item]);
			}
		}

		let options = {
			method: 'POST',
			credentials: 'same-origin',
			headers: new Headers({
				'Accept': 'application/json',
			}),
			body: data
		}

		// calling fetch().json() returns a promise who's result will contain the returned JSON
		return fetch(endpointUrl, options).then((res) => res.json());
	}
}
