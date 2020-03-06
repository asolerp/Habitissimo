/**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */

  const isValidEmail = (email) => {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
  };


  export {
    isValidEmail
  }