import { RedeemedRewardsRepository } from "../repositories/redeemedRewards.repository.js";
import { UserPointsRepository } from "../repositories/userPoints.repository.js";
export class RedeemedRewardsService {
    repository = new RedeemedRewardsRepository();
    userPointsRepository = new UserPointsRepository();
    async redeemReward(userId, rewardId) {
        const reward = await this.repository.findById(rewardId);
        if (!reward) {
            throw new Error("Recompensa não encontrada.");
        }
        if (reward.stock <= 0) {
            throw new Error("Recompensa esgotada.");
        }
        // Garante que o usuário tem entrada na tabela de pontos
        await this.userPointsRepository.ensureUserPoints(userId);
        // Verifica se o usuário tem pontos suficientes
        const userPoints = await this.userPointsRepository.getByUserId(userId);
        if (!userPoints || userPoints.points < reward.points_required) {
            throw new Error("Pontos insuficientes para resgatar essa recompensa.");
        }
        // Agora sim: decrementa o estoque e os pontos
        await this.repository.decrementStock(rewardId);
        await this.userPointsRepository.decrementPoints(userId, reward.points_required);
        // Registra o resgate
        await this.repository.createRedeemedReward({
            reward_id: rewardId,
            user_id: userId,
            reward_name: reward.name,
        });
        return { message: "Recompensa resgatada com sucesso!" };
    }
    async getUserRedeemedRewards(userId) {
        const data = await this.repository.getUserIdWithRedeemedReward(userId);
        if (!data || data.length === 0) {
            return null;
        }
        return data;
    }
}
