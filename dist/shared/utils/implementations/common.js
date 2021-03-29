"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FindFilters {
  constructor(search) {
    this.search = void 0;
    this.search = search;
  }

  findSearch(fieldname) {
    const search = this.search.find(value => value.startsWith(fieldname));
    return search ? search.split(':')[1] : '';
  }

}

exports.default = FindFilters;