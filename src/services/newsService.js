export class NewsService {
    constructor() {
        this.apiUrl = 'https://play-up-backend.vercel.app';
        // Alternative CORS proxies - we'll try these in sequence if needed
        this.corsProxies = [
            'https://corsproxy.io/?',
            'https://api.allorigins.win/raw?url=',
            'https://proxy.cors.sh/'
        ];
        this.currentProxyIndex = -1; // Start with direct request (no proxy)
    }

    async getNews(page = 1, pageSize = 20) {
        try {
            // Try direct request first, then cycle through proxies if needed
            const baseUrl = this.currentProxyIndex >= 0 
                ? `${this.corsProxies[this.currentProxyIndex]}${encodeURIComponent(`${this.apiUrl}/news?page=${page}&page_size=${pageSize}`)}`
                : `${this.apiUrl}/news?page=${page}&page_size=${pageSize}`;
                
            const response = await fetch(baseUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                mode: this.currentProxyIndex >= 0 ? 'cors' : 'no-cors', // Try no-cors for direct requests
            });
            
            // For no-cors mode, we can't access response details
            if (this.currentProxyIndex < 0) {
                // If we're in no-cors mode, we can't check response.ok
                // Let's try with a proxy instead
                throw new Error('Direct request with no-cors failed, trying proxy');
            }
            
            if (!response.ok) {
                throw new Error(`Error fetching news: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('NewsService error:', error);
            
            // Try next proxy if available
            if (this.currentProxyIndex < this.corsProxies.length - 1) {
                this.currentProxyIndex++;
                console.log(`Trying with CORS proxy #${this.currentProxyIndex}: ${this.corsProxies[this.currentProxyIndex]}`);
                return this.getNews(page, pageSize);
            }
            
            // If all proxies fail, reset index and throw error
            this.currentProxyIndex = -1; // Reset for next attempt
            throw new Error('Failed to fetch news after trying all available proxies');
        }
    }

    async likeNews(newsId) {
        try {
            // Try direct request first, then cycle through proxies if needed
            const baseUrl = this.currentProxyIndex >= 0 
                ? `${this.corsProxies[this.currentProxyIndex]}${encodeURIComponent(`${this.apiUrl}/news/${newsId}/like`)}`
                : `${this.apiUrl}/news/${newsId}/like`;
                
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Add authorization header if needed
                    // 'Authorization': `Bearer ${token}`
                },
                mode: this.currentProxyIndex >= 0 ? 'cors' : 'no-cors', // Try no-cors for direct requests
            });
            
            // For no-cors mode, we can't access response details
            if (this.currentProxyIndex < 0) {
                // If we're in no-cors mode, we can't check response.ok
                // Let's try with a proxy instead
                throw new Error('Direct request with no-cors failed, trying proxy');
            }
            
            if (!response.ok) {
                throw new Error(`Error liking news: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('NewsService like error:', error);
            
            // Try next proxy if available
            if (this.currentProxyIndex < this.corsProxies.length - 1) {
                this.currentProxyIndex++;
                console.log(`Trying with CORS proxy #${this.currentProxyIndex}: ${this.corsProxies[this.currentProxyIndex]}`);
                return this.likeNews(newsId);
            }
            
            // If all proxies fail, reset index and throw error
            this.currentProxyIndex = -1; // Reset for next attempt
            throw new Error('Failed to like news after trying all available proxies');
        }
    }

    async unlikeNews(newsId) {
        try {
            // Try direct request first, then cycle through proxies if needed
            const baseUrl = this.currentProxyIndex >= 0 
                ? `${this.corsProxies[this.currentProxyIndex]}${encodeURIComponent(`${this.apiUrl}/news/${newsId}/unlike`)}`
                : `${this.apiUrl}/news/${newsId}/unlike`;
                
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Add authorization header if needed
                    // 'Authorization': `Bearer ${token}`
                },
                mode: this.currentProxyIndex >= 0 ? 'cors' : 'no-cors', // Try no-cors for direct requests
            });
            
            // For no-cors mode, we can't access response details
            if (this.currentProxyIndex < 0) {
                // If we're in no-cors mode, we can't check response.ok
                // Let's try with a proxy instead
                throw new Error('Direct request with no-cors failed, trying proxy');
            }
            
            if (!response.ok) {
                throw new Error(`Error unliking news: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('NewsService unlike error:', error);
            
            // Try next proxy if available
            if (this.currentProxyIndex < this.corsProxies.length - 1) {
                this.currentProxyIndex++;
                console.log(`Trying with CORS proxy #${this.currentProxyIndex}: ${this.corsProxies[this.currentProxyIndex]}`);
                return this.unlikeNews(newsId);
            }
            
            // If all proxies fail, reset index and throw error
            this.currentProxyIndex = -1; // Reset for next attempt
            throw new Error('Failed to unlike news after trying all available proxies');
        }
    }

    async addComment(newsId, content) {
        try {
            // Try direct request first, then cycle through proxies if needed
            const baseUrl = this.currentProxyIndex >= 0 
                ? `${this.corsProxies[this.currentProxyIndex]}${encodeURIComponent(`${this.apiUrl}/news/${newsId}/comments`)}`
                : `${this.apiUrl}/news/${newsId}/comments`;
                
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Add authorization header if needed
                    // 'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content }),
                mode: this.currentProxyIndex >= 0 ? 'cors' : 'no-cors', // Try no-cors for direct requests
            });
            
            // For no-cors mode, we can't access response details
            if (this.currentProxyIndex < 0) {
                // If we're in no-cors mode, we can't check response.ok
                // Let's try with a proxy instead
                throw new Error('Direct request with no-cors failed, trying proxy');
            }
            
            if (!response.ok) {
                throw new Error(`Error adding comment: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('NewsService comment error:', error);
            
            // Try next proxy if available
            if (this.currentProxyIndex < this.corsProxies.length - 1) {
                this.currentProxyIndex++;
                console.log(`Trying with CORS proxy #${this.currentProxyIndex}: ${this.corsProxies[this.currentProxyIndex]}`);
                return this.addComment(newsId, content);
            }
            
            // If all proxies fail, reset index and throw error
            this.currentProxyIndex = -1; // Reset for next attempt
            throw new Error('Failed to add comment after trying all available proxies');
        }
    }

    async getComments(newsId, page = 1, pageSize = 10) {
        try {
            // Try direct request first, then cycle through proxies if needed
            const baseUrl = this.currentProxyIndex >= 0 
                ? `${this.corsProxies[this.currentProxyIndex]}${encodeURIComponent(`${this.apiUrl}/news/${newsId}/comments?page=${page}&page_size=${pageSize}`)}`
                : `${this.apiUrl}/news/${newsId}/comments?page=${page}&page_size=${pageSize}`;
                
            const response = await fetch(baseUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                mode: this.currentProxyIndex >= 0 ? 'cors' : 'no-cors', // Try no-cors for direct requests
            });
            
            // For no-cors mode, we can't access response details
            if (this.currentProxyIndex < 0) {
                // If we're in no-cors mode, we can't check response.ok
                // Let's try with a proxy instead
                throw new Error('Direct request with no-cors failed, trying proxy');
            }
            
            if (!response.ok) {
                throw new Error(`Error fetching comments: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('NewsService comments error:', error);
            
            // Try next proxy if available
            if (this.currentProxyIndex < this.corsProxies.length - 1) {
                this.currentProxyIndex++;
                console.log(`Trying with CORS proxy #${this.currentProxyIndex}: ${this.corsProxies[this.currentProxyIndex]}`);
                return this.getComments(newsId, page, pageSize);
            }
            
            // If all proxies fail, reset index and throw error
            this.currentProxyIndex = -1; // Reset for next attempt
            throw new Error('Failed to fetch comments after trying all available proxies');
        }
    }
}