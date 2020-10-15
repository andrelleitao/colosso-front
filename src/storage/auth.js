/**
 * Responsável por armazenar dados da autenticação no LocalStorage.
 */
const KEY_TOKEN = "@pp-Token";
const KEY_KEEPME_CONNECTED = "@pp-Keepme-Connected";
const KEY_EMAIL = "@pp-Email";

export const isAuthenticated = () => localStorage.getItem(KEY_TOKEN) !== null;
export const getToken = () => localStorage.getItem(KEY_TOKEN);
export const login = (token) => {
    localStorage.setItem(KEY_TOKEN, token);
};
export const logout = () => {
    localStorage.removeItem(KEY_TOKEN);
};

// Caso o usuário marque o Matenha-me Conectado esse dado será armazenado no LocalStorage.
// O dado armazenado é o email do usuário. 
export const getKeepMeConnected = () => localStorage.getItem(KEY_KEEPME_CONNECTED);
export const storeKeepMeConnected = (keepMeConnected) => localStorage.setItem(KEY_KEEPME_CONNECTED, keepMeConnected);
export const resetKeepMeConnected = () => {
    localStorage.removeItem(KEY_EMAIL);
    localStorage.removeItem(KEY_KEEPME_CONNECTED);
}
export const getEmail = () => localStorage.getItem(KEY_EMAIL);
export const storeEmail = (email) => localStorage.setItem(KEY_EMAIL, email);