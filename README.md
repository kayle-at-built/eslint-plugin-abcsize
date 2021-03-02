# eslint-plugin-abcsize

Calculate the Assignment/Branch/Condition Size Metric

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-abcsize`:

```
$ npm install eslint-plugin-abcsize --save-dev
```


## Usage

Add `abcsize` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "abcsize"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "abcsize/rule-name": 2
    }
}
```

You can also extend the recommended configuration which will raise errors when
the ABC Size of a function exceeds 15.

```json
{
  "extends": ["plugin:abcsize/recommended"]
}
```

## Supported Rules

* abcsize

    Validate against a maximum ABC size.
    - https://en.wikipedia.org/wiki/ABC_Software_Metric
    - https://wiki.c2.com/?AbcMetric





