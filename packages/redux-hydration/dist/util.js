"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var diff = exports.diff = function diff(register, log) {
	return Object.keys(register).filter(function (k) {
		return !log.some(function (action) {
			return register[k].indexOf(action) >= 0;
		});
	});
};