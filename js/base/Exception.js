export default class Exception {
  constructor(message, code, data = {}) {
    this._message = message;
    this._code = code;
    this._data = data;
  }

  get data() {
    return this._data;
  }
}
