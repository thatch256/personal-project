const bcrypt = require("bcrypt");
const saltRounds = 12;

module.exports = {
  async login(req, res) {
    let { email, password } = req.body;
    const db = req.app.get("db");
    let [existingUser] = await db.get_user_by_email(email);
    if (!existingUser) return res.status(401).send("Email not found");
    let result = await bcrypt.compare(password, existingUser.password);
    let cartID = await db.get_user_cart_id(existingUser.id);
    if (!cartID) {
      cartID = await db.create_cart([existingUser.id, "cart"]);
    }
    let cartItems = await db.get_user_cart(existingUser.id);
    if (result) {
      req.session.user = {
        email: existingUser.email,
        id: existingUser.id,
        loggedIn: true,
        is_admin: existingUser.is_admin,
        user_cart_id: cartID,
        user_cart_items: cartItems
      };
      res.send(req.session.user);
    } else res.status(401).send("Email or password incorrect");
  },
  async register(req, res) {
    let { email, password, is_admin } = req.body;
    const db = req.app.get("db");
    let [existingUser] = await db.get_user_by_email(email);
    if (existingUser) return res.status(400).send("Email exists already");
    let salt = await bcrypt.genSalt(saltRounds);
    let hash = await bcrypt.hash(password, salt);
    let [user] = await db.create_user([is_admin, email, hash]);
    let cartID = await db.create_cart([user.id, "cart"]);
    req.session.user = {
      is_admin: user.is_admin,
      email: user.email,
      id: user.id,
      loggedIn: true,
      user_cart_id: cartID
    };

    res.send(req.session.user);
  },
  logout(req, res) {
    req.session.destroy();
    res.sendStatus(200);
  },
  getUser(req, res) {
    res.send(req.session.user);
  }
};
