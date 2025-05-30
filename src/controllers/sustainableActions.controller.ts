import { FastifyReply, FastifyRequest } from "fastify";
import { createSustainableActionValidate } from "../schemas/sustainableActionsValidates/createSustainableAction.validate.js";
import { sustainableActionService } from "../services/createSustainableAction.service.js";
import { verifyFirebaseToken } from "../utils/middleware/firebaseAuth.js";
import { z } from "zod";

const service = new sustainableActionService();

export class SustainableActionController {
    async createSustainableAction
        (request: FastifyRequest, reply: FastifyReply) {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return reply.status(401).send({ error: "Token de autenticação não enviado." });
        }

        const token = authHeader.split(" ")[1];

        let userId: string;

        try {
            const decoded = await verifyFirebaseToken(token);
            userId = decoded.uid;
        } catch (err) {
            return reply.status(401).send({ error: "Token inválido ou expirado." });
        }

        try {
            const validatedBody = createSustainableActionValidate.parse(request.body);
            const action = await service.insertSustainableAction(validatedBody, userId);

            return reply.status(201).send({
                message: "Ação sustentável registrada com sucesso.",
                action,
            });
        } catch (error: any) {
            if (error.name === "ZodError") {
                return reply.status(400).send({ error: "Erro de validação", issues: error.issues });
            }

            return reply.status(500).send({ error: "Erro interno", detail: error.message });
        }
    }

    async deleteSustainableAction(request: FastifyRequest, reply: FastifyReply) {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return reply.status(401).send({ error: "Token de autenticação não enviado." });
        }

        const token = authHeader.split(" ")[1];

        let userId: string;

        try {
            const decoded = await verifyFirebaseToken(token);
            userId = decoded.uid;
        } catch (err) {
            return reply.status(401).send({ error: "Token inválido ou expirado." });
        }

        const paramsSchema = z.object({
            id: z.string().uuid("ID inválido."),
        });

        let id: string;

        try {
            const params = paramsSchema.parse(request.params);
            id = params.id;
        } catch (error) {
            if (error instanceof z.ZodError) {
                return reply.status(400).send({
                    error: "Erro de validação",
                    issues: error.issues,
                });
            }
            return reply.status(500).send({
                error: "Erro desconhecido",
                detail: String(error),
            });
        }

        try {
            await service.deleteSustainableAction(id, userId);

            return reply.status(200).send({
                message: "Ação sustentável deletada com sucesso.",
            });
        } catch (error: any) {
            return reply.status(500).send({
                error: "Erro ao deletar a ação sustentável.",
                detail: error.message,
            });
        }
    }
}
