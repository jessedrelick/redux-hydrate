import { diff } from '../src/util'

describe('diff', () => {
	it('should return empty array when register is empty', () => {
		const
			REGISTER = {},
			LOG = ['TEST_CASE4']
		expect(diff(REGISTER, LOG))
		.toEqual([])
	}),

	it('should return all register keys when nothing has been logged', () => {
		const
			REGISTER = {
				TEST_CASE1: [],
				TEST_CASE2: [],
				TEST_CASE3: []
			},
			LOG = []
		expect(diff(REGISTER, LOG))
		.toEqual([
			'TEST_CASE1',
			'TEST_CASE2',
			'TEST_CASE3'
		])
	})

	it('should return all register keys when no matches have been made', () => {
		const
			REGISTER = {
				TEST_CASE1: ['TEST_SUCCESS1', 'TEST_FAIL1'],
				TEST_CASE2: ['TEST_SUCCESS2', 'TEST_FAIL2'],
				TEST_CASE3: ['TEST_SUCCESS3', 'TEST_FAIL3']
			},
			LOG = ['TEST_ANOTHER1', 'TEST_ANOTHER2', 'TEST_ANOTHER3', 'TEST_ANOTHER4']
		expect(diff(REGISTER, LOG))
		.toEqual([
			'TEST_CASE1',
			'TEST_CASE2',
			'TEST_CASE3'
		])
	})

	it('should filter out register keys that have resolvers that have been logged', () => {
		const
			REGISTER = {
				TEST_CASE1: ['TEST_SUCCESS1', 'TEST_FAIL1'],
				TEST_CASE2: ['TEST_SUCCESS2', 'TEST_FAIL2'],
				TEST_CASE3: ['TEST_SUCCESS3', 'TEST_FAIL3']
			},
			LOG = ['TEST_SUCCESS2', 'TEST_CASE4']
		expect(diff(REGISTER, LOG))
		.toEqual([
			'TEST_CASE1',
			'TEST_CASE3'
		])
	})

	it('should return empty array when all register keys have resolvers that have been logged', () => {
		const
			REGISTER = {
				TEST_CASE1: ['TEST_SUCCESS1', 'TEST_FAIL1'],
				TEST_CASE2: ['TEST_SUCCESS2', 'TEST_FAIL2'],
				TEST_CASE3: ['TEST_SUCCESS3', 'TEST_FAIL3']
			},
			LOG = ['TEST_SUCCESS1', 'TEST_FAIL2', 'TEST_SUCCESS3', 'TEST_FAIL4']
		expect(diff(REGISTER, LOG))
		.toEqual([])
	})
})
