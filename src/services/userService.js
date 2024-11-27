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
            console.error('Error fetching users with roles:', error.message);
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
            console.error('Error al banear usuario:', error.message);
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
            console.error('Error al desbanear usuario:', error.message);
            return { success: false, error: error.message };
        }
    }

    // En UserService
    async getWaitlistUsers() {
        try {
            const { data, error } = await supabase
                .from('organizer_waitlist')
                .select(`
                id,
                user (
                    id,
                    username,
                    avatar_url
                )
            `);

            if (error) throw error;

            // Transform the data to match the desired output format
            return data.map(waitlistItem => ({
                waitlistId: waitlistItem.id,
                userId: waitlistItem.user.id,
                username: waitlistItem.user.username,
                avatar_url: waitlistItem.user.avatar_url
            }));
        } catch (error) {
            console.error('Error fetching waitlist users:', error.message);
            throw error;
        }
    }

    async acceptWaitlistUser(waitlistId) {
        try {
            const { error } = await supabase
                .from('organizer_waitlist')
                .delete()
                .eq('id', waitlistId);

            if (error) throw error;
            return { success: true, message: 'Usuario aceptado exitosamente' };

        } catch (error) {
            console.error('Error al aceptar usuario:', error.message);
            return { success: false, error: error.message };
        }
    }

    async getUserSignInsPerDay() {
        try {
            const { data, error } = await supabase.rpc('get_user_signins_per_day')
            if (error) throw error
            return data
        } catch (error) {
            console.error('Error fetching user sign-ins per day:', error.message)
            throw error
        }
    }
}

