
export function getNextStep(state, currentStep) {
	if (typeof currentStep == 'undefined') {
		return getNextStep(state, -1);
	}
	if (typeof state.steps[currentStep + 1] === 'undefined') {
		return -1;
	}

	if (state.steps[currentStep + 1].conditional(state)) {
		return currentStep + 1;
	} else {
		return getNextStep(state, currentStep + 1);
	}
};

export function getPreviousStep(state, currentStep) {
	if (typeof currentStep == 'undefined' || currentStep < 0) {
		return getPreviousStep(state, 0);
	}
	if (typeof state.steps[currentStep - 1] === 'undefined') {
		return -1;
	}

	if (state.steps[currentStep - 1].conditional(state)) {
		return currentStep - 1;
	} else {
		return getPreviousStep(state, currentStep - 1);
	}
};