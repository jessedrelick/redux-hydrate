"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (store) {
	var state = store.getState(),
	    hydrationReducer = state.hydrationReducer;


	if (hydrationReducer.timeout) {
		var unresolved = hydrationReducer.unresolved;

		unresolved.forEach(function (k) {
			store.dispatch({ type: k });
		});
	}
};