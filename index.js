import { PrismaClient } from "@prisma/client";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// Middleware para verificar se o usuário existe - checkUserExists
const checkUserExists = async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  req.user = user;
  next();
};

// Middleware de validação de campos obrigatórios - validateRequiredFields
const validateRequiredFields = async (req, res, next) => {
  const { name, email, age } = req.body;
  if (!name || !email || !age) {
    return res
      .status(400)
      .json({ error: "Fields (name, email, age) are mandatory" });
  }
  next();
};

// POST /users - Criar usuário
app.post("/users", validateRequiredFields, async (req, res) => {
  const newUser = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    },
  });
  res.status(201).json(newUser);
});

// GET /users - Listar todos os usuários
app.get("/users", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.status(200).json(allUsers);
});

// GET /users/:id - Listar usuário por ID
app.get("/users/:id", checkUserExists, (req, res) => {
  res.status(200).json(req.user);
});

// PUT /users/:id - Atualizar usuário por ID
app.put(
  "/users/:id",
  checkUserExists,
  validateRequiredFields,
  async (req, res) => {
    const updatedUser = await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
      },
    });
    res.status(200).json(updatedUser);
  }
);

// DELETE /users/:id - Deletar usuário por ID
app.delete("/users/:id", checkUserExists, async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ message: "Deleted user" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
