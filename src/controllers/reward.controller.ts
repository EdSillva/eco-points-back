import { FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from '../db/supabaseConnection';

export const createRecompensa = async (request: FastifyRequest, reply: FastifyReply) => {

    const { id, name, points, stock, partners_id } = request.body as {
        id: number;
        name: string;
        points: number;
        stock: number;
        partners_id: number;
    };

    const parceiro_id = request.headers['user-id'] as string;

    if (!id || !name || !points || !stock || !partners_id || !stock === undefined) {
        return reply.status(400).send({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        const { data, error } = await supabase
            .from('recompensas')
            .insert([{ id, name, points, stock, partners_id }])
            .select()
            .single();

        if (error) throw error;

        return reply.status(201).send(data);
    } catch (err: any) {
        return reply.status(500).send({ message: 'Erro ao criar recompensa', error: err.message });
    }
};