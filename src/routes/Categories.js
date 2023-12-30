const { Router } = require("express");
const router = Router();
const { Category } = require("../db");

///==>>>>>>> post para crear las categorias
router.post("/Categories/Post", async (req, res) => {
  try {
    const { Categorie } = req.body;
    let categories = await Category.findOne({ where: { Categorie } });

    if (categories) {
      return res.status(201).json({ message: "CATEGORY EXITEND" });
    }

    if (!categories) {
      categories = await Category.create({
        Categorie: Categorie,
      });
    }

    return res.status(200).json({ message: "CATEGORY CREATED CORRECTLY" });
  } catch (error) {
    console.error("error al crear la categoria ", error);
    res.status(500);
  }
});

///===>Delete borrar las categorias
router.delete("/Categories/delete/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: "CATEGORY NOT FOUND" });
    }

    // Elimina la categoría
    await Category.destroy({
      where: {
        id: categoryId,
      },
    });

    return res.status(200).json({ message: "CATEGORY DELETED" });
  } catch (error) {
    console.error("Error al eliminar la categoría", error);
    return res.status(500).send("INTERNAL SERVER ERROR");
  }
});

module.exports = router;
