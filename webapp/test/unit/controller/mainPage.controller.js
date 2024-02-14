/*global QUnit*/

sap.ui.define([
	"fioriwalk/controller/mainPage.controller"
], function (Controller) {
	"use strict";

	QUnit.module("mainPage Controller");

	QUnit.test("I should test the mainPage controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
