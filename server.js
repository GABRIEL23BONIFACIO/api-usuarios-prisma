import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

// Criar usuário
app.post("/usuarios", async (req, res) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
      }
    })

    res.status(201).json(newUser)

  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário" })
  }
})

// Listar usuários
app.get("/usuarios", async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" })
  }
})

// Atualizar usuário
app.put("/usuarios/:id", async (req, res) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: {
        email: req.body.email,
        name: req.body.name,
      }
    })

    res.status(200).json(updatedUser)

  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar usuário" })
  }
})

app.listen(3000, () => {
  console.log("Servidor em http://localhost:3000")
})
