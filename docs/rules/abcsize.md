# Calculate the Assignment/Branch/Condition Size metric (abcsize)

## Rule Details

This rule aims to validate declared functions against the ABC Size metric.

Given a Max ABC Size of 2
Examples of **incorrect** code for this rule:

```js

function a0b0c3() {
  if (null === null) {
    return true;
  } else if (null == undefined) {
    return true;
  } else {
    return false;
  }
}

```

Examples of **correct** code for this rule:

```js

function a0b0c1() {
  if (null === null) {
    return true;
  }
}

```

### Options

 - max
    - default: 15 
    - Value is computed by `sqrt(assignments^2 + branches ^2 + conditionals)`


## When Not To Use It

When you don't want to check against code complexity / size;

## Further Reading

 - https://wiki.c2.com/?AbcMetric
 - https://en.wikipedia.org/wiki/ABC_Software_Metric

