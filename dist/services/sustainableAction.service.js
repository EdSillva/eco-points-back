import { SustainableActionRepository } from "../repositories/sustainableActions.repository.js";
import { UserPointsRepository } from "../repositories/userPoints.repository.js";
import { createSustainableActionValidate, } from "../schemas/sustainableActionsValidates/createSustainableAction.validate.js";
export class SustainableActionService {
    actionRepository = new SustainableActionRepository();
    userPointsRepository = new UserPointsRepository();
    async insertSustainableAction(input, userId) {
        const validatedInput = createSustainableActionValidate.parse(input);
        const { data, error } = await this.actionRepository.insertSustainableAction({
            ...validatedInput,
            user_id: userId,
        });
        if (error) {
            throw new Error("Erro ao registrar ação sustentável: " + error.message);
        }
        await this.userPointsRepository.ensureUserPoints(userId);
        await this.userPointsRepository.incrementPoints(userId, validatedInput.points);
        return data;
    }
    async deleteSustainableAction(id, userId) {
        const { data, error } = await this.actionRepository.deleteSustainableAction(id, userId);
        if (error) {
            throw new Error("Erro ao deletar a ação sustentável: " + error.message);
        }
        if (!data || data.length === 0) {
            const notFoundError = new Error("Ação sustentável não encontrada.");
            notFoundError.status = 404;
            throw notFoundError;
        }
    }
    async getUserSustainableActions(userId) {
        const { data, error } = await this.actionRepository.getByUserId(userId);
        if (error) {
            throw new Error("Erro ao buscar ações sustentáveis: " + error.message);
        }
        return data;
    }
    async updateSustainableAction(id, input, userId) {
        const { data, error } = await this.actionRepository.updateById(id, input, userId);
        if (error) {
            if (error.code === "PGRST116") {
                throw new Error("Ação sustentável não encontrada.");
            }
            throw new Error("Erro ao atualizar a ação sustentável: " + error.message);
        }
        return data;
    }
}
