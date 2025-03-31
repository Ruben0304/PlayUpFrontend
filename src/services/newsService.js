export class NewsService {
    constructor(authService) {
        this.apiUrl = 'https://play-up-backend.vercel.app';
        this.authService = authService;
    }

    async getNews(page = 1, pageSize = 20) {
        try {
            const url = `${this.apiUrl}/news?page=${page}&page_size=${pageSize}`;
                
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error(`Error fetching news: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('NewsService error:', error);
            throw new Error('Failed to fetch news');
        }
    }

    async likeNews(newsId) {
        try {
            const url = `${this.apiUrl}/news/${newsId}/like`;
                
            const token = this.authService.getToken();
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            
            if (!response.ok) {
                throw new Error(`Error liking news: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('NewsService like error:', error);
            throw new Error('Failed to like news');
        }
    }

    async unlikeNews(newsId) {
        try {
            const url = `${this.apiUrl}/news/${newsId}/unlike`;
                
            const token = this.authService.getToken();
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            
            if (!response.ok) {
                throw new Error(`Error unliking news: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('NewsService unlike error:', error);
            throw new Error('Failed to unlike news');
        }
    }

    async addComment(newsId, content) {
        try {
            const url = `${this.apiUrl}/news/${newsId}/comment`;
                
            const token = this.authService.getToken();
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content }),
            });
            
            if (!response.ok) {
                throw new Error(`Error adding comment: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('NewsService comment error:', error);
            throw new Error('Failed to add comment');
        }
    }

    async getComments(newsId, page = 1, pageSize = 10) {
        try {
            const url = `${this.apiUrl}/news/${newsId}/comments?page=${page}&page_size=${pageSize}`;
                
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error(`Error fetching comments: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('NewsService comments error:', error);
            throw new Error('Failed to fetch comments');
        }
    }
}