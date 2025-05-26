import { FastifyInstance } from 'fastify';
import admin from 'firebase-admin';
import { createClient } from '@supabase/supabase-js';

export async function rewardsRoutes(fastify: FastifyInstance) {
    const supabase = createClient(process.env.SUPABASE_URL ?? '', process.env.SUPABASE_ANON_KEY ?? '');

    fastify.get('/rewards', async (request, reply) => {
        try {
            const token = request.headers.authorization?.split(' ')[1];
            if (!token) return reply.status(401).send({ error: 'Token não fornecido.' }); 

            const decodedToken = await admin.auth().verifyIdToken(token);
            const partnerId = decodedToken.uid;

            const { data: rewards, error } = await supabase.from('rewards').select('*').eq('partner_id', partnerId);
            if (error) throw error;

            const totalCreated = rewards.length;
            const totalRedeemed = rewards.filter(r => r.status === 'redeemed').length;
            const totalAvailable = rewards.filter(r => r.status === 'available').length;

            return reply.send({ totalCreated, totalRedeemed, totalAvailable, rewards });
        } catch {
            return reply.status(401).send({ error: 'Token inválido. Erro ao buscar recompensas' });
        }
    });
}
