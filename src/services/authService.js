import supabase from '@/clients/supabase'

const BASE_URL = process.env.VUE_APP_URL || window.location.origin

// Auth functions
export class AuthService {
    async signUp({email, password, firstName, lastName}) {
        try {
            const {data, error} = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        first_name: firstName,
                        last_name: lastName,
                    },
                    emailRedirectTo: `${BASE_URL}/auth/verify-email`,
                },
            });

            if (error) throw error;
            return {data, error: null};
        } catch (error) {
            return {data: null, error};
        }
    }

    async signIn({email, password}) {
        try {
            const {data, error} = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            return {data, error: null};
        } catch (error) {
            return {data: null, error};
        }
    }

    async signOut() {
        try {
            const {error} = await supabase.auth.signOut();
            if (error) throw error;
            return {error: null};
        } catch (error) {
            return {error};
        }
    }

    async resetPassword(email) {
        try {
            const {error} = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${BASE_URL}/auth/reset-password`,
            });
            if (error) throw error;
            return {error: null};
        } catch (error) {
            return {error};
        }
    }

    async deleteAccount(email, password) {
        try {
            // Call the external API instead of using Supabase directly
            // const response = await fetch('http://localhost:8000/api/v1/auth/remove-account', {
            const response = await fetch('https://playup-backend.vercel.app/v1/auth/remove-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            // Check for HTTP errors
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error deleting account');
            }
            
            return { success: true, error: null };
        } catch (error) {
            console.error('Error deleting account:', error.message);
            return { success: false, error };
        }
    }

    onAuthStateChange(callback) {
        return supabase.auth.onAuthStateChange(callback);
    }
}
