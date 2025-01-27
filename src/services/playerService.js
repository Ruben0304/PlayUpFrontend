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
}

