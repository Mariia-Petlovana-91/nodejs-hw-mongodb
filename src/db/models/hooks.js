export const handleSaveError = (error, doc, next) => {
  error.status = 400;
  next(error);
};

export const setUpdateSettings = function (next) {
  if (!this.optins) {
    this.optins = {};
  }
  this.optins.new = true;
  this.optins.runValidators = true;
  next();
};
