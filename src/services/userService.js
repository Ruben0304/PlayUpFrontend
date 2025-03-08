import supabase from '@/clients/supabase';


export class UserService {
    async getAllUsersWithRoles(searchTerm = '') {
        try {
            const { data, error } = await supabase.rpc('search_users_with_roles', { search_term: searchTerm });

            if (error) throw error;

            return data.map(user => ({
                id: user.id,
                avatar_url: user.avatar_url,
                username: user.username,
                is_banned: user.is_banned,
                role: user.role_name,
                login_count: user.login_count
            }));
        } catch (error) {
            console.error('error fetching users with roles:', error.message);
            throw error;
        }
    }
    // Función para banear usuario
    async banUser(userId) {
        try {
            const {  error } = await supabase
                .from('user')
                .update({
                    is_banned: true,
                })
                .eq('id', userId);

            if (error) throw error;
            return { success: true, message: `Usuario ${userId} ha sido baneado` };

        } catch (error) {
            console.error('error al banear usuario:', error.message);
            return { success: false, error: error.message };
        }
    }

// Función para desbanear usuario
    async unbanUser(userId) {
        try {
            const {  error } = await supabase
                .from('user')
                .update({
                    banned: false
                })
                .eq('id', userId);

            if (error) throw error;
            return { success: true, message: `Usuario ${userId} ha sido desbaneado` };

        } catch (error) {
            console.error('error al desbanear usuario:', error.message);
            return { success: false, error: error.message };
        }
    }

    async getWaitlistUsers() {
        try {
            const { data, error } = await supabase
                .from('organizer_waitlist')
                .select(`
                id,
                urls,
                tournament_name,
                email,
                user (
                    id,
                    username,
                    avatar_url
                )
            `)
                .eq('approved', false); // Solo obtener usuarios que no han sido aprobados

            if (error) throw error;

            // Transform the data to match the desired output format
            return data.map(waitlistItem => ({
                waitlistId: waitlistItem.id,
                userId: waitlistItem.user.id,
                username: waitlistItem.user.username,
                avatar_url: waitlistItem.user.avatar_url,
                urls: waitlistItem.urls || [],
                tournament_name: waitlistItem.tournament_name,
                email: waitlistItem.email
            }));
        } catch (error) {
            console.error('error fetching waitlist users:', error.message);
            throw error;
        }
    }

    async acceptWaitlistUser(waitlistId) {
        try {
            console.log('Accepting user with RPC, waitlistId:', waitlistId);

            // Llamar a la función RPC con el parámetro correcto
            const { data, error } = await supabase
                .rpc('update_approved_organizer_waitlist', { p_id: waitlistId });

            if (error) {
                console.error('RPC error:', error);
                return { success: false, error: error.message };
            }

            console.log('RPC response:', data);
            return { success: true, message: 'Usuario aceptado exitosamente mediante RPC' };

        } catch (error) {
            console.error('Error in RPC call:', error.message);
            return { success: false, error: error.message };
        }
    }

    async getUserSignInsPerDay() {
        try {
            const { data, error } = await supabase.rpc('get_user_signins_per_day')
            if (error) throw error
            return data
        } catch (error) {
            console.error('error fetching user sign-ins per day:', error.message)
            throw error
        }
    }
}

