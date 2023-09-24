const User = require("../models/userIGI");
const jwt = require("jsonwebtoken");

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: "", password: "" };
  
    // incorrect email
    if (err.message === "incorrect email") {
      errors.email = "That email is not registered";
    }
  
    // incorrect password
    if (err.message === "incorrect pubId") {
      errors.password = "That password is incorrect";
    }
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = "that email is already registered";
      return errors;
    }
  
    // validation errors
    if (err.message.includes("userIGI validation failed")) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  };
  
  // create json web token
  const maxAge = 3 * 24 * 60 * 60;
  const createToken = (id) => {
    return jwt.sign({ id }, "mysecret", {
      expiresIn: maxAge,
    });
  };


  module.exports.signup_post = async (req, res) => {
    console.log(req.body)
    const { instution, email, firstName, lastName, pubId,password,instutionName } = req.body;
  
    try {
    //   const player = await Player.create({});
      const user = await User.create({ instution,email,pubId,firstName,lastName,password,instution:instutionName});
      if (user){
        const token = createToken(pubId);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
  
      // console.log(user)
        console.log(res.cookie.jwt);
        res.status(201).json({ user: token });
      }
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).send({ errors });
    }
  
    // console.log(email, password);
    // res.send('new signup');
  };

  module.exports.login_post = async (req, res) => {
    const { email, pubId } = req.body;
    console.log(req.body);
    try {
      console.log(req.body);
      const user = await User.login(email, pubId);
      if (user) {
        const token = createToken(pubId);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: token });
      }
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
  };

  module.exports.logout_get = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });

    res.status(200).json({ msg: "token removed" });
  };