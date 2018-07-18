import {
  validator,
  required,
  email,
  maxValue,
  minValue,
  strLength,
  setRequired } from '../src';

const testData = {
  'name': 'John Doe',
  'age': 29,
  'email': 'john.doe@somecompany.com',
  'pets': [
    {name: 'Max', type: 'dog'},
    {name: 'Tom', type: 'cat'}
  ],
  'children': [],
  'favorite_food': undefined,
};

describe('Rules testing', () => {
  it('should give no errors', () => {
    const rules = {
      'name': [required()]
    };

    expect(validator(testData, rules)).toBe(null);
  });

  it('should have a required error', () => {
    const rules = {
      'name': [required()],
      'favorite_food': [required()]
    };

    expect(validator(testData, rules)).toHaveProperty('favorite_food');
  });

  it('should toggle required, and have no errors', () => {
    const rules = {
      'name': [required()],
      'favorite_food': [required()]
    };

    setRequired(false, 'favorite_food', rules);

    expect(validator(testData, rules)).toBe(null);
  });

  it('should respect the required "customEmpty" configuration', () => {
    const rules = {
      'name': [required({customEmpty: 'John Doe'})],
      'email': [required({customEmpty: 'fake@email.net'})]
    };

    expect(validator(testData, rules)).toMatchObject({
      'name': expect.anything(),
    });
  });

  it('should have a min value error', () => {
    const rules = {
      'name': [required()],
      'age': [minValue(30)]
    };

    expect(validator(testData, rules)).toHaveProperty('age');
  });

  it('should give no errors on email', () => {
    const rules = {
      'email': [email()]
    };

    expect(validator(testData, rules)).toBe(null);
  });

  it('should have a strlength error', () => {
    const rules = {
      'name': [strLength({minLength: 10, maxLength: 20})]
    };

    expect(validator(testData, rules)).toHaveProperty('name');
  });
})