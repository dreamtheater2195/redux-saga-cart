import { takeLatest, call, put, select } from "redux-saga/effects";
import toastr from 'toastr';
import fetch from 'isomorphic-fetch';
import { currentUserSelector } from '../selectors';
import {
    INCREASE_ITEM_QUANTITY,
    DECREASE_ITEM_QUANTITY,
    setItemQuantityFetchStatus,
    decreaseItemQuantity,
    FETCHING, FETCHED
} from '../actions';

export function* handleIncreaseItemQuantity({ id }) {
    yield put(setItemQuantityFetchStatus(FETCHING));
    const user = yield select(currentUserSelector);
    const response = yield call(fetch, `http://localhost:8081/cart/add/${user.get('id')}/${id}`);
    console.log('Got response...', response);
    if (response.status !== 200) {
        yield put(decreaseItemQuantity(id, true));
        toastr.warning("Sorry, there weren't enough items in stock to complete your request");
    }

    yield put(setItemQuantityFetchStatus(FETCHED));
}

export function* handleDecreaseItemQuantity({ id, local }) {
    if (local) {
        return;
    }
    yield put(setItemQuantityFetchStatus(FETCHING));
    const user = yield select(currentUserSelector);
    const response = yield call(fetch, `http://localhost:8081/cart/remove/${user.get('id')}/${id}`);
    console.log('Got response...', response);
    if (response.status !== 200) {
        console.warn("Receive non-200 status:: ", response);
    }

    yield put(setItemQuantityFetchStatus(FETCHED));
}

export function* itemQuantitySaga() {
    yield [
        takeLatest(DECREASE_ITEM_QUANTITY, handleDecreaseItemQuantity),
        takeLatest(INCREASE_ITEM_QUANTITY, handleIncreaseItemQuantity)
    ]
}