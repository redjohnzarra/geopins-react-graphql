const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

exports.findOrCreateUser = async token => {
  // verify auth token
  const googleUser = await verifyAuthToken(token);
  // check if the user exists
  const user = await checkIfUserExists(googleUser.email);
  // if user exists, return it; otherwise, create new user in db
  return user ? user : createNewUser(googleUser);
};

const verifyAuthToken = async token => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.OAUTH_CLIENT_ID,
    });

    return ticket.getPayload();
  } catch (err) {
    console.error('Error verifying auth token', error);
  }
};

const checkIfUserExists = async email => await User.findOne({ email }).exec(); // .exec() returns a promise

const createNewUser = googleUser => {
  const { name, email, picture } = googleUser;
  const user = { name, email, picture };

  console.log('creating new google user', googleUser);
  return new User(user).save(); // .save() persists in the database
};
