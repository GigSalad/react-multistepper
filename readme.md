# Multistepper

The purpose of this is to abstract our step-by-step form logic into a reuseable React/Redux component.

## Actions/Reducers

### steps.js

These actionCreators initiate the adding, removing and altering steps contained in an array.

There is also a `submitSteps` function that uses [thunk](https://github.com/gaearon/redux-thunk) to return a javascript Promise.  This allows for async or sync handling of form submission.

### stepCounter.js

These actionCreators implment an incremental counter as well as a function that will set to the counter to the specified value.  This is used to indicate at what index of our steps array we are.

## Selector

[Selectors](https://gist.github.com/abhiaiyer91/aaf6e325cf7fc5fd5ebc70192a1fa170) are useful in cases where we have to format our Redux state in a certain way for multiple React components.

The selectors we use here are `getNextStep` and `getPreviousStep`.  These selectors return the index of the next or previous step, respectively.

## Structure of our array of steps

The state handled by the `steps.js` actions and reducer is an array of objects.  These objects can be structured however you
want but the examples here and how we will implment it on GS is like so...

```
[
	{
		component: (props) => (<p>Step 1</p>),
		conditional: (state) => state ? true : false
	},
	{
		component: ComponentThatWasImported,
		conditional: (state) => state ? true : false
	}
]
```

The only attribute that is tightly coupled to this structure is that `conditional` is a function that returns a boolean. `conditional` is used by the `getNextStep` and `getPreviousStep` selectors to determine if a step should be rendered or skipped.

And while it doesn't make much sense to use the `Multistepper` if your steps aren't going to do something with a component you technically could.  If you wanted to you could name your `component` attribute something else but that is similarly nonsensical.

## index.js

Let's start with an example of the use of our `Multistepper`.

```
import HelloWorld from 'hello-world.js';

class App extends Component {
  initialSteps = [
    {
      component: HelloWorld,
      conditional: () => true
    },
    {
      component: (props) => (<p>Step 2</p>),
      conditional: () => true
    }
  ]
  render() {
    return (
      <Multistepper initialSteps={this.initialSteps} >
        {
          (stepObject) => (
            stepObject ? <StepTemplate stepObject={stepObject} /> : <p>Loading...</p>
          )
        }
      </Multistepper>
    );
  }
}
```

We see here our `Multistepper` can take a prop of `initialSteps` which is an array of objects representing our steps. Also our `Multistepper` component expects to receive `children` in the form of a function.

`Multistepper` is a ["Function as Child Component"](https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9). For now, the only thing `Multistepper` does is figure out what the current step object is and passes that `stepObject` to its children. It is up to the user of the `Multistepper` component to determine what is done with the `stepObject`.

In our example we have a `StepTemplate` that takes the `stepObject` and expects it to have a `component` attribute that it will render amongst some other markup.

```
import React, { Component } from 'react';
import NextButton from '../buttons/next.js';

class StepTemplate extends Component {
  render() {
    let StepComponent = this.props.stepObject.component;

    return (
      <div className="App">
        <div className="App-intro">
          <StepComponent />
        </div>
        <NextButton buttonText="Next" />
      </div>
    );
  }
}

export default StepTemplate;
```

## Navigation

In this example we aren't handling anything other than going to the next step who's conditional returns true.  This is handled by the `NextButton` component.

```
import { getNextStep } from '../../multistepper/selector';
import { goToSpecificStep } from '../../multistepper/actions/stepCounter';

let mapStateToProps = function mapStateToProps(state) {
  return {
    nextStepIndex: getNextStep(state, state.stepCounter)
  }
};

let mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    goToSpecificStep
  }, dispatch);
};


class NextButton extends Component {
  handleClick = (event) => {
    event.preventDefault();
    this.props.goToSpecificStep(this.props.nextStepIndex);
  }
  render() {
    return (
      <button onClick={this.handleClick}>{this.props.buttonText}</button>
    );
  }
}

NextButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(NextButton);

export default NextButton;
```