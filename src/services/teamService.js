// services/teamService.js
import supabase  from '@/clients/supabase'

export class TeamService {
    async getAll() {
        try {
            const { data, error } = await supabase
                .from('team')
                .select()

            if (error) throw error

            return data
        } catch (error) {
            console.error('error fetching teams:', error.message)
            throw error
        }
    }

    async getTeamsByTournamentSeason(tournamentSeasonId) {
        try {
            const { data, error } = await supabase
                .from('team_tournament')
                .select(`
                    team (
                        id,
                        name,
                        logo,
                        location,
                        code
                    )
                `)
                .eq('tournament_season', tournamentSeasonId);

            if (error) throw error;

            return data.map(item => item.team);
        } catch (error) {
            console.error('error fetching teams by tournament season:', error.message);
            throw error;
        }
    }

    async getTeamDetails(teamId) {
        try {
            const { data, error } = await supabase
                .from('team')
                .select('*')
                .eq('id', teamId)
                .single();

            if (error) throw error;

            return data;
        } catch (error) {
            console.error('error fetching team details:', error.message);
            throw error;
        }
    }

    async create(team) {
        try {
            const { data, error } = await supabase
                .from('team')
                .insert(team)
                .select()
                .single()

            if (error) throw error

            return data
        } catch (error) {
            console.error('error creating team:', error.message)
            throw error
        }
    }

    async update(id, team) {
        try {
            const { data, error } = await supabase
                .from('team')
                .update(team)
                .eq('id', id)
                .select()
                .single()

            if (error) throw error

            return data
        } catch (error) {
            console.error('error updating team:', error.message)
            throw error
        }
    }

    async delete(id) {
        try {
            const { error } = await supabase
                .from('team')
                .delete()
                .eq('id', id)

            if (error) throw error

            return true
        } catch (error) {
            console.error('error deleting team:', error.message)
            throw error
        }
    }
}