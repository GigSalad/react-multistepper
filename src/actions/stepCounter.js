export const GO_TO_NEXT_STEP = 'GO_TO_NEXT_STEP';
export const GO_TO_PREVIOUS_STEP = 'GO_TO_PREVIOUS_STEP';
export const GO_TO_SPECIFIC_STEP = 'GO_TO_SPECIFIC_STEP';

export function goToNextStep() {
	return {
		type: GO_TO_NEXT_STEP
	};
}

export function goToPreviousStep() {
	return {
		type: GO_TO_PREVIOUS_STEP
	};
}

export function goToSpecificStep(step) {
	return {
		type: GO_TO_SPECIFIC_STEP,
		step: step
	}
}