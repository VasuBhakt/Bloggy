//Auth managment for appwrite

import conf from "../config/conf";
import { Client, Account, ID } from 'appwrite';

// Signup request interface, can be changed as needed
interface SignupRequest {
    email: string;
    password: string;
    username: string;
    name: string;
    phone: string;
    country: string;
}
// Login request interface, can be changed as needed
interface LoginRequest {
    email: string;
    password: string;
}

export class AuthService {

    client = new Client();
    account: Account;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    // Account signup method
    async createAccount({ email, password, username }: SignupRequest) {
        try {
            const userAccount = await this.account.create({
                userId: ID.unique(),
                email: email,
                password: password,
                name: username,
            });
            if (userAccount) {
                // We login first to have a session, then update preferences
                await this.login({ email, password });

                // Update default prefs, take later from user
                await this.account.updatePrefs({
                    prefs: {
                        name: '',
                        country: '',
                        phone: ''
                    }

                });

                // send verification mail
                await this.verifyEmail();
                return userAccount;
            } else {
                throw userAccount;
            }
        } catch (error) {
            console.log("Appwrite service :: createAccount :: error", error);
            throw error;
        }
    }

    // User profile update
    async updateProfile({ name, phone, country }: any) {
        try {
            // only updates prefs for now, password updation to be added later
            await this.account.updatePrefs({
                prefs: {
                    name: name,
                    country: country,
                    phone: phone
                }
            })
            return true;
        } catch (error) {
            console.log("Appwrite service :: updateProfile :: error", error);
            throw error;
        }
    }

    // Email verification
    async verifyEmail() {
        try {
            return await this.account.createEmailVerification({
                url: "http://localhost:5173/verify" // redirect url
            });
        } catch (error) {
            console.log("Appwrite service :: verifyEmail :: error", error);
            throw error;
        }
    }

    // Email verification update on redirected url
    async updateVerify({ userId, secret }: { userId: string, secret: string }) {
        try {
            return await this.account.updateEmailVerification({
                userId: userId,
                secret: secret
            })
        } catch (error) {
            console.log("Appwrite service :: updateVerify :: error", error);
            throw error; // Re-throw so component can handle UI error message
        }
    }

    // User login, only allows one session per device at a time
    async login({ email, password }: LoginRequest) {
        try {
            const session = await this.account.createEmailPasswordSession({
                email: email,
                password: password
            });
            return session;
        } catch (error) {
            console.log("Appwrite service :: login :: error", error);
            throw error; // Re-throw so component can handle UI error message
        }
    }

    // Get current logged in user
    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;
    }

    // User logout
    async logout() {
        try {
            await this.account.deleteSession({
                sessionId: "current"     // Delete only current session
            });
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
        return null;
    }
}

const authService = new AuthService();

export default authService;

