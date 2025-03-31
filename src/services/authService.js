import supabase from '@/clients/supabase'

const BASE_URL = process.env.VUE_APP_URL || window.location.origin
const TOKEN_KEY = 'auth_token'

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
            
            // Store token if available (might not be available until email verification)
            if (data?.session?.access_token) {
                localStorage.setItem(TOKEN_KEY, data.session.access_token);
            }
            
            return {data, error: null};
        } catch (error) {
            return {data: null, error};
        }
    }

    async signIn({email, password}) {
        try {
            const response = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            
            console.log('Respuesta directa de Supabase auth.signInWithPassword:', response);
            
            // Store token if login successful
            if (response?.data?.session?.access_token) {
                localStorage.setItem(TOKEN_KEY, response.data.session.access_token);
            }
            
            // Devolvemos la respuesta completa
            return response;
        } catch (error) {
            console.error('Error en signIn:', error);
            return {data: null, error};
        }
    }

    async signOut() {
        try {
            const {error} = await supabase.auth.signOut();
            if (error) throw error;
            
            // Remove token on sign out
            localStorage.removeItem(TOKEN_KEY);
            
            return {error: null};
        } catch (error) {
            return {error};
        }
    }

    // Get the stored token
    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    }

    // Check if user is authenticated
    isAuthenticated() {
        return !!this.getToken();
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

    onAuthStateChange(callback) {
        return supabase.auth.onAuthStateChange(callback);
    }
}
