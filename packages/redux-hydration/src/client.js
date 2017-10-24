export default (store) => {
	const
		state = store.getState(),
		{ hydrationReducer } = state

	if (hydrationReducer.timeout) {
		const { unresolved } = hydrationReducer
		unresolved.forEach(k => {
			store.dispatch({ type: k })
		})
	}
}
