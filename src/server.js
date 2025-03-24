import fastify from "fastify";
import { supabase } from "./supabaseConnection.js";

const app = fastify();

//Validação de dados usando Fastify Schema
const userSchema = {
  body: {
    type: "object",
    required: ["name", "email"],
    properties: {
      name: { type: "string", minLength: 3 },
      email: { type: "string", format: "email" },
    },
  },
};

//Listar todos os usuários
app.get("/users", async (request, reply) => {
  try {
    const { data: users, error } = await supabase.from("users").select("*");
    if (error) throw error;
    reply.status(200).send(users);
  } catch (error) {
    console.error("Erro ao listar usuários:", error.message);
    reply.status(500).send({ error: "Erro ao buscar usuários" });
  }
});

//Criar um novo usuário
app.post("/users", { schema: userSchema }, async (request, reply) => {
  try {
    const { name, email } = request.body;
    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email }])
      .select();

    if (error) throw error;

    reply.status(201).send(data[0]);
  } catch (error) {
    console.error("Erro ao criar usuário:", error.message);
    reply.status(400).send({ error: error.message });
  }
});

//Buscar usuário por ID
app.get("/users/:id", async (request, reply) => {
  const { id } = request.params;
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    if (!data)
      return reply.status(404).send({ error: "Usuário não encontrado" });

    reply.status(200).send(data);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error.message);
    reply.status(500).send({ error: error.message });
  }
});

//Atualizar usuário por ID
app.put("/users/:id", async (request, reply) => {
  const { id } = request.params;
  const { name, email } = request.body;

  try {
    const { data, error } = await supabase
      .from("users")
      .update({ name, email })
      .eq("id", id)
      .select();

    if (error) throw error;
    if (!data.length)
      return reply.status(404).send({ error: "Usuário não encontrado" });

    reply.status(200).send(data[0]);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error.message);
    reply.status(400).send({ error: error.message });
  }
});

//Deletar usuário por ID
app.delete("/users/:id", async (request, reply) => {
  const { id } = request.params;

  try {
    const { error } = await supabase.from("users").delete().eq("id", id);
    if (error) throw error;

    reply.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar usuário:", error.message);
    reply.status(400).send({ error: error.message });
  }
});

app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3335,
  })
  .then(() => {
    console.log("Servidor Rodando!!");
  });
