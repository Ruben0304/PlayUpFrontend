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
            console.error('Error fetching players:', error.message)
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
            console.error('Error creating player:', error.message)
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
            console.error('Error updating player:', error.message)
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
            console.error('Error deleting player:', error.message)
            throw error
        }
    }
}

