import { createRouter, createWebHistory } from 'vue-router'
import LayoutMain from '../screens/LayoutMain.vue'
import Home from '../screens/HomeView.vue'
import AuthForm from '../screens/AuthView.vue'
import LayoutAdmin from '../screens/admin/LayoutAdmin.vue'
import AdminDashboard from '../screens/admin/DashboardAdmin.vue'
import AdminPLayers from '../screens/admin/PlayersView.vue'
import AdminTeams from '../screens/admin/TeamsView.vue'
import AdminUsers from '../screens/admin/UsersView.vue'
import AdminTournaments from '../screens/admin/TournamentsView.vue'
import AdminOrg from '../screens/admin/OrganizationsView.vue'

const routes = [
    {
        path: '/',
        component: LayoutMain,
        children: [
            {
                path: '',
                name: 'Home',
                component: Home
            },
            {
                path: 'auth',
                name: 'Auth',
                component: AuthForm
            }
        ]
    },
    {
        path: '/admin',
        component: LayoutAdmin,
        children: [
            {
                path: '',
                name: 'AdminDashboard',
                component: AdminDashboard
            },
            {
                path: '/admin/players',
                name: 'AdminPlayers',
                component: AdminPLayers
            },
            {
                path: '/admin/teams',
                name: 'AdminTeams',
                component: AdminTeams
            },
            {
                path: '/admin/users',
                name: 'AdminUsers',
                component: AdminUsers
            },
            {
                path: '/admin/organizations',
                name: 'AdminOrganizations',
                component: AdminOrg
            },
            {
                path: '/admin/tournaments',
                name: 'AdminTournaments',
                component: AdminTournaments
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
