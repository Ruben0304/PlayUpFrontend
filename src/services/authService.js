import supabase from '@/clients/supabase'

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
                redirectTo: `${window.location.origin}/reset-password`,
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
