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
import AdminWaitlist from '../screens/admin/WaitlistAdmin.vue'
import TermsConditions from '../screens/TermsConditions.vue'
import PrivacyPolicy from '../screens/PrivacyPolicy.vue'
import About from '../screens/AboutView.vue'

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
                path: 'terms-conditions',
                name: 'Terms-conditions',
                component: TermsConditions
            },
            {
                path: 'privacy-policy',
                name: 'PrivacyPolicy',
                component: PrivacyPolicy
            },
            {
                path: 'about-us',
                name: 'About',
                component: About
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
            },
            {
                path: '/admin/waitlist',
                name: 'AdminWaitlist',
                component: AdminWaitlist
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
