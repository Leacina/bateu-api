"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class ListResponse {
  constructor(items, page, pageSize, ignorePage) {
    this.hasNext = void 0;
    this.items = void 0;
    this.page = void 0;
    this.pageSize = void 0;
    this.size = void 0;
    this.page = page || 1;
    this.pageSize = pageSize || 10;
    this.hasNext = items.length > this.pageSize;

    if (items.length > 1 && this.hasNext && !ignorePage) {
      items.pop();
    }

    this.size = items.length;
    this.items = items;
  }

}

var _default = ListResponse;
exports.default = _default;