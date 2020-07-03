"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const anyInvalidCharacter = queryPath => {
  if (queryPath.match(/[\/]{2,}/)) {
    return true;
  }

  return false;
}; // rule out moving up a folder


const anyInvalidPeriods = queryPath => {
  if (queryPath.match(/(\/\.\.\/)|(\/\.\.$)|(^\/\.\.$)|(^\.\.$)/)) {
    return true;
  }

  return false;
};

const validateInput = async queryPath => {
  let error = new Error();

  if (await anyInvalidCharacter(queryPath)) {
    console.log('good start');
    error.code = "INVCHAR";
    console.log(error);
    throw error;
  }

  if (await anyInvalidPeriods(queryPath)) {
    console.log('good bad');
    error.code = "INVPERIOD";
    throw error;
  }

  return true;
};

var _default = validateInput;
exports.default = _default;