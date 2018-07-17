import { setRequired, toggleValidationRule } from 'helpers';

import required from 'rules/required';
import email from 'rules/email';
import maxValue from 'rules/maxValue';
import minValue from 'rules/minValue';
import strLength from 'rules/strLength';

import { validator } from 'validator';

export {
  required,
  email,
  maxValue,
  minValue,
  strLength,
  validator,
  setRequired,
  toggleValidationRule };