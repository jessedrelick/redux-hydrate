import { put, take, spawn } from 'redux-saga/effects'
import { delay } from 'redux-saga'

export default function* init() {
  yield [
    spawn(sync),
    spawn(async)
  ]
}

function* sync() {
  while (true) {
    yield take('SYNC_START')
    yield delay(5000)
    const data = 'I am a synchronous component'
    yield put({ type: 'SYNC_SUCCESS', data })
  }
}

function* async() {
  while (true) {
    yield take('ASYNC_START')
    yield delay(2000)
    const data = 'I am an async component'
    yield put({ type: 'ASYNC_SUCCESS', data })
  }
}