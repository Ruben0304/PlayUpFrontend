import supabase from '@/clients/supabase';

export class OrganizationService {
    async getAllOrganizationsWithCreators() {
        try {
            const { data, error } = await supabase
                .from('organization')
                .select(`
                    id,
                    name,
                    logo,
                    user_organization (
                        user (
                            username
                        )
                    )
                `);

            if (error) throw error;

            // Transform the data to match the desired output format
            return data.map(organization => ({
                organization_id: organization.id,
                organization_name: organization.name,
                organization_logo: organization.logo,
                created_by_username: organization.user_organization && organization.user_organization.user ? organization.user_organization.user.username : null
            }));
        } catch (error) {
            console.error('Error fetching organizations with creators:', error.message);
            throw error;
        }
    }
}
