const rs = require("jsrsasign");
const base64url = require("base64url");

const makeDetachedJWS = (privateKey, body) => {
  const header = {
    alg: "RS256",
    typ: "JWT"
  };
  let jwt = rs.KJUR.jws.JWS.sign(null, header, body, privateKey);
  let splittedJWS = jwt.split(".");
  splittedJWS[1] = "";
  return splittedJWS.join(".");
};

const validateDetachedJWS = (detachedJWS, body, publicKey) => {
  let splitted_jws = detachedJWS.split(".");
  splitted_jws[1] = base64url(JSON.stringify(body));
  let jwt = splitted_jws.join(".");
  let isValid = rs.KJUR.jws.JWS.verify(jwt, publicKey, ["RS256"]);
  return isValid; // boolean
};

module.exports = {
  makeDetachedJWS,
  validateDetachedJWS
};
