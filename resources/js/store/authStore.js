import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {

    // Pinia is a centralized store to manage global states.
    state: () => ({ // Defines the initial state of the store
        accessToken: localStorage.getItem('token') || null,
        authUser: JSON.parse(localStorage.getItem('user')) || null,
    }),

    actions: {
        async login(token) {
            //await axios.get('/sanctum/csrf-cookie');
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
    getters: { // These are typically used in components to access and display information from the store without directly modifying it
        isLoggedIn() {
            return this.accessToken !== null; // Returns true if the accessToken is not null (indicating a logged-in user), otherwise false
        },
        user: (state) => state.authUser, //Returns the value of the authUser state property, providing access to the user's information.
        token: (state) => state.accessToken // Returns the value of the accessToken state property
    },
});
