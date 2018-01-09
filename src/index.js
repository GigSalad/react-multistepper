import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getNextStep } from './selector';
import { addSteps } from './actions/steps';
import steps from './reducers/steps';
import stepCounter from './reducers/stepCounter';
import * as stepsActions from './actions/steps';
import * as stepCounterActions from './actions/stepCounter';

let mapStateToProps = function mapStateToProps(state) {
	return {
		nextStepIndex: getNextStep(state, state.stepCounter),
		stepCounter: state.stepCounter,
		steps: state.steps,
		stepObject: state.steps[state.stepCounter]
	}
};

let mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addSteps
	}, dispatch);
};


class Multistepper extends React.Component {
	componentDidMount() {
		if (this.props.initialSteps) {
			this.props.addSteps(this.props.initialSteps);
		}
	}
	render() {
		return (
			<div>
				{this.props.children(this.props.stepObject)}
			</div>
		);
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
	stepCounterActions
};