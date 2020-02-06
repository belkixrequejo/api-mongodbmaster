const router = require("express").Router();
// Bring in the User Registration function
const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser
} = require("../clases/usuarios.controller");

// user Registeration Route
router.post("/register-user", async (req, res) => {
  await userRegister(req.body, "user", res);
});

//auditorio Registration Route
router.post("/register-auditorio", async (req, res) => {
  await userRegister(req.body, "auditorio", res);
});
// Super Admin Registration Route
router.post("/register-admin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});

// Super Admin Registration Route
router.post("/register-super-admin", async (req, res) => {
  await userRegister(req.body, "superadmin", res);
});

// User Login Route
router.post("/login-user", async (req, res) => {
  await userLogin(req.body, "user", res);
});

// Student Login Route
router.post("/login-auditorio", async (req, res) => {
  await userLogin(req.body, "auditorio", res);
});
//  Admin Login Route
router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});
// Super Admin Login Route
router.post("/login-super-admin", async (req, res) => {
  await userLogin(req.body, "superadmin", res);
});

// Profile Route
router.get("/profile", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});

// Users Protected Route
router.get(
  "/user-protectd",
  userAuth,
  checkRole(["user"]),
  async (req, res) => {
    return res.json("Hello user");
  }
);

// Admin Protected Route
router.get(
  "/auditorio-protectd",
  userAuth,
  checkRole(["auditorio"]),
  async (req, res) => {
    return res.json("Hello auditorio");
  }
);

//  Admin Protected Route
router.get(
  "/admin-protectd",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    return res.json("Hello Admin");
  }
);

// Super Admin Protected Route
router.get(
  "/super-admin-protectd",
  userAuth,
  checkRole(["superadmin"]),
  async (req, res) => {
    return res.json("Super admin");
  }
);

module.exports = router;


