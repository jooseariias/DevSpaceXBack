const { Router } = require("express");
const router = Router();
const { User } = require("../db");
const jwt = require("jsonwebtoken");

router.get("/auth/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Buscar el usuario por ID en la base de datos
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Devolver la información del usuario
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/// se crean los usuario por google
router.post("/auth/google", async (req, res) => {
  try {
    const { token } = req.body;

    const decodedToken = jwt.decode(token); ///====> desencripto el token que viene desde el front

    const { given_name, picture, email } = decodedToken;

    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({
        NombreUsuario: given_name,
        email,
        imagen: picture,
        Description: given_name,
      });
    }

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
