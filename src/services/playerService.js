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
                        identification,
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

    async approvePlayerClaim(requestId) {
        try {
            const response = await fetch(`https://playup-backend.vercel.app/api/v1/claim/${requestId}/approve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error approving player claim');
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('error approving player claim:', error.message);
            return { success: false, error: error.message };
        }
    }

    async rejectPlayerClaim(requestId) {
        try {
            const response = await fetch(`https://playup-backend.vercel.app/api/v1/claim/${requestId}/reject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error rejecting player claim');
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('error rejecting player claim:', error.message);
            return { success: false, error: error.message };
        }
    }
}

