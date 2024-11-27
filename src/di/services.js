// di/services.js
import { TeamService } from '@/services/teamService'
import { PlayerService } from '@/services/playerService'
import {AuthService} from "@/services/authService";
import {UserService} from "@/services/userService";
import {TournamentService} from "@/services/tournamentService";
import {OrganizationService} from "@/services/organizationService";
import {CountryService} from "@/services/countryService";

export const servicesPlugin = {
    install: (app) => {
        const teamService = new TeamService()
        const playerService = new PlayerService()
        const authService = new AuthService()
        const userService = new UserService()
        const tournamentService = new TournamentService()
        const organizationService = new OrganizationService()
        const countryService = new CountryService()

        // Provide the services
        app.provide('tournamentService', tournamentService)
        app.provide('organizationService', organizationService)
        app.provide('userService', userService)
        app.provide('authService', authService)
        app.provide('teamService', teamService)
        app.provide('playerService', playerService)
        app.provide('countryService', countryService)
    }
}