import { createSustainableActionValidate } from "../schemas/sustainableActionsValidates/createSustainableAction.validate.js";
import { SustainableActionService } from "../services/sustainableAction.service.js";
import { verifyFirebaseToken } from "../utils/middleware/firebaseAuth.js";
import { z } from "zod";
import { updateSustainableActionParamsSchema, updateSustainableActionSchema, } from "../schemas/sustainableActionsValidates/updateSustainableAction.validate.js";
import { UserPointsRepository } from "../repositories/userPoints.repository.js";
const service = new SustainableActionService();
const userPointRepository = new UserPointsRepository();
export class SustainableActionController {
    async createSustainableAction(request, reply) {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return reply
                .status(401)
                .send({ error: "Token de autenticação não enviado." });
        }
        const token = authHeader.split(" ")[1];
        let userId;
        try {
            const decoded = await verifyFirebaseToken(token);
            userId = decoded.uid;
        }
        catch (err) {
            return reply.status(401).send({ error: "Token inválido ou expirado." });
        }
        try {
            const validatedBody = createSustainableActionValidate.parse(request.body);
            const action = await service.insertSustainableAction(validatedBody, userId);
            return reply.status(201).send({
                message: "Ação sustentável registrada com sucesso.",
                action,
            });
        }
        catch (error) {
            if (error.name === "ZodError") {
                return reply
                    .status(400)
                    .send({ error: "Erro de validação", issues: error.issues });
            }
            return reply
                .status(500)
                .send({ error: "Erro interno", detail: error.message });
        }
    }
    async getUserSustainableActions(request, reply) {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return reply
                .status(401)
                .send({ error: "Token de autenticação não enviado." });
        }
        try {
            const token = authHeader.split(" ")[1];
            const decoded = await verifyFirebaseToken(token);
            const userId = decoded.uid;
            const data = await service.getUserSustainableActions(userId);
            return reply.status(200).send(data);
        }
        catch (error) {
            return reply.status(401).send({ error: String(error) });
        }
    }
    async updateSustainableAction(request, reply) {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return reply
                .status(401)
                .send({ error: "Token de autenticação não enviado." });
        }
        try {
            const token = authHeader.split(" ")[1];
            const decoded = await verifyFirebaseToken(token);
            const userId = decoded.uid;
            const validatedBody = updateSustainableActionSchema.parse(request.body);
            const validatedParams = updateSustainableActionParamsSchema.parse(request.params);
            const data = await service.updateSustainableAction(validatedParams.id, validatedBody, userId);
            return reply.status(200).send({
                message: "Ação sustentável atualizada com sucesso.",
                action: data,
            });
        }
        catch (error) {
            if (error instanceof Error && "issues" in error) {
                return reply
                    .status(400)
                    .send({ error: "Erro de validação", issues: error.issues });
            }
            return reply.status(500).send({ error: String(error) });
        }
    }
    async deleteSustainableAction(request, reply) {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return reply
                .status(401)
                .send({ error: "Token de autenticação não enviado." });
        }
        const token = authHeader.split(" ")[1];
        let userId;
        try {
            const decoded = await verifyFirebaseToken(token);
            userId = decoded.uid;
        }
        catch (err) {
            return reply.status(401).send({ error: "Token inválido ou expirado." });
        }
        const paramsSchema = z.object({
            id: z.string().uuid("ID inválido."),
        });
        let id;
        try {
            const params = paramsSchema.parse(request.params);
            id = params.id;
        }
        catch (error) {
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
        }
        catch (error) {
            return reply.status(500).send({
                error: "Erro ao deletar a ação sustentável.",
                detail: error.message,
            });
        }
    }
}
