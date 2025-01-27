import supabase from '@/clients/supabase'

export class CountryService {
    async getPlayerCountByCountry() {
        try {
            const { data, error } = await supabase
                .from('player')
                .select(`
                    country (
                        name
                    )
                `)

            if (error) throw error

            // Procesar los datos para contar los jugadores por país
            const countByCountry = {}
            data.forEach(player => {
                if (player.country && player.country.name) {
                    const countryName = player.country.name
                    countByCountry[countryName] = (countByCountry[countryName] || 0) + 1
                }
            })

            // Convertir a array y ordenar
            return Object.entries(countByCountry).map(([pais, cantidad]) => ({
                pais,
                cantidad
            })).sort((a, b) => b.cantidad - a.cantidad)
        } catch (error) {
            console.error('error fetching player count by country:', error.message)
            throw error
        }
    }
}