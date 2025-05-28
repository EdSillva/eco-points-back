import { SustainableActionRepository } from "../repositories/sustainableActions.repository.js";
import { UserPointsRepository } from "../repositories/userPoints.repository.js";
import {
  createSustainableActionValidate,
  CreateSustainableActionInput,
} from "../schemas/sustainableActionsValidates/createSustainableAction.validate.js";

export class SustainableActionService {
  private actionRepository = new SustainableActionRepository();
  private userPointsRepository = new UserPointsRepository();

  async insertSustainableAction(
    input: CreateSustainableActionInput,
    userId: string,
  ) {
    const validatedInput = createSustainableActionValidate.parse(input);

    const { data, error } = await this.actionRepository.insertSustainableAction(
      {
        ...validatedInput,
        user_id: userId,
      },
    );

    if (error) {
      throw new Error("Erro ao registrar ação sustentável: " + error.message);
    }

    await this.userPointsRepository.ensureUserPoints(userId);
    await this.userPointsRepository.incrementPoints(
      userId,
      validatedInput.points,
    );

    return data;
  }

  async deleteSustainableAction(id: string, userId: string) {
    const { data, error } = await this.actionRepository.deleteSustainableAction(
      id,
      userId,
    );

    if (error) {
      throw new Error("Erro ao deletar a ação sustentável: " + error.message);
    }

    if (!data || data.length === 0) {
      const notFoundError = new Error("Ação sustentável não encontrada.");
      (notFoundError as any).status = 404;
      throw notFoundError;
    }
  }

  async getUserSustainableActions(userId: string) {
    const { data, error } = await this.actionRepository.getByUserId(userId);

    if (error) {
      throw new Error("Erro ao buscar ações sustentáveis: " + error.message);
    }

    return data;
  }

  async updateSustainableAction(
    id: string,
    input: { title: string; description: string },
    userId: string,
  ) {
    const { data, error } = await this.actionRepository.updateById(
      id,
      input,
      userId,
    );

    if (error) {
      if (error.code === "PGRST116") {
        throw new Error("Ação sustentável não encontrada.");
      }
      throw new Error("Erro ao atualizar a ação sustentável: " + error.message);
    }

    return data;
  }
}
