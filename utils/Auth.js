const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/user");
const { SECRET } = require("../config");

/**
 * @DESC To register the user by role
 */
const userRegisterbyRole = async (userDets, role, res) => {
  try {
    // Validate the username
    let usernameNotTaken = await validateUsername(userDets.username);
    if (!usernameNotTaken) {
      return res.status(400).json({
        message: "Le nom d'utilisateur est déjà pris.",
        success: false
      });
    }

    // validate the email
    let emailNotRegistered = await validateEmail(userDets.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: "L'addresse email est déjà enregistré.",
        success: false
      });
    }

    // Get the hashed password
    const password = await bcrypt.hash(userDets.password, 12);
    // create a new user
    const newUser = new User({
      ...userDets,
      password,
      passwordNotCrypted: userDets.password,
      role
    });

    await newUser.save();
    return res.status(201).json({
      message: "Votre compte est créé. Connectez-Vous maintenant.",
      success: true
    });
  } catch (err) {
    // Implement logger function (winston)
    return res.status(500).json({
      message: "Impossible de créer le compte.",
      success: false
    });
  }
};

/**
 * @DESC To register the user by role
 */
 const userRegister = async (userData, res) => {
  try {
    // Validate the username
    let usernameNotTaken = await validateUsername(userData.username);
    if (!usernameNotTaken) {
      return res.status(400).json({
        message: "Le nom d'utilisateur est déjà pris.",
        success: false
      });
    }

    // validate the email
    let emailNotRegistered = await validateEmail(userData.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: "L'addresse email est déjà enregistré.",
        success: false
      });
    }

    // Get the hashed password
    const password = await bcrypt.hash(userData.password, 12);
    // create a new user
    const newUser = new User({
      ...userData,
      password,
      passwordNotCrypted: userData.password
    });

    await newUser.save();
    return res.status(201).json({
      message: "Votre compte est créé. Connectez-Vous maintenant.",
      success: true
    });
  } catch (err) {
    // Implement logger function (winston)
    return console.log("ERREUR");
  }
};

/**
 * @DESC To ubdate the user.
 */
const userUpdate = async (userId, userData, res) => {
  console.log("DATA USER", userData);
  try {
    // Get the hashed password
    let password;
    if (userData.password) {
      password = await bcrypt.hash(userData.password, 12);
    }
    User.findOneAndUpdate({ _id: userId}, {
      $set: {
          name: userData.name,
          username: userData.username,
          email: userData.email,
          adress: userData.adress,
          password: password,
          passwordNotCrypted: userData.password
      }});
    return res.status(201).json({
      message: "Votre compte a été modifié. Connectez-Vous maintenant.",
      success: true
    });
  } catch (err) {
    console.log("ERREUR");
    console.log(err);
  }
};

/**
 * @DESC To Login the user
 */
const userLogin = async (userData, res) => {
  let { username, password, role } = userData;
  // First Check if the username is in the database
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({
      message: "Nom d'utilisateur n'a pas trouvé.",
      success: false
    });
  }
  
  // That means user is existing and trying to signin fro the right portal
  // Now check for the password
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // Sign in the token and issue it to the user
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        username: user.username,
        email: user.email
      },
      SECRET,
      { expiresIn: "7 days" }
    );

    let result = {
      username: user.username,
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168
    };

    return res.status(200).json({
      ...result,
      message: "Vous êtes maintenant connecté.",
      success: true
    });
  } else {
    return res.status(403).json({
      message: "Mot de passe incorrect.",
      success: false
    });
  }
};

const validateUsername = async username => {
  let user = await User.findOne({ username });
  return user ? false : true;
};

/**
 * @DESC Passport middleware
 */
const userAuth = passport.authenticate("jwt", { session: false });

/**
 * @DESC Check Role Middleware
 */
const checkRole = roles => (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).json("Non autorisé")
    : next();

const validateEmail = async email => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

const serializeUser = user => {
  return {
    username: user.username,
    email: user.email,
    name: user.name,
    _id: user._id,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt
  };
};

module.exports = {
  userAuth,
  checkRole,
  userLogin,
  userRegister,
  userRegisterbyRole,
  userUpdate,
  serializeUser
};
