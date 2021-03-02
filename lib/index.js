/**
 * @fileoverview Calculate the Assignment/Branch/Condition Size Metric
 * @author Paul Ignatenko
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = {
    abcsize: require('./rules/abcsize'),
}

module.exports.configs = {
    recommended: {
        rules: {
            "abcsize/abcsize": ["error", { max: 15 }]
        }
    }
}


// import processors
module.exports.processors = {

    // add your processors here
};

