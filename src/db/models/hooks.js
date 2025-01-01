export const handleSaveError = (error, doc, next) => {
  error.status(400);
  next();
};

export const setUpdateSettings = function (next) {
  this.optins.new = true;
  this.optins.runValidators = true;
  next();
};
