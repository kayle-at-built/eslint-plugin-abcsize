/**
 * @fileoverview Calculate the Assignment/Branch/Condition Size metric
 * @author Paul Ignatenko
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const fs = require('fs');
var rule = require("../../../lib/rules/abcsize"),

    RuleTester = require("eslint").RuleTester;



const a0b0c0 = fs.readFileSync(`${__dirname}/../fixtures/a-0-b-0-c-0.js`, {encoding: 'utf8', flag: 'r'});
const a0b0c0Math = fs.readFileSync(`${__dirname}/../fixtures/a-0-b-0-c-0-math.js`, {encoding: 'utf8', flag: 'r'});
const a0b0c1if = fs.readFileSync(`${__dirname}/../fixtures/a-0-b-0-c-1-if.js`, {encoding: 'utf8', flag: 'r'});
const a0b0c2ifelse = fs.readFileSync(`${__dirname}/../fixtures/a-0-b-0-c-2-if-else.js`, {encoding: 'utf8', flag: 'r'});
const a0b0c21 = fs.readFileSync(`${__dirname}/../fixtures/a-0-b-1-c-21.js`, {encoding: 'utf8', flag: 'r'});
const a0b0c3ifelseifelse = fs.readFileSync(`${__dirname}/../fixtures/a-0-b-0-c-3-if-else-if-else.js`, {encoding: 'utf8', flag: 'r'});
const a0b1c0 = fs.readFileSync(`${__dirname}/../fixtures/a-0-b-1-c-0.js`, {encoding: 'utf8', flag: 'r'});
const a0b2c0 = fs.readFileSync(`${__dirname}/../fixtures/a-0-b-2-c-0.js`, {encoding: 'utf8', flag: 'r'});
const a0b3c0 = fs.readFileSync(`${__dirname}/../fixtures/a-0-b-3-c-0.js`, {encoding: 'utf8', flag: 'r'});
const a1b0c0 = fs.readFileSync(`${__dirname}/../fixtures/a-1-b-0-c-0.js`, {encoding: 'utf8', flag: 'r'});
const a1b1c1 = fs.readFileSync(`${__dirname}/../fixtures/a-1-b-1-c-1.js`, {encoding: 'utf8', flag: 'r'});
const a2b0c0 = fs.readFileSync(`${__dirname}/../fixtures/a-2-b-0-c-0.js`, {encoding: 'utf8', flag: 'r'});
const a3b0c0 = fs.readFileSync(`${__dirname}/../fixtures/a-3-b-0-c-0.js`, {encoding: 'utf8', flag: 'r'});
const a7b0c0 = fs.readFileSync(`${__dirname}/../fixtures/a-7-b-0-c-0.js`, {encoding: 'utf8', flag: 'r'});
const noFunctionContext = fs.readFileSync(`${__dirname}/../fixtures/no-function-context.js`, {encoding: 'utf8', flag: 'r'});
const nested = fs.readFileSync(`${__dirname}/../fixtures/nested.js`, {encoding: 'utf8', flag: 'r'});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({env: { es6: true }, parserOptions: {emcaVersion : 8}});
ruleTester.run("abcsize", rule, {

    valid: [
        {
            code: a0b0c0,
            options: [{max:0}]
        },
        {
            code: a0b0c0Math,
            options: [{max:0}]
        },
        {
            code: a0b0c1if,
            options: [{max:1}]
        },
        {
            code: a0b1c0,
            options: [{max:1}]
        },
        {
            code: a1b0c0,
            options: [{max:1}]
        },
        {
            code: noFunctionContext,
            options: [{max:1}]
        },
    ],

    invalid: [
        {
            code: a1b0c0,
            options: [{max:0}],
            errors: [{
                message: "Function ABC Size 1 exceeds maximum 0 (1/0/0).",
                type: "FunctionDeclaration"
            }]
        },
        {
            code: a2b0c0,
            options: [{max:0}],
            errors: [{
                message: "Function ABC Size 2 exceeds maximum 0 (2/0/0).",
                type: "FunctionDeclaration"
            }]
        },
        {
            code: a3b0c0,
            options: [{max:0}],
            errors: [{
                message: "Function ABC Size 3 exceeds maximum 0 (3/0/0).",
                type: "FunctionDeclaration"
            }]
        },
        {
            code: a7b0c0,
            options: [{max:0}],
            errors: [{
                message: "Function ABC Size 7 exceeds maximum 0 (7/0/0).",
                type: "FunctionDeclaration"
            }]
        },
        {
            code: a0b0c1if,
            options: [{max:0}],
            errors: [{
                message: "Function ABC Size 1 exceeds maximum 0 (0/0/1).",
                type: "FunctionDeclaration"
            }]
        },
        {
            code: a0b1c0,
            options: [{max:0}],
            errors: [{
                message: "Function ABC Size 1 exceeds maximum 0 (0/1/0).",
                type: "FunctionDeclaration"
            }]
        },
        {
            code: a0b2c0,
            options: [{max:0}],
            errors: [{
                message: "Function ABC Size 2 exceeds maximum 0 (0/2/0).",
                type: "FunctionDeclaration"
            }]
        },
        {
            code: a0b3c0,
            options: [{max:0}],
            errors: [{
                message: "Function ABC Size 3 exceeds maximum 0 (0/3/0).",
                type: "FunctionDeclaration"
            }]
        },
        {
            code: a0b0c2ifelse,
            options: [{max:0}],
            errors: [{
                message: "Function ABC Size 2 exceeds maximum 0 (0/0/2).",
                type: "FunctionDeclaration"
            }]
        },
        {
            code: a0b0c3ifelseifelse,
            options: [{max:0}],
            errors: [{
                message: "Function ABC Size 3 exceeds maximum 0 (0/0/3).",
                type: "FunctionDeclaration"
            }]
        },
        {
            code: a0b0c21,
            options: [{max:0}],
            errors: [{
                message: "Function ABC Size 21 exceeds maximum 0 (0/1/21).",
                type: "FunctionDeclaration"
            }]
        },
        {
            code: a1b1c1,
            options: [{max:0}],
            errors: [{
                message: "Function ABC Size 1 exceeds maximum 0 (1/1/1).",
                type: "FunctionDeclaration"
            }]
        },
        {
            code: nested,
            options: [{max:3}],
            errors: [{
                message: "Function ABC Size 5 exceeds maximum 3 (2/5/2).",
                type: "ArrowFunctionExpression"
            }]
        },

        {
            code: nested,
            options: [{max:1}],
            errors: [{
                message: "Function ABC Size 3 exceeds maximum 1 (1/2/3).",
                type: "FunctionDeclaration"
            }, {
                message: "Function ABC Size 5 exceeds maximum 1 (2/5/2).",
                type: "ArrowFunctionExpression"
            }]
        },
        {
            code: nested,
            options: [{max:0}],
            errors: [{
                message: "Function ABC Size 3 exceeds maximum 0 (1/2/3).",
                type: "FunctionDeclaration"
            }, {
                message: "Function ABC Size 5 exceeds maximum 0 (2/5/2).",
                type: "ArrowFunctionExpression"
            }, {
                message: "Function ABC Size 1 exceeds maximum 0 (0/1/0).",
                type: "FunctionExpression"
            }]
        },
    ]
});
