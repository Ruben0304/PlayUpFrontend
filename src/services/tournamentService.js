import supabase from '@/clients/supabase';

export class TournamentService {
    async getAllTournamentsWithOrganizations() {
        try {
            const { data, error } = await supabase
                .from('tournament')
                .select(`
                    id,
                    created_at,
                    name,
                    logo,
                    organization,
                    description,
                    banner_image,
                    organization (
                        name
                    )
                `);

            if (error) throw error;

            // Transform the data to match the desired output format
            return data.map(tournament => ({
                id: tournament.id,
                created_at: tournament.created_at,
                name: tournament.name,
                logo: tournament.logo,
                organization: tournament.organization,
                description: tournament.description,
                banner_image: tournament.banner_image,
                organization_name: tournament.organization ? tournament.organization.name : null
            }));
        } catch (error) {
            console.error('Error fetching tournaments with organizations:', error.message);
            throw error;
        }
    }
}
