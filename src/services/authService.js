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
            const response = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            
            console.log('Respuesta directa de Supabase auth.signInWithPassword:', response);
            
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

    onAuthStateChange(callback) {
        return supabase.auth.onAuthStateChange(callback);
    }
}
