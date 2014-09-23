var moment = require('moment');
var CryptoJS = require('crypto-js')
/** Example code for calculating password digests - this code is NOT USED in the rest of this utility! */
/** Verify that the authenticationToken has a valid password digest by
 *  calculating the digest based on a base64-encoded, sha256 hash of the token's
 *  nonce, timestamp and the shared secret
 *
 * @param authenticationToken an associative array containing WSSE token attributes.  The attributes required to verify the token are "nonce", "timestamp" and "passwordDigest".
 * @param username
 * @param password
 * @return {boolean} whether the authenticationToken has a password digest matching the specified username and password
 */
function checkUserPasswordDigest(authenticationToken, username, password) {
  calculatedDigest = calculatePasswordDigest(authenticationToken.nonce, authenticationToken.timestamp, username, password);
  return calculatedDigest == authenticationToken.passwordDigest;
};

function calculateUserPasswordDigest(nonce, timestamp, username, password) {
  base = nonce + timestamp + getSecretForPasswordDigest(username, password);
  return CryptoJS.enc.Base64.stringify(CryptoJS.SHA256(base));
};

function calculateAdminPasswordDigest(nonce, timestamp, apiKey) {
  return CryptoJS.enc.Base64.stringify(CryptoJS.SHA256(nonce + timestamp + apiKey));
};

/** Generates "secret" for "checkPasswordDigest" based on specified username and password.
 *
 * @param username
 * @param password
 * @return {string} A string containing a SHA-1 hash of the user's password, with the username appended - e.g. the SHA-1 hash for password "test" is "a94a8fe5ccb19ba61c4c0873d391e987982fbbd3"; for username "someone@domain.com", the "secret" is "a94a8fe5ccb19ba61c4c0873d391e987982fbbd3someone@domain.com".
 */
function getSecretForPasswordDigest(username, password) {
  return CryptoJS.SHA1(password) + username;
};
/** End Example code for calculating password digests */
/**
* @param apiKey
* @param apiUsername
* @param apiAuthType 'user' or 'admin', indicates which type of WSSE token to create
* @param username if apiAuthType = 'user', used to generate token
* @return {boolean} whether the authenticationToken has a password digest matching the specified
*/
function getAuthenticationHeadersForWSSE(apiKey, apiUsername, apiAuthType, username, password) {
  var passwordDigest = '';
  var nonce = Math.floor(Math.random()*999999);
  var timestamp = moment().format("YYYY-MM-DDTHH:mm:ssZZ");//yyyy-MM-dd'T'HH:mm:ssZ

  if (apiAuthType == 'user') {
    passwordDigest = calculateUserPasswordDigest(nonce, timestamp, username, password);
  } else {
    passwordDigest = calculateAdminPasswordDigest(nonce, timestamp, apiKey);
  }
  var wsseToken = "UsernameToken Username=\"" + apiUsername + "\", ";
  wsseToken += "PasswordDigest=\"" + passwordDigest + "\", ";
  wsseToken += "Nonce=\"" + nonce + "\", ";
  wsseToken += "Created=\"" + timestamp + "\", ";
  if (apiAuthType == 'user') {
    wsseToken += "Type=\"person\", ";
    wsseToken += "Actor=\"" + username + "\"";
  }

  return {
   "X-WSSE" : wsseToken,
   "Authorization" : "WSSE profile=\"UsernameToken\""
  };
};

var express = require('express'),
    proxy = require('json-proxy');

var app = express(),
    logger = require('morgan'),
    favicon = require('serve-favicon')

//app.use(favicon(false));
app.use(logger('dev'));
app.use(proxy.initialize({
  proxy: {
    forward: {
        '/api/': 'http://odca.stage.volunteermatch.org'
    },
    headers: getAuthenticationHeadersForWSSE('a483313bf90678ae438c397171a5e00f', 'odca_site_1')
  }
}));
app.use(express.static(__dirname));

app.listen(process.env.PORT || 5001);
