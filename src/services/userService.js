import supabase from '@/clients/supabase';


export class UserService {
    async getAllUsersWithRoles() {
        try {
            const { data, error } = await supabase
                .from('user')
                .select(`
                    id,
                    avatar_url,
                    username,
                    user_role (
                        role (
                            name
                        )
                    )
                `);

            if (error) throw error;

            // Transform the data to match the desired output format
            return data.map(user => ({
                id: user.id,
                avatar_url: user.avatar_url,
                username: user.username,
                role: user.user_role && user.user_role.role ? user.user_role.role.name : null
            }));
        } catch (error) {
            console.error('Error fetching users with roles:', error.message);
            throw error;
        }
    }
}

