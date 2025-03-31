import supabase  from '@/clients/supabase'

export class PlayerService {
    async getAll() {
        try {
            const { data, error } = await supabase
                .from('player')
                .select()

            if (error) throw error

            return data
        } catch (error) {
            console.error('error fetching players:', error.message)
            throw error
        }
    }

    async create(player) {
        try {
            const { data, error } = await supabase
                .from('player')
                .insert(player)
                .select()
                .single()

            if (error) throw error

            return data
        } catch (error) {
            console.error('error creating player:', error.message)
            throw error
        }
    }

    async update(id, player) {
        try {
            const { data, error } = await supabase
                .from('player')
                .update(player)
                .eq('id', id)
                .select()
                .single()

            if (error) throw error

            return data
        } catch (error) {
            console.error('error updating player:', error.message)
            throw error
        }
    }

    async delete(id) {
        try {
            const { error } = await supabase
                .from('player')
                .delete()
                .eq('id', id)

            if (error) throw error

            return true
        } catch (error) {
            console.error('error deleting player:', error.message)
            throw error
        }
    }

    // New methods for player claim requests
    async getPlayerClaimRequests() {
        try {
            const { data, error } = await supabase
                .from('player_claim_request')
                .select(`
                    id,
                    created_at,
                    file,
                    status,
                    player (
                        id,
                        name,
                        image,
                        position,
                        first_name
                    ),
                    user (
                        id,
                        username,
                        avatar_url
                    )
                `)
                .eq('status', 1) // Assuming 1 is for pending requests
                .order('created_at', { ascending: false });

            if (error) throw error;

            return data;
        } catch (error) {
            console.error('error fetching player claim requests:', error.message);
            throw error;
        }
    }

    async approvePlayerClaim(requestId, playerId, userId) {
        try {
            // Start a transaction
            // 1. Update the player_claim_request status to approved (assuming 2 is for approved)
            const { error: requestError } = await supabase
                .from('player_claim_request')
                .update({ status: 2 })
                .eq('id', requestId);

            if (requestError) throw requestError;

            // 2. Update the player record to mark it as claimed and associate with the user
            const { error: playerError } = await supabase
                .from('player')
                .update({ 
                    is_claimed: true,
                    user: userId 
                })
                .eq('id', playerId);

            if (playerError) throw playerError;

            return { success: true, message: 'Solicitud de reclamo aprobada exitosamente' };
        } catch (error) {
            console.error('error approving player claim:', error.message);
            return { success: false, error: error.message };
        }
    }

    async rejectPlayerClaim(requestId) {
        try {
            // Update the player_claim_request status to rejected (assuming 3 is for rejected)
            const { error } = await supabase
                .from('player_claim_request')
                .update({ status: 3 })
                .eq('id', requestId);

            if (error) throw error;

            return { success: true, message: 'Solicitud de reclamo rechazada exitosamente' };
        } catch (error) {
            console.error('error rejecting player claim:', error.message);
            return { success: false, error: error.message };
        }
    }
}

