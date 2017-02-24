"use strict";

var makeCancelable = function makeCancelable(promise) {
  var hasCanceled_ = false;

  var wrappedPromise = new Promise(function (resolve, reject) {
    promise.then(function (val) {
      return hasCanceled_ ? reject({ isCanceled: true }) : resolve(val);
    }).catch(function (error) {
      return hasCanceled_ ? reject({ isCanceled: true }) : reject(error);
    });
  });
  wrappedPromise.cancel = wrappedPromise.cancel || function () {
    hasCanceled_ = true;
  };
  return wrappedPromise;
};

module.exports = makeCancelable;