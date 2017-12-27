import { GO_TO_NEXT_STEP, GO_TO_PREVIOUS_STEP, GO_TO_SPECIFIC_STEP } from '../actions/stepCounter';

export default function stepCounter(state = 0, action) {
	switch (action.type) {
		case GO_TO_NEXT_STEP:
			return state + 1;
		case GO_TO_PREVIOUS_STEP:
			return state - 1;
		case GO_TO_SPECIFIC_STEP:
			return action.step;
		default:
			return state;
	}
}