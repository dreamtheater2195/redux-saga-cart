import { fromJS } from 'immutable'
import { FETCHING, FETCHED } from './actions';
// TODO... finalize value list
export const defaultState = fromJS({
    canCheckOut: false,
    checkoutPhase: null,
    currentUser: null,
    customerServiceAvailability: false,
    isCheckingOut: false,
    cartItems: null,
    items: [],
    itemPrices: [],
    taxRates: [],
    shippingTotal: 0,
    itemQuantityFetchStatus: FETCHING,
    shippingCost: 0,
    shippingFetchStatus: FETCHING,
    taxRate: null
});