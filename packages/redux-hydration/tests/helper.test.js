import { createStore, combineReducers } from 'redux'
import helper from '../src/helper'
import hydrationReducer from '../src/reducer'

const
	STORE = createStore(combineReducers({
		hydrationReducer
	})),
	RENDER = jest.fn(),
	JSX = jest.fn(),
	PROPS = {},
	TIMEOUT = 1000,
	INITIAL_STATE = {
		initialized: false,
		ready: false,
		timeout: false,
		register: {},
		log: [],
		unresolved: []
	},
	TEST_REGISTER = { type: 'HYDRATE_REGISTER', initializer: 'TEST_INITIALIZER', resolvers: ['TEST_SUCCESS'] }

describe('server helper function', () => {
	it('should be provided a proper redux store', () => {
		expect(STORE.getState).toBeDefined()
		expect(STORE.subscribe).toBeDefined()
		expect(STORE.dispatch).toBeDefined()
	})

	it('should have a redux store with the hydration reducer', () => {
		expect(STORE.getState()).toEqual({
			hydrationReducer: Object.assign({}, INITIAL_STATE, {
				log: ['@@redux/INIT']
			})
		})
	})

	it('should return a new promise', () => {
		expect(helper(STORE, PROPS, RENDER, JSX, 1).then).toBeDefined()
	})

	it('should call render with jsx with store and props', (done) => {
		helper(STORE, PROPS, RENDER, JSX, TIMEOUT)
		.then(() => {
			expect(JSX).toBeCalledWith(STORE, PROPS)
			expect(RENDER).toBeCalled()
			done()
		})
	})

	it('should initialize and be ready after the start event when register is empty', (done) => {
		helper(STORE, PROPS, RENDER, JSX, TIMEOUT)
		.then((timeout) => {
			expect(STORE.getState()).toEqual({
				hydrationReducer: Object.assign({}, INITIAL_STATE, {
					initialized: true,
					ready: true,
					log: ['@@redux/INIT']
				})
			})
			expect(timeout).toBeUndefined()
			done()
		})
	})

	it('should initialize and not be ready after the start event when register is not empty', (done) => {
		STORE.dispatch(TEST_REGISTER)
		helper(STORE, PROPS, RENDER, JSX, TIMEOUT)
		.then((timeout) => {
			expect(STORE.getState()).toEqual({
				hydrationReducer: Object.assign({}, INITIAL_STATE, {
					initialized: true,
					log: ['@@redux/INIT'],
					register: {
						TEST_INITIALIZER: ['TEST_SUCCESS']
					},
					timeout: true,
					unresolved: ['TEST_INITIALIZER']
				})
			})
			expect(timeout).toBe(true)
			done()
		})
	})

	it.skip('should be ready when it resolves and does not timeout', (done) => {
		STORE.dispatch(TEST_REGISTER)
		helper(STORE, PROPS, RENDER, JSX, TIMEOUT)
		.then((timeout) => {
			expect(STORE.getState()).toEqual({
				hydrationReducer: Object.assign({}, INITIAL_STATE, {
					initialized: true,
					ready: true,
					log: ['@@redux/INIT', 'TEST_SUCCESS'],
					register: {
						TEST_INITIALIZER: ['TEST_SUCCESS']
					},
					timeout: false,
					unresolved: []
				})
			})
			expect(timeout).toBeUndefined()
			done()
		})
		STORE.dispatch({ type: 'TEST_SUCCESS' })
	})
})
