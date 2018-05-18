/**
 * Copyright (c) 2017, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * ./SimpleList/src/Utils.js
 *
 * Some general helper functions.
 */
'use strict';

module.exports = class Utils {
  static getSampleMap(subj) {
    const map = new Map();
    if (subj.absolutePath) {
      if (subj.samples && subj.samples.length) {
        subj.samples.forEach((s) => {
          if (s.name && (typeof s.name === 'string')) {
            map.set(s.name.toLowerCase(), s);
          }
        });
      }

      if (subj.children && subj.children.length) {
        subj.children.forEach((child) => {
          const m = Utils.getSampleMap(child);
          m.forEach((value, key) => map.set(key, value));
        });
      }
    }

    return map;
  } // getSampleMap

  static getSortedMap(map) {
    const sorted = new Map();
    const sortedKeys = Array.from(map.keys()).sort();
    sortedKeys.forEach((key) => sorted.set(key, map.get(key)));
    return sorted;
  } // getSortedMap
} // module.exports
