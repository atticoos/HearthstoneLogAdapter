'use strict';

class Handler {
  constructor(adapter, name, filters) {
    this.adapter = adapter;
    this.name = name;
    this.filters = filters;
    this.matcher = new RegExp(`(\\[${this.name}\\])`, 'g');
  }

  matches(line) {
    return this.matcher.test(line.toString());
  }

  handle(line) {
    return this.filters.filter((filter) => {
      return filter.pattern.test(line);
    }).forEach((filter) => {
      var matches = filter.pattern.exec(line);
      adapter.emit(filter.eventName, matches.slice(1, matches.length));
    });
  }
}

export default Handler;