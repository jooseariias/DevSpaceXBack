const { Router } = require("express");
const router = Router();
const { User, Question, Category, Answer } = require("../db");
const { Op } = require("sequelize");

////=======ruta get busqueda search de todas las preguntas
router.get("/Questions/search", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    // Realizar la búsqueda de preguntas por título
    const searchedQuestions = await Question.findAll({
      where: {
        Title: {
          [Op.iLike]: `%${query}%`, // Usa iLike para hacer la búsqueda case-insensitive
        },
      },
      include: [
        { model: Category },
        { model: User },
        {
          model: Answer,
          include: [
            {
              model: User,
            },
          ],
        },
      ],
    });

    return res.status(200).json({
      message: "Questions retrieved successfully",
      questions: searchedQuestions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to retrieve questions",
      error: error.message,
    });
  }
});

//////=====> Ruta get me trae la pregunta por id
router.get("/Questions/details/:id", async (req, res) => {
  try {
    const questionId = req.params.id;

    // Verificar si la pregunta existe
    const question = await Question.findByPk(questionId, {
      include: [
        { model: Category },
        { model: User },
        {
          model: Answer,
          include: [
            {
              model: User,
            },
          ],
        },
      ],
    });

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    return res.status(200).json({
      message: "Question details retrieved successfully",
      question: question,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to retrieve question details",
      error: error.message,
    });
  }
});

// /====> ruta Get de preguntas del usuario
router.get("/Questions/get/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Verificar si el usuario existe
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Obtener todas las preguntas asociadas al usuario
    const userQuestions = await Question.findAll({
      where: { UserId: userId },
      include: [
        { model: Category },
        { model: User },
        {
          model: Answer,
          include: [
            {
              model: User,
            },
          ],
        },
      ],
    });

    return res.status(200).json({
      message: "User's questions retrieved successfully",
      questions: userQuestions,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to retrieve questions", error: error.message });
  }
});

// Ruta GET para obtener preguntas con paginación y filtrado por categoría
router.get("/Questions/all", async (req, res) => {
  try {
    const { page = 1, pageSize = 10, category } = req.query;

    // Configurar opciones de paginación
    const offset = (page - 1) * pageSize;
    const limit = parseInt(pageSize, 10);

    // Configurar opciones de filtrado por categoría
    const categoryFilter = category ? { CategoryId: category } : {};

    // Obtener preguntas con paginación y filtrado por categoría
    const questions = await Question.findAndCountAll({
      where: categoryFilter,
      include: [
        { model: Category },
        { model: User },
        {
          model: Answer,
          include: [
            {
              model: User,
            },
          ],
        },
      ],
      offset,
      limit,
    });

    return res.status(200).json({
      message: "Questions retrieved successfully",
      totalQuestions: questions.count,
      totalPages: Math.ceil(questions.count / pageSize),
      currentPage: page,
      pageSize: limit,
      questions: questions.rows,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to retrieve questions",
      error: error.message,
    });
  }
});

///===>post Ruta para crear las Preguntas
router.post("/Questions/post", async (req, res) => {
  try {
    const { Title, Body, IdUser, IdCategories } = req.body;
    console.log(req.body);
    ///// Verificar si el usuario existe
    const user = await User.findByPk(IdUser);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    //// Crear la pregunta
    const newQuestion = await Question.create({
      Title,
      Body,
    });

    const categori = await Category.findByPk(IdCategories);
    await newQuestion.setCategory(categori); ////===>>> agrega la relacion de uno a uno

    const newUser = await User.findByPk(IdUser); ////===>>> agrega la relacion de uno a uno
    await newQuestion.setUser(newUser);

    return res.status(200).json({
      message: "Question created successfully",
      question: newQuestion,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Question failed", error: error.message });
  }
});

module.exports = router;
