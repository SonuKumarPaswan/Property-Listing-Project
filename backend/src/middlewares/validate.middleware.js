const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((e) => ({
      field:   e.path.join("."),
      message: e.message,
    }));
    return res.status(422).json({ success: false, errors });
  }
  next();
};

module.exports = validate;