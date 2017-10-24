import reducer from '../src/reducer'

const
	INITIAL_STATE = {
		initialized: false,
		ready: false,
		timeout: false,
		register: {},
		log: [],
		unresolved: []
	}

describe('hydration reducer', () => {
	it('should return initial state', () => {
		expect(reducer(INITIAL_STATE, { type: 'INIT' }))
		.toEqual(Object.assign({}, INITIAL_STATE, {
			log: ['INIT']
		}))
	})

	it('should register resolvers and an initializer', () => {
		const
			REGISTER = {
				type: 'HYDRATE_REGISTER',
				initializer: 'TEST_INITIALIZER',
				resolvers: ['TEST_SUCCESS', 'TEST_FAIL']
			}
		expect(reducer(INITIAL_STATE, REGISTER))
		.toEqual(Object.assign({}, INITIAL_STATE, {
			register: {
				[REGISTER.initializer]: REGISTER.resolvers
			}
		}))
	})

	it('should be ready when starting without resolvers', () => {
		const
			START = {
				type: 'HYDRATE_START'
			}
		expect(reducer(INITIAL_STATE, START))
		.toEqual(Object.assign({}, INITIAL_STATE, {
			initialized: true,
			ready: true
		}))
	})

	it('should not be ready when starting with unresolved resolvers', () => {
		const
			ACTION = {
				type: 'HYDRATE_START'
			},
			STATE = Object.assign({}, INITIAL_STATE, {
				register: {
					TEST_INITIALIZER: ['TEST_SUCCESS', 'TEST_FAIL']
				}
			})
		expect(reducer(STATE, ACTION))
		.toEqual(Object.assign({}, STATE, {
			initialized: true
		}))
	})

	it('should timeout', () => {
		const
			START = {
				type: 'HYDRATE_TIMEOUT'
			}
		expect(reducer(INITIAL_STATE, START))
		.toEqual(Object.assign({}, INITIAL_STATE, {
			timeout: true
		}))
	})

	it('should resolve', () => {
		const
			ACTION = {
				type: 'TEST_SUCCESS'
			},
			STATE = Object.assign({}, INITIAL_STATE, {
				initialized: true,
				register: {
					TEST_INITIALIZER: ['TEST_SUCCESS', 'TEST_FAIL']
				}
			})
		expect(reducer(STATE, ACTION))
		.toEqual(Object.assign({}, STATE, {
			ready: true,
			log: ['TEST_SUCCESS']
		}))
	})

	it('should know what is not resolved', () => {
		const
			ACTION = {
				type: 'TEST_ANOTHER'
			},
			STATE = Object.assign({}, INITIAL_STATE, {
				initialized: true,
				register: {
					TEST_INITIALIZER: ['TEST_SUCCESS', 'TEST_FAIL']
				}
			})
		expect(reducer(STATE, ACTION))
		.toEqual(Object.assign({}, STATE, {
			log: ['TEST_ANOTHER'],
			unresolved: ['TEST_INITIALIZER']
		}))
	})

	it('should return state when ready', () => {
		const
			ACTION = {
				type: 'TEST_SUCCESS'
			},
			STATE = Object.assign({}, INITIAL_STATE, {
				initialized: true,
				ready: true,
				register: {
					TEST_INITIALIZER: ['TEST_SUCCESS', 'TEST_FAIL'],
				},
				unresolved: ['TEST_INITIALIZER']
			})
		expect(reducer(STATE, ACTION))
		.toEqual(STATE)
	})
})
