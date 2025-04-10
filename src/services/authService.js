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
        // CORS proxies to try if direct request fails
        const corsProxies = [
            '',  // Direct request (no proxy)
            'https://corsproxy.io/?',
            'https://api.allorigins.win/raw?url=',
            'https://proxy.cors.sh/'
        ];
        
        // const baseUrl = 'http://localhost:8000/api/v1/auth/remove-account';
        const baseUrl = 'https://playup-backend.vercel.app/v1/auth/remove-account';
        let lastError = null;
        
        // Try each proxy in sequence until one works
        for (const proxy of corsProxies) {
            try {
                const url = proxy ? `${proxy}${encodeURIComponent(baseUrl)}` : baseUrl;
                
                const response = await fetch(url, {
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
                
                // If we get here, the request was successful
                console.log('Account deletion successful');
                return { success: true, error: null };
            } catch (error) {
                console.warn(`Error with${proxy ? ' proxy ' + proxy : ' direct request'}:`, error.message);
                lastError = error;
                
                // If this isn't a CORS error, don't try other proxies
                if (error.message && !error.message.includes('CORS')) {
                    break;
                }
            }
        }
        
        // If we get here, all proxies failed
        console.error('All requests failed. Last error:', lastError?.message);
        return { success: false, error: lastError };
    }

    onAuthStateChange(callback) {
        return supabase.auth.onAuthStateChange(callback);
    }
}
