module.exports = (req) => {
  if (req.session.userId) return true;
  return false;
};
