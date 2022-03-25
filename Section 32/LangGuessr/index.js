
// const franc = require('franc');
// const langs = require("langs");
// const colors = require('colors');
// const input = process.argv[2];

import franc from 'franc'
import langs from 'langs'
import colors from "colors"
const input = process.argv[2];

const landCode = franc(input);
if (landCode === 'und') {
    console.log("Sorry,couldn't figure it out!".red);
} else {
    const language = langs.where("3", langCode);
    console.log(`Our best guess is:${language}`.green)

}



