import { ADD_STEPS, REMOVE_STEPS_BY_TAG, REMOVE_STEP_ATTRIBUTE, ADD_STEP_ATTRIBUTE } from './actions';

export default function steps(state = [], action) {
	let newState = [];
	switch (action.type) {
		case REMOVE_STEP_ATTRIBUTE:
			newState = [...state.slice(0, action.index), step(state[action.index], action), ...state.slice(action.index + 1)];

			return newState;
		case ADD_STEP_ATTRIBUTE:
			newState = [...state.slice(0, action.index), step(state[action.index], action), ...state.slice(action.index + 1)];

			return newState;
		case ADD_STEPS:
			if (action.index > 0 && Array.isArray(action.steps)) {
				newState = [...state.slice(0, action.index), ...action.steps, ...state.slice(action.index)];
			} else if (action.index > 0 && Object.prototype.toString.call(action.steps)) {
				newState = [...state.slice(0, action.index), action.steps, ...state.slice(action.index)];
			} else if (Array.isArray(action.steps)) {
				newState = [...state, ...action.steps];
			} else {
				newState = [...state, action.steps];
			}

			return newState;
		case REMOVE_STEPS_BY_TAG:
			newState = state.filter((step) => {
				if (typeof step.tags !== 'undefined') {
					return !step.tags.includes(action.tag);
				} else {
					return true;
				}
			});

			return newState;
		default:
			return state;
	}
}

function step(state = {}, action) {
	let newState = {};
	switch(action.type) {
		case REMOVE_STEP_ATTRIBUTE:
			newState = Object.assign({}, state);
			delete newState[action.attributeName];

			return newState;
		case ADD_STEP_ATTRIBUTE:
			newState = Object.assign({}, state);
			newState[action.attributeName] = action.attributeValue;

			return newState;
		default:
			return state;
	}
}