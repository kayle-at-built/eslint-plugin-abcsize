/**
 * @fileoverview Calculate the Assignment/Branch/Condition Size metric
 * @author Paul Ignatenko
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Calculate the Assignment/Branch/Condition Size metric",
            category: "Metrics",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            {
                "type": "object",
                "properties": {
                    "max": {
                        "type": "integer",
                        "default": "17"
                    }
                },
                "additionalProperties": false
            }
        ]
    },

    create: function(context) {
        const functions = new Map();
        const functionSet = new Set();

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------
        //
        const getNodeParentFunction = (node) => {
            const ancestors = context.getAncestors(node).reverse();
            return ancestors.find(a => functionSet.has(a));
        };

        const markFunction = (f) => {
            functionSet.add(f);
            functions.set(f, { branches: [], assignments: [], conditionals: [] });
        };


        const markAssignment = (a) => {
            const parentFunction = getNodeParentFunction(a);
            if (parentFunction && functionSet.has(parentFunction)) {
                functions.get(parentFunction).assignments.push(a);
            }
        };
        const markBranch = (b) => {
            const parentFunction = getNodeParentFunction(b);
            if (parentFunction && functionSet.has(parentFunction)) {
                functions.get(parentFunction).branches.push(b);
            }
        };

        const markConditional = (c) => {
            const parentFunction = getNodeParentFunction(c);
            if (parentFunction && functionSet.has(parentFunction)) {

                // Don't double count logical expressions nested in
                // IfStatements/etc
                if (c.type === 'LogicalExpression') {
                    if (c.parent && c.parent.type === 'IfStatement') {
                        return;
                    }

                    if (c.parent && c.parent.type === 'SwitchStatement') {
                        return;
                    }

                    if (c.parent && c.parent.type === 'ConditionalStatement') {
                        return;
                    }
                } else if (c.type === 'BinaryExpression') {
                    if (c.parent && c.parent.type === 'IfStatement') {
                        return;
                    }

                    if (c.parent && c.parent.type === 'LogicalExpression') {
                        return;
                    }

                    if (c.parent && c.parent.type === 'SwitchStatement') {
                        return;
                    }

                    if (c.parent && c.parent.type === 'ConditionalStatement') {
                        return;
                    }
                } 

                if (c.type === 'IfStatement') {
                    // Add extra conditional for else
                    if (c.alternate && c.alternate.type !== 'IfStatement') {
                        functions.get(parentFunction).conditionals.push(c);
                    }
                }

                if (c.type === 'TryStatemento') {
                    // Add extra conditional for catch
                    if (c.handler) {
                        functions.get(parentFunction).conditionals.push(c);
                    }
                }

                functions.get(parentFunction).conditionals.push(c);
            }
        };



        const calculateAbcSize = () => {
            const maxAbcSize = context.options[0].max;
            functions.forEach( (counts, f) => {
                const assignments = counts.assignments.length;
                const branches = counts.branches.length;
                const conditionals = counts.conditionals.length;

                const abcSize = Math.floor(Math.sqrt(Math.pow(assignments, 2) + Math.pow(branches, 2) + Math.pow(conditionals, 2)));

                if (abcSize > maxAbcSize) {
                    console.log(f);
                    context.report({
                        node: f,
                        message: `Function ABC Size ${abcSize} exceeds maximum ${maxAbcSize} (${assignments}/${branches}/${conditionals}).`
                    });
                }
            });
        };

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            ':function': markFunction,
            ':declaration': markAssignment,
            'AssignmentExpression': markAssignment,
            'UpdateExpression': markAssignment,
            'AssignmentExpression[operator = "||="]': markConditional,
            'AssignmentExpression[operator = "??="]': markConditional,
            'AssignmentExpression[operator = "&&="]': markConditional,
            'TryStatement': markConditional,
            'IfStatement': markConditional,
            'SwitchCase': markConditional,
            'CallExpression[callee.property.name = "catch"]': markConditional,
            'ConditionalExpression': markConditional,
            'LogicalExpression': markConditional,
            'BinaryExpression': markConditional,
            'CallExpression': markBranch,
            'NewExpression': markBranch,
            'Program:exit': calculateAbcSize
        };
    }
};
