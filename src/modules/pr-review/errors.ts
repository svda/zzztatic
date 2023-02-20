class ActionError extends Error {
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, ActionError.prototype);
  }
}
