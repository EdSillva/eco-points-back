import { FastifyReply, FastifyRequest } from "fastify";
import { createSustainableActionValidate } from "../schemas/sustainableActionsValidates/createSustainableAction.validate.js";
import { sustainableActionService } from "../services/createSustainableAction.service.js";
import { verifyFirebaseToken } from "../utils/middleware/firebaseAuth.js";

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
}
