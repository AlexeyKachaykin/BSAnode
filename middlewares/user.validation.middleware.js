import { USER } from "../models/user.js";
import { userService } from "../services/userService.js"

const createUserValid = (req, res, next) => {
  const reEmail = /\S+@+\gmail\.\S+/;
  const rephoneNumber = /^\+380\d{3}\d{2}\d{2}\d{2}$/;
  const rePassword = /.{3,}/;

  const userValid = req.body


  if (
    (userValid &&
      userValid.firstName && typeof userValid.firstName === typeof USER.firstName &&
      userValid.lastName && typeof userValid.lastName === typeof USER.lastName &&
      userValid.email && reEmail.test(userValid.email) && typeof userValid.email === typeof USER.email &&
      userValid.phoneNumber && rephoneNumber.test(userValid.phoneNumber) && typeof userValid.phoneNumber === typeof USER.phoneNumber &&
      userValid.password && rePassword.test(userValid.password) && typeof userValid.password === typeof USER.password)
    && !userService.search({ phoneNumber: userValid.phoneNumber })
    && !userService.search({ email: userValid.email })
  ) {
    next()
  }
  else {
    return res.jsonError('Validation create user error');
  }


};

const updateUserValid = (req, res, next) => {

  const reEmail = /\S+@+\gmail\.\S+/;
  const rephoneNumber = /^\+380\d{3}\d{2}\d{2}\d{2}$/;
  const rePassword = /.{3,}/;
  const updateValid = req.body

  if (
    (updateValid && (
      (updateValid.firstName && typeof updateValid.firstName === typeof USER.firstName) ||
      (updateValid.lastName && typeof updateValid.lastName === typeof USER.lastName) ||
      (updateValid.email && reEmail.test(updateValid.email) && typeof updateValid.email === typeof USER.email && !userService.search({ email: updateValid.email })) ||
      (updateValid.phoneNumber && rephoneNumber.test(updateValid.phoneNumber) && typeof updateValid.phoneNumber === typeof USER.phoneNumber && !userService.search({ phoneNumber: updateValid.phoneNumber })) ||
      (updateValid.password && rePassword.test(updateValid.password) && typeof updateValid.password === typeof USER.password))

    )
  ) {
    next()
  }
  else {
    return res.jsonError('Validation update user error');
  }

};

export { createUserValid, updateUserValid };
