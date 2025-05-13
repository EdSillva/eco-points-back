import { insertSustainableAction } from "../../repositories/sustainableActionsRepositories/sustainableActions.repository";
import { CreateSustainableActionInput } from "../../schemas/sustainableActionsValidates/createSustainableAction.validate";


export async function createSustainableActionService(input: CreateSustainableActionInput, userId: string) {
    const { data, error } = await insertSustainableAction({ ...input, user_id: userId });

    if (error) {
        throw new Error("Erro ao registrar ação sustentável: " + error.message);
    }

    return data;
}
