import { FIGHTER } from "../models/fighter.js";
import { fighterService } from "../services/fighterService.js"

const createFighterValid = (req, res, next) => {
  const fighterValid = req.body
  const rePower = /^[1-9]{1}$|^[1-9]{1}[0-9]{1}$|^100$/gm
  const reDefense = /^[1-9]{1}$|^10$/gm


  if ((fighterValid && fighterValid.name && typeof fighterValid.name === typeof FIGHTER.name &&
    fighterValid.power && typeof fighterValid.power === typeof FIGHTER.power && rePower.test(fighterValid.power) &&
    fighterValid.defense && typeof fighterValid.defense === typeof FIGHTER.defense && reDefense.test(fighterValid.defense)) &&
    !fighterService.search({ name: fighterValid.name })) {

    next()
  }
  else {

    return res.jsonError('Validation create fighter error');
  }
}

const updateFighterValid = (req, res, next) => {
  const rePower = /^[1-9]{1}$|^[1-9]{1}[0-9]{1}$|^100$/gm
  const reDefense = /^[1-9]{1}$|^10$/gm
  const fighterValid = req.body
  if (fighterValid &&
    ((fighterValid.name && typeof fighterValid.name === typeof FIGHTER.name && !fighterService.search({ name: fighterValid.name }) ||
      (fighterValid.power && typeof fighterValid.power === typeof FIGHTER.power && rePower.test(fighterValid.power)) ||
      (fighterValid.defense && typeof fighterValid.defense === typeof FIGHTER.defense && reDefense.test(fighterValid.defense)))
    )
  ) {
    next()
  }
  else {
    return res.jsonError('Validation update fighter error');
  }
};

export { createFighterValid, updateFighterValid };
