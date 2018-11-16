import base from './css/base'
import home from './css/home'
import addr from './css/addr'

let logo = require('./images/logo.png');
let img = new Image();
img.src = logo;
document.body.appendChild(img);


let str = 'hello test string : '
console.log(`----------${str} 666-----` )