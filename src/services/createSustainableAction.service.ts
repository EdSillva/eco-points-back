import { sustainableAction } from "../repositories/sustainableActions.repository.js";
import { CreateSustainableActionInput } from "../schemas/sustainableActionsValidates/createSustainableAction.validate.js";

const repository = new sustainableAction();

export class sustainableActionService {
    async insertSustainableAction(input: CreateSustainableActionInput, userId: string) {
        const { data, error } = await repository.insertSustainableAction({ ...input, user_id: userId });

        if (error) {
            throw new Error("Erro ao registrar ação sustentável: " + error.message);
        }

        return data;
    }
}