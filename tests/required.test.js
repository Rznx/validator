import {
  validator,
  required,
  email,
  maxValue,
  minValue,
  strLength,
  setRequired } from '../src';

describe('Rules testing', () => {
  const data = {
    'name': 'John Doe',
    'age': 29,
    'email': 'john.doe@somecompany.com',
    'pets': [
      {name: 'Max', type: 'dog'},
      {name: 'Tom', type: 'cat'}
    ],
    'children': [],
    'political_alignment': undefined,
  };

  it('should give no errors', () => {
    const rules = {
      'name': [required()]
    };

    expect(validator(data, rules)).toBe(null);
  });

  it('should have a required error', () => {
    const rules = {
      'name': [required()],
      'political_alignment': [required()]
    };

    expect(validator(data, rules)).toHaveProperty('political_alignment');
  });

  it('should toggle required, and have no errors', () => {
    const rules = {
      'name': [required()],
      'political_alignment': [required()]
    };

    setRequired(false, 'political_alignment', rules);

    expect(validator(data, rules)).toBe(null);
  });

  it('should have a min value error', () => {
    const rules = {
      'name': [required()],
      'age': [minValue(30)]
    };

    expect(validator(data, rules)).toHaveProperty('age');
  });

  it('should give no errors on email', () => {
    const rules = {
      'email': [email()]
    };

    expect(validator(data, rules)).toBe(null);
  });

  it('should have a strlength error', () => {
    const rules = {
      'name': [strLength({minLength: 10, maxLength: 20})]
    };

    expect(validator(data, rules)).toHaveProperty('name');
  });
})