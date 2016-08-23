"use strict";

var exec = require("cordova/exec");

/**
 * The Cordova plugin ID for this plugin.
 */
var PLUGIN_ID = "BraintreePlugin";

/**
 * The plugin which will be exported and exposed in the global scope.
 */
var BraintreePlugin = {};

/**
 * Used to initialize the Braintree client.
 * 
 * The client must be initialized before other methods can be used.
 * 
 * @param {string} token - The client token or tokenization key to use with the Braintree client.
 * @param [function] successCallback - The success callback for this asynchronous function.
 * @param [function] failureCallback - The failure callback for this asynchronous function; receives an error string.
 */
BraintreePlugin.initialize = function initialize(token, successCallback, failureCallback) {

    if (!token || typeof(token) !== "string") {
        failureCallback("A non-null, non-empty string must be provided for the token parameter.");
        return;
    }

    exec(successCallback, failureCallback, PLUGIN_ID, "initialize", [token]);
};

/**
 * Shows Braintree's drop-in payment UI.
 * 
 * @param {object} options - The options used to control the drop-in payment UI.
 * @param [function] successCallback - The success callback for this asynchronous function; receives a result object.
 * @param [function] failureCallback - The failure callback for this asynchronous function; receives an error string.
 */
BraintreePlugin.presentDropInPaymentUI = function showDropInUI(options, successCallback, failureCallback) {

    if (!options) {
        options = {};
    }

    if (typeof(options.cancelText) !== "string") {
        options.cancelText = "Cancel";
    }

    if (typeof(options.title) !== "string") {
        options.title = "";
    };

    if (typeof(options.ctaText) !== "string") {
        options.ctaText = "Select Payment Method";
    };

    if (typeof(options.amount) !== "string") {
        options.amount = "";
    };

    if (typeof(options.primaryDescription) !== "string") {
        options.primaryDescription = "";
    };

    if (typeof(options.secondaryDescription) !== "string") {
        options.secondaryDescription = "";
    };

    var pluginOptions = [
        options.cancelText,
        options.title,
        options.ctaText,
        options.amount,
        options.primaryDescription,
        options.secondaryDescription
    ];

    exec(successCallback, failureCallback, PLUGIN_ID, "presentDropInPaymentUI", pluginOptions);
};

BraintreePlugin.canMakeApplePayments = function canMakeApplePayments(successCallback, failureCallback) {
    if(cordova.platformId !== "ios"){
        errorCallback('Only iOS can use apple pay')
    }
    exec(successCallback, failureCallback, PLUGIN_ID, "canMakeApplePayments");
};

BraintreePlugin.presentApplePayUI = function presentApplePayUI(options, successCallback, failureCallback) {
    if(cordova.platformId !== "ios"){
        errorCallback('Only iOS can use apple pay');
    }
    if(!options.merchantIdentifier || typeof(options.merchantIdentifier) !== 'string'){
        errorCallback('invalid merchantIdentifier');
    }
    options.countryCode = options.countryCode || 'US';
    if(typeof(options.countryCode) !== 'string'){
        errorCallback('invalid countryCode');
    }
    options.currencyCode = options.currencyCode || 'USD';
    if(typeof(options.currencyCode) !== 'string'){
        errorCallback('invalid currencyCode');
    }
    if(typeof(options.itemName) !== 'string'){
        errorCallback('invalid itemName');
    }
    if(typeof(options.price) !== 'string'){
        errorCallback('invalid price');
    }
    var pluginOptions = [
        options.merchantIdentifier,
        options.countryCode,
        options.currencyCode,
        options.itemName,
        options.price,
    ];
    exec(successCallback, failureCallback, PLUGIN_ID, "presentApplePayUI", pluginOptions);
};

module.exports = BraintreePlugin;
