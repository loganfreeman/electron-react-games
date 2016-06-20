import {List,Map,fromJS} from 'immutable';
import _ from 'underscore';

export {getRandomInt, makeArray, shuffleArray, makeArray2, cloneArray, removeElement, randomInt, listbits, partition, deepCopy}
function deepCopy(originalObject:any):any {
  return JSON.parse(JSON.stringify(originalObject));
}
function getRandomInt(min, max) {
  return Math.floor( Math.random() * ( max + 1 - min ) ) + min;
}

function randomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function partition(size, coll) {
  var res = [];
  for (var i = 0, l = coll.size || coll.length; i < l; i += size) {
    res.push(coll.slice(i, i + size));
  }
  return fromJS(res);
}

function makeArray(length, value) {
  return _.map(_.range(length), (val, key) => value);
}

function makeArray2(length, fn) {
  return _.map(_.range(length), (val, key) => fn());
}
function cloneArray(original) {
  return Array.prototype.slice.call(original);
}
function shuffleArray(original) {
  for (var i = 0; i < original.length; i++) {
    var j = i;
    while (j === i) {
      j = Math.floor(Math.random() * original.length);
    }
    var contents = original[i];
    original[i] = original[j];
    original[j] = contents;
  }
  return original;
}
function removeElement(array, from, to) {
  let rest = array.slice((to || from) + 1 || array.length);
  array.length = from < 0 ? array.length + from : from;
  return array.push.apply(array, rest);
}

// given a number, list its bits,
// for example, 24 is 11000 under base 2. it bits would be at [3, 4]. the rightmost bit index is 0.
// maximum bit index is 9.
// the maximum number in base 10 allowed is 511, which in base 2 is 111111111
function listbits(bits) {
  let list = [];
  for (let y = 0; y < 9; y++) {
    if ((bits & (1 << y)) !== 0) {
      list.push(y);
    }
  }

  return list;
}
