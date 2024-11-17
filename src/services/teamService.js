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
            console.error('Error fetching teams:', error.message)
            throw error
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
            console.error('Error creating team:', error.message)
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
            console.error('Error updating team:', error.message)
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
            console.error('Error deleting team:', error.message)
            throw error
        }
    }
}