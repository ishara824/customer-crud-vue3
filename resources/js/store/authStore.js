import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {

    state: () => ({
        accessToken: localStorage.getItem('token') || null,
        authUser: JSON.parse(localStorage.getItem('user')) || null,
    }),

    actions: {
        async login(token) {
            // Simulate login with API call (replace with your actual logic)
            await axios.get('/sanctum/csrf-cookie');
            window.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get('/api/user');
            console.log(response);

            // const expiresAt = new Date(expires_at);
            // localStorage.setItem('expires_at', expiresAt.getTime().toString());
            this.authUser = response.data;
            this.accessToken = token;
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('token', token);
        },
        async logout() {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            this.accessToken = null;
            this.authUser = null;
        },
    },
    getters: {
        isLoggedIn() {
            // let token = localStorage.getItem('token');
            // return token !== null;
            return this.accessToken !== null;
        },
        user: (state) => state.authUser,
        token: (state) => state.accessToken
    },
});
