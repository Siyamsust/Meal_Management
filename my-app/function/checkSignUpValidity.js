export const isValidPhoneNumber = (phoneNumber, phoneInput) => {
  return true
    //return phoneInput.current?.isValidNumber(phoneNumber);
  };
  
  export const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };
  
  export const isValidPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    return true
   // return regex.test(password);
};

  
//   export default {
//     isValidEmail,
//     isValidPassword,
//     isValidPhoneNumber,
//   };
  