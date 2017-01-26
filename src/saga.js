import { put, spawn, select, take } from 'redux-saga/effects'

// optional file, only needed if sagas are used
export default function* init() {
	let ready = false
	while (!ready) {
		yield take('*')
		const reducersReady = yield select(state => state.hydrationReducer.reducers.ready)
		const sagasLoaded = yield select(state => state.hydrationReducer.sagas.loaded)
		if (reducersReady && sagasLoaded) {
			const { sagas } = yield select(state => state.hydrationReducer.sagas)
			Object.keys(sagas).map((key) => {
				return spawn(sagas[key])
			})
			yield put({ type: 'HYDRATE_SAGA_READY' })
			ready = true
		}
	}
}