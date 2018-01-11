import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addSteps } from './actions/steps';
import steps from './reducers/steps';
import stepCounter from './reducers/stepCounter';
import * as stepsActions from './actions/steps';
import * as stepCounterActions from './actions/stepCounter';
import * as multistepperSelectors from './selector';

let mapStateToProps = function mapStateToProps(state) {
	return {
		stepObject: state.steps[state.stepCounter],
		steps: state.steps,
		stepCounter: state.stepCounter,
		nextStepIndex: multistepperSelectors.getNextStep(state, state.stepCounter)
	}
};

let mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addSteps,
		goToSpecificStep: stepCounterActions.goToSpecificStep
	}, dispatch);
};


class Multistepper extends React.Component {
	componentDidMount() {
		if (this.props.initialSteps) {
			this.props.addSteps(this.props.initialSteps);
		} else if (this.props.steps.length && this.props.stepCounter === -1 && this.props.nextStepIndex !== -1) {
			this.props.goToSpecificStep(this.props.nextStepIndex);
		}
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.steps.length && this.props.steps.length && this.props.stepCounter === -1 && this.props.nextStepIndex !== -1) {
			this.props.goToSpecificStep(this.props.nextStepIndex);
		}
	}

	render() {

		if (typeof this.props.children !== 'function' || typeof this.props.stepObject !== 'undefined') {
			return (
				<div>
					{this.props.children(this.props.stepObject)}
				</div>
			);
		} else {
			return <div></div>;
		}
	}
}

Multistepper = connect(
	mapStateToProps,
	mapDispatchToProps
)(Multistepper);

// export default Multistepper;

module.exports = {
	Multistepper,
	steps,
	stepCounter,
	stepsActions,
	stepCounterActions,
	multistepperSelectors
};