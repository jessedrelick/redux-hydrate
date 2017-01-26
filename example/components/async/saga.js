import { put, take } from 'redux-saga/effects'
import { delay } from 'redux-saga'

export default function* init() {
  while (true) {
    yield take('ASYNC_START')
    yield delay(2000)
    const data = 'I am an async component'
    yield put({ type: 'ASYNC_SUCCESS', data })
  }
}