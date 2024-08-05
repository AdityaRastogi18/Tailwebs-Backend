const customErrorFormatter = ({ msg }) => {
  console.log("msg", msg);
  return { msg: msg };
};

module.exports = { customErrorFormatter };
