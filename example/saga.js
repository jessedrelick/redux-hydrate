import { put, take } from 'redux-saga/effects'
import { delay } from 'redux-saga'

export default function* init() {
  while (true) {
    yield take('ASYNC_START')
    yield delay(5000)
    const data = 'I am async data'
    yield put({ type: 'ASYNC_SUCCESS', data })
  }
}
