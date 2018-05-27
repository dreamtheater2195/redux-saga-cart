import { takeLatest, actionChannel, put, take, takeEvery } from 'redux-saga/effects';
import { SET_SHIPPING_FETCH_STATUS, setCanCheckOut, FETCHED, FETCHING } from '../actions';

export function* checkOutAvailabilitySaga() {
    const checkoutAvailabilityChannel = yield actionChannel(SET_SHIPPING_FETCH_STATUS);
    while (true) {
        const { status } = yield take(checkoutAvailabilityChannel);
        yield put(setCanCheckOut(status === FETCHED));
    }
}
