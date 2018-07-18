# Hzob Validator

This package is a simple and lightweight object validation in node.js, react.js, angular or any other javascript project that uses es6 modules.

## Instalation

```
npm install hzob-validator --save
```


## First steps
It's really simple to get started, just import the `validator` function along with some rules, and you are ready to go!

```javascript
import { validator, required, minValue } from "hzob-validation";

const myData = {
  "name": "John Doe",
  "age": 16
};

  const rules = {
  "name": [required()],
  "age": [required(), minValue({value: 18, message: "You gotta be at least {value} years old!"})]
}

const result = validator(myData, rules);

console.log(result);
// result:
//   { "age": "You gotta be at least 18 years old!" }
```

## Rules

Most rules accept an object as an argument with some custom configuration:

### required

Parameter | Type | Description
----- | ----- | -----
message | string | The displayed error message
customEmpty | any, array<any> | custom value or an array of values that should be considered "empty"
onlyIf | function | A function that receives 2 parameters, the first one is the value of the equivalent key on the data object, the second is the whole data object, it should return a boolean value  that confirms if the required rule is applied

### strLength

Parameter | Type | Description
----- | ----- | -----
minValue | int | The min length allowed
maxValue | int | The max length allowed
minMessage | string | The displayed error message, it can contain ```{value}``` witch will be replaced by the min length expected
maxMessage | string | The displayed error message, it can contain ```{value}``` witch will be replaced by the max length expected

### minValue

Parameter | Type | Description
----- | ----- | -----
value | int | The minimal value allowed
message | string | The displayed error message, it can contain ```{value}``` witch will be replaced by the minimal value expected

### maxValue

Parameter | Type | Description
----- | ----- | -----
value | int | The max value allowed
message | string | The displayed error message, it can contain ```{value}``` witch will be replaced by the max value expected

### email

Parameter | Type | Description
----- | ----- | -----
message | string | The displayed error message