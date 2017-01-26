"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Loaded = exports.Loaded = function Loaded(components) {
	return Object.keys(components).filter(function (key) {
		return !components[key];
	}).length < 1;
};