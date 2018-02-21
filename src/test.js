import steps from './reducers/steps.js';

describe('ADD_STEPS', () => {
	let step = {
			component: 'FakeComponentString',
			conditional: (self) => self,
			errors: ['errorName']
	};

	test('add a step to an empty array of steps', () => {
		let expectedStepsArray = [
			Object.assign({}, step, {component: 'FakeComponentString'}),
		];
		expect(steps([], { type: 'ADD_STEPS', steps: step })).toEqual(expect.arrayContaining(expectedStepsArray));
	});

	test('add multiple steps to an empty array of steps', () => {
		let arrayOfSteps = [
			Object.assign({}, step, {component: 'FakeComponentString2'}),
			Object.assign({}, step, {component: 'FakeComponentString3'}),
			Object.assign({}, step, {component: 'FakeComponentString4'})
		];
		expect(steps([], {type: 'ADD_STEPS', steps: arrayOfSteps })).toEqual(expect.arrayContaining(arrayOfSteps));
	});

	test('add a step at index 2 of a non-empty array of steps', () => {
		let initialArrayOfSteps = [
			Object.assign({}, step, {component: 'FakeComponentString1'}),
			Object.assign({}, step, {component: 'FakeComponentString2'}),
			Object.assign({}, step, {component: 'FakeComponentString3'})
		];

		let expectedArrayOfSteps = [
			Object.assign({}, step, {component: 'FakeComponentString1'}),
			Object.assign({}, step, {component: 'FakeComponentString2'}),
			step,
			Object.assign({}, step, {component: 'FakeComponentString3'})
		];

		expect(steps(initialArrayOfSteps, {type: 'ADD_STEPS', steps: step, index: 2 })).toEqual(expect.arrayContaining(expectedArrayOfSteps));
	});

	test('add multiple steps at index 2 of a non-empty array of steps', () => {
		let initialArrayOfSteps = [
			Object.assign({}, step, {component: 'FakeComponentString1'}),
			Object.assign({}, step, {component: 'FakeComponentString2'}),
			Object.assign({}, step, {component: 'FakeComponentString3'})
		];

		let addArrayOfSteps = [
			Object.assign({}, step, {component: 'FakeComponentString4'}),
			Object.assign({}, step, {component: 'FakeComponentString5'}),
			Object.assign({}, step, {component: 'FakeComponentString6'})
		];

		let expectedArrayOfSteps = [
			Object.assign({}, step, {component: 'FakeComponentString1'}),
			Object.assign({}, step, {component: 'FakeComponentString2'}),
			Object.assign({}, step, {component: 'FakeComponentString4'}),
			Object.assign({}, step, {component: 'FakeComponentString5'}),
			Object.assign({}, step, {component: 'FakeComponentString6'}),
			Object.assign({}, step, {component: 'FakeComponentString3'})
		];

		expect(steps(initialArrayOfSteps, {type: 'ADD_STEPS', steps: addArrayOfSteps, index: 2 })).toMatchObject(expectedArrayOfSteps);
	});

	test('add a step at the end of a non-empty array of steps', () => {
		let initialArrayOfSteps = [
			Object.assign({}, step, {component: 'FakeComponentString1'}),
			Object.assign({}, step, {component: 'FakeComponentString2'}),
			Object.assign({}, step, {component: 'FakeComponentString3'})
		];

		let expectedArrayOfSteps = [
			Object.assign({}, step, {component: 'FakeComponentString1'}),
			Object.assign({}, step, {component: 'FakeComponentString2'}),
			step,
			Object.assign({}, step, {component: 'FakeComponentString3'})
		];

		expect(steps(initialArrayOfSteps, {type: 'ADD_STEPS', steps: step })).toEqual(expect.arrayContaining(expectedArrayOfSteps));
	});

	test('add multiple steps at the end of a non-empty array of steps', () => {
		let initialArrayOfSteps = [
			Object.assign({}, step, {component: 'FakeComponentString1'}),
			Object.assign({}, step, {component: 'FakeComponentString2'}),
			Object.assign({}, step, {component: 'FakeComponentString3'})
		];

		let addArrayOfSteps = [
			Object.assign({}, step, {component: 'FakeComponentString4'}),
			Object.assign({}, step, {component: 'FakeComponentString5'}),
			Object.assign({}, step, {component: 'FakeComponentString6'})
		];

		let expectedArrayOfSteps = [
			Object.assign({}, step, {component: 'FakeComponentString1'}),
			Object.assign({}, step, {component: 'FakeComponentString2'}),
			Object.assign({}, step, {component: 'FakeComponentString3'}),
			Object.assign({}, step, {component: 'FakeComponentString4'}),
			Object.assign({}, step, {component: 'FakeComponentString5'}),
			Object.assign({}, step, {component: 'FakeComponentString6'})
		];

		expect(steps(initialArrayOfSteps, {type: 'ADD_STEPS', steps: addArrayOfSteps })).toMatchObject(expectedArrayOfSteps);
	});
});

describe('REMOVE_STEPS_BY_TAG', () => {
	let initialArrayOfSteps = [
		{
				component: 'FakeComponentString1',
				conditional: '(self) => self',
				errors: ['errorName'],
				tags: [ 'odd', 'test1' ]
		},
		{
				component: 'FakeComponentString2',
				conditional: '(self) => self',
				errors: ['errorName'],
				tags: [ 'even', 'test1' ]
		},
		{
				component: 'FakeComponentString3',
				conditional: '(self) => self',
				errors: ['errorName'],
				tags: [ 'odd' ]
		},
		{
				component: 'FakeComponentString4',
				conditional: '(self) => self',
				errors: ['errorName'],
				tags: [ 'even' ]
		}
	];


	test('remove steps with the tag "even"', () => {
		// had to make conditional a string since REMOVE_STEPS_BY_TAG uses state.filter() which will create a new conditional function in memory and that confuses .toMatchObject()
		let expectedArrayOfSteps = [
			{
					component: 'FakeComponentString1',
					conditional: '(self) => self',
					errors: ['errorName'],
					tags: [ 'odd', 'test1' ]
			},
			{
					component: 'FakeComponentString3',
					conditional: '(self) => self',
					errors: ['errorName'],
					tags: [ 'odd' ]
			}
		];
		expect(steps(initialArrayOfSteps, { type: 'REMOVE_STEPS_BY_TAG', tag: 'even' })).toMatchObject(expectedArrayOfSteps);
	});

	test('attempt to remove steps with the tag "test2" when no steps are tagged as "test2"', () => {
		expect(steps(initialArrayOfSteps, { type: 'REMOVE_STEPS_BY_TAG', tag: 'test2' })).toMatchObject(initialArrayOfSteps);
	})
})

describe('REMOVE_STEP_ATTRIBUTE', () => {
	let initialArrayOfSteps = [
		{
				component: 'FakeComponentString1',
				conditional: '(self) => self',
				errors: ['errorName'],
				tags: [ 'odd', 'test1' ]
		},
		{
				component: 'FakeComponentString2',
				conditional: '(self) => self',
				errors: ['errorName'],
				tags: [ 'even', 'test1' ],
				beforeGoNextStep: 'testGoNextStep'
		},
		{
				component: 'FakeComponentString3',
				conditional: '(self) => self',
				errors: ['errorName'],
				tags: [ 'odd' ]
		},
		{
				component: 'FakeComponentString4',
				conditional: '(self) => self',
				errors: ['errorName'],
				tags: [ 'even' ]
		}
	];

	test('attempt to remove beforeGoNextStep from FakeComponentString2', () => {
		let expectedArrayOfSteps = [
			{
				component: 'FakeComponentString1',
				conditional: '(self) => self',
				errors: ['errorName'],
				tags: [ 'odd', 'test1' ]
			},
			{
				component: 'FakeComponentString2',
				conditional: '(self) => self',
				errors: ['errorName'],
				tags: [ 'even', 'test1' ]
			},
			{
				component: 'FakeComponentString3',
				conditional: '(self) => self',
				errors: ['errorName'],
				tags: [ 'odd' ]
			},
			{
				component: 'FakeComponentString4',
				conditional: '(self) => self',
				errors: ['errorName'],
				tags: [ 'even' ]
			}
		];
		expect(steps(initialArrayOfSteps, {type: 'REMOVE_STEP_ATTRIBUTE', index: 1, attributeName: 'beforeGoNextStep'})).toMatchObject(expectedArrayOfSteps);
	})
})

describe('ADD_STEP_ATTRIBUTE', () => {
	let initialArrayOfSteps = [
		{
				component: 'FakeComponentString1',
				conditional: '(self) => self',
				errors: ['errorName'],
				tags: [ 'odd', 'test1' ]
		},
		{
				component: 'FakeComponentString2',
				conditional: '(self) => self',
				errors: ['errorName'],
				tags: [ 'even', 'test1' ]
		},
		{
				component: 'FakeComponentString3',
				conditional: '(self) => self',
				errors: ['errorName'],
				tags: [ 'odd' ]
		},
		{
				component: 'FakeComponentString4',
				conditional: '(self) => self',
				errors: ['errorName'],
				tags: [ 'even' ]
		}
	];

	test('attempt to add beforeGoNextStep to FakeComponentString2', () => {
		let expectedArrayOfSteps = [
			{
				component: 'FakeComponentString1',
				conditional: '(self) => self',
				errors: ['errorName'],
				tags: [ 'odd', 'test1' ]
			},
			{
				component: 'FakeComponentString2',
				conditional: '(self) => self',
				errors: ['errorName'],
				tags: [ 'even', 'test1' ],
				beforeGoNextStep: 'testGoNextStep'
			},
			{
				component: 'FakeComponentString3',
				conditional: '(self) => self',
				errors: ['errorName'],
				tags: [ 'odd' ]
			},
			{
				component: 'FakeComponentString4',
				conditional: '(self) => self',
				errors: ['errorName'],
				tags: [ 'even' ]
			}
		];

		expect(steps(initialArrayOfSteps, {type: 'ADD_STEP_ATTRIBUTE', index: 1, attributeName: 'beforeGoNextStep', attributeValue: 'testGoNextStep'})).toMatchObject(expectedArrayOfSteps);
	})
})