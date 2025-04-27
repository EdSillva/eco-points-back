import fastify from "fastify";
import { supabase } from "./supabaseConnection.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebaseConfig.js";

interface User {
  name: string;
  email: string;
}

const app = fastify();

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

app.get("/users", async (request, reply) => {
  try {
    const { data: users, error } = await supabase.from("usuarios").select("*");
    if (error) throw error;
    reply.status(200).send(users);
  } catch (error: any) {
    console.error("Erro ao listar usuários:", error.message);
    reply.status(500).send({ error: "Erro ao buscar usuários" });
  }
});

app.post("/users", { schema: userSchema }, async (request, reply) => {
  const { name, email } = request.body as User;
  try {
    const { data, error } = await supabase
      .from("usuarios")
      .insert([{ name, email }])
      .select();

    if (error) throw error;

    reply.status(201).send(data[0]);
  } catch (error: any) {
    console.error("Erro ao criar usuário:", error.message);
    reply.status(400).send({ error: error.message });
  }
});

app.get("/users/:id", async (request, reply) => {
  const { id } = request.params as { id: string };
  try {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    if (!data)
      return reply.status(404).send({ error: "Usuário não encontrado" });

    reply.status(200).send(data);
  } catch (error: any) {
    console.error("Erro ao buscar usuário:", error.message);
    reply.status(500).send({ error: error.message });
  }
});

app.put("/users/:id", async (request, reply) => {
  const { id } = request.params as { id: string };
  const { name, email } = request.body as User;

  try {
    const { data, error } = await supabase
      .from("usuarios")
      .update({ name, email })
      .eq("id", id)
      .select();

    if (error) throw error;
    if (!data?.length)
      return reply.status(404).send({ error: "Usuário não encontrado" });

    reply.status(200).send(data[0]);
  } catch (error: any) {
    console.error("Erro ao atualizar usuário:", error.message);
    reply.status(400).send({ error: error.message });
  }
});

app.delete("/users/:id", async (request, reply) => {
  const { id } = request.params as { id: string };

  try {
    const { error } = await supabase.from("usuarios").delete().eq("id", id);
    if (error) throw error;

    reply.status(204).send();
  } catch (error: any) {
    console.error("Erro ao deletar usuário:", error.message);
    reply.status(400).send({ error: error.message });
  }
});

app.post("/signup", async (request, reply) => {
  const { email, password } = request.body as {
    email: string;
    password: string;
  };
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    reply.status(201).send({
      message: "Usuário criado com sucesso!",
      user: { uid: user.uid, email: user.email },
    });
  } catch (error: any) {
    console.error("Erro ao criar usuário:", error.message);
    reply
      .status(400)
      .send({ error: "Erro ao criar usuário", details: error.message });
  }
});

app.post("/login", async (request, reply) => {
  const { email, password } = request.body as {
    email: string;
    password: string;
  };
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    reply.status(200).send({
      message: "Usuário logado com sucesso!",
      user: { uid: user.uid, email: user.email },
    });
  } catch (error: any) {
    console.error("Erro ao fazer login:", error.message);
    reply
      .status(400)
      .send({ error: "Erro ao fazer login", details: error.message });
  }
});

app.post("/logout", async (request, reply) => {
  try {
    await signOut(auth);
    reply.status(200).send({ message: "Usuário deslogado com sucesso!" });
  } catch (error: any) {
    console.error("Erro ao fazer logout:", error.message);
    reply
      .status(400)
      .send({ error: "Erro ao fazer logout", details: error.message });
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
