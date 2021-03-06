import { SET_CART_ITEMS, setItemDetails } from "../actions";
import { take, put, fork } from "redux-saga/effects";

export function* loadItemDetails(item) {
    const { id } = item;
    const response = yield fetch(`http://localhost:8081/items/${id}`);
    const data = yield response.json();
    const info = data[0];
    yield put(setItemDetails(info));
}

export function* itemDetailsSaga() {
    const { items } = yield take(SET_CART_ITEMS);
    console.log('Set cart items', items);
    yield items.map(item => fork(loadItemDetails, item));
}

