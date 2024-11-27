import supabase from '@/clients/supabase';

export class TournamentService {

    async getTournamentSeasons(tournamentId) {
        try {
            const { data, error } = await supabase
                .from('tournament_season')
                .select(`
                    id,
                    season,
                    current,
                    current_round,
                    banner_image,
                    created_at,
                    description,
                    game,
                    start_date,
                    total_fixtures,
                    tournament_prize,
                    tournament_rule,
                    tournament_status,
                    tournament_type,
                    teams:team_tournament(count)
                `)
                .eq('tournament', tournamentId);

            if (error) throw error;

            // Add the team count to each season
            const seasonsWithTeamCount = data.map(season => ({
                ...season,
                teamCount: season.teams[0].count
            }));

            return seasonsWithTeamCount;
        } catch (error) {
            console.error('Error fetching tournament seasons:', error.message);
            throw error;
        }
    }



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
                    ),
                    tournament_season (
                        id
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
                organization_name: tournament.organization ? tournament.organization.name : null,
                season_count: tournament.tournament_season ? tournament.tournament_season.length : 0
            }));
        } catch (error) {
            console.error('Error fetching tournaments with organizations:', error.message);
            throw error;
        }
    }


    async getTournamentStatusCounts() {
        try {
            const { data, error } = await supabase
                .from('tournament')
                .select(`
                    id,
                    tournament_season (tournament_status)
                `);

            if (error) throw error;

            const statusCounts = {
                open: 0,
                in_progress: 0,
                finished: 0
            };

            data.forEach(tournament => {
                const latestSeason = tournament.tournament_season[tournament.tournament_season.length - 1];
                if (latestSeason) {
                    switch (latestSeason.tournament_status) {
                        case 1: // open
                            statusCounts.open++;
                            break;
                        case 3: // in_progress
                            statusCounts.in_progress++;
                            break;
                        case 4: // finished
                            statusCounts.finished++;
                            break;
                    }
                }
            });

            return statusCounts;
        } catch (error) {
            console.error('Error fetching tournament status counts:', error.message);
            throw error;
        }
    }
    async filterTournamentsByStatus(status) {
        try {
            // Validar el estado proporcionado
            const validStatuses = [1, 2, 3, 4, 5]; // open, closed, in_progress, finished, cancelled
            if (!validStatuses.includes(status)) {
                throw new Error('Estado de torneo no válido');
            }

            const { data, error } = await supabase
                .from('tournament')
                .select(`
                    id,
                    name,
                    logo,
                    description,
                    banner_image,
                    organization (name),
                    tournament_season!inner (
                        id,
                        season,
                        current,
                        tournament_status
                    )
                `)
                .eq('tournament_season.current', true)
                .eq('tournament_season.tournament_status', status);

            if (error) throw error;

            // Transformar los datos para un formato más útil
            return data.map(tournament => ({
                id: tournament.id,
                name: tournament.name,
                logo: tournament.logo,
                description: tournament.description,
                banner_image: tournament.banner_image,
                organization_name: tournament.organization ? tournament.organization.name : null,
                current_season: tournament.tournament_season[0]
            }));
        } catch (error) {
            console.error(`Error al filtrar torneos por estado ${status}:`, error.message);
            throw error;
        }
    }
    async updateTournament(id, updatedData) {
        try {
            const { data, error } = await supabase
                .from('tournament')
                .update(updatedData)
                .eq('id', id)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error updating tournament:', error.message);
            throw error;
        }
    }

    async updateSeason(id, updatedData) {
        try {
            const { data, error } = await supabase
                .from('tournament_season')
                .update(updatedData)
                .eq('id', id)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error updating season:', error.message);
            throw error;
        }
    }
}
