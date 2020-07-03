const anyInvalidCharacter = (queryPath) => {
  if (queryPath.match(/[\/]{2,}/)) {
    return true;
  }
  return false;
}

// rule out moving up a folder
const anyInvalidPeriods = (queryPath) => {
  if (queryPath.match(/(\/\.\.\/)|(\/\.\.$)|(^\/\.\.$)|(^\.\.$)/)) {
    return true;
  }
  return false;
}

const validateInput = async (queryPath) => {
  let error = new Error();

  if (await anyInvalidCharacter(queryPath)) {
    error.code = "INVCHAR";
    throw error;
  }

  if (await anyInvalidPeriods(queryPath)) {
    error.code = "INVPERIOD";
    throw error;
  }
  return true;
}

module.exports = validateInput;
// export default validateInput;