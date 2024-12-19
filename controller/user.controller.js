const User = require("../model/user.model");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
  try {
    let user = await User.find();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ error: "Server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    let { id } = req.params;
    let user = await User.findById(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ error: "Server Error" });
  }
};

const createUser = async (req, res) => {
    try {
        let { username, email, password,role } = req.body;
        if (!username || !email || !password || !role) {
          return res.status(400).json({ error: "All fields are required" });
        } else {
          let { email } = req.body;
          let isExist = await User.findOne({ email: email });
          if (isExist) {
            return res.status(400).json({ error: "Email already exists" });
          } else {

            let hash = await bcrypt.hash(password,10)
            req.body.password = hash
            let user = await User.create(req.body);
            res.status(201).send(user);
          }
        }
      } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
      }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    console.log(req.body);
    
    let isExist = await User.findOne({ email: email });
    if (!isExist) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const isMatch = await bcrypt.compare(password,isExist.password)
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    res.cookie("id", isExist.id);
    return res.redirect("/foods");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const signupPage = async (req, res) => {
  res.render("signup");
};

const loginPage = async (req, res) => {
  res.render("login");
};

module.exports = {
  getUser,
  getUserById,
  createUser,
  login,
  signupPage,
  loginPage,
};
