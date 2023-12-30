const { Router } = require("express");
const router = Router();
const { Category, User, Question, Answer } = require("../db");




////===>ruta post para crear comentario para la pregunta
router.post("/Answer/post", async (req, res) => {
    try {
      const { Body, IdUser, QuestionId } = req.body;
      console.log(req.body);
  
      const user = await User.findByPk(IdUser);
  
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
  
      const question = await Question.findByPk(QuestionId);
  
      if (!question) {
        return res.status(401).json({ message: "Question not found" });
      }
  
      const newAnswer = await Answer.create({
        Body,
      });
  
      await newAnswer.setUser(user);
      await newAnswer.setQuestion(question);
  
      // Obtén todas las respuestas asociadas a la pregunta
      const answers = await Answer.findAll({
        where: {
          QuestionId: QuestionId,
        },
        include: [
          {
            model: User,
          },
        ],
      });
  
      // Devuelve solo la pregunta una vez con el arreglo de respuestas
      return res.status(200).json({
        message: "Create Answer",
        question: {
          ...question.toJSON(),
          Answers: answers,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error 500", error });
    }
  });

module.exports = router;
