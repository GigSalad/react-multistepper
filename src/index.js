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
	stepCounterActions,
	multistepperSelectors
};