
export const validateFirstName = (name) => /^[A-Za-z]{3,16}$/.test(name);
export const validateLastName = (name) => /^[A-Za-z]{3,16}$/.test(name);
export const validateMobile = (number) => /^05\d{8}$/.test(number);
export const validateEmail = (email) => /^[^\s@]+\@[^\s@]+\.[^\s@]+$/.test(email);
export const validatePass = (pass) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(pass);
export const validateCity = (city) => /^[A-Za-z\s]{3,}$/.test(city);
export const validateDate = (date) => date !== undefined;
