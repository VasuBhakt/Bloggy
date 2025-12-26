import conf from "../config/conf";
import { Client, Account, ID } from 'appwrite';

interface SignupRequest {
    email: string;
    password: string;
    name: string;
}

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

    async createAccount({ email, password, name }: SignupRequest) {
        try {
            const userAccount = await this.account.create({
                userId: ID.unique(),
                email: email,
                password: password,
                name: name
            });
            if (userAccount) {
                await this.login({ email, password });
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

    async verifyEmail() {
        try {
            return await this.account.createEmailVerification({
                url: "http://localhost:5173/verify"
            });
        } catch (error) {
            console.log("Appwrite service :: verifyEmail :: error", error);
            throw error;
        }
    }

    async updateVerify({ userId, secret }: { userId: string, secret: string }) {
        try {
            return await this.account.updateEmailVerification({
                userId: userId,
                secret: secret
            })
        } catch (error) {
            console.log("Appwrite service :: updateVerify :: error", error);
            throw error;
        }
    }

    async login({ email, password }: LoginRequest) {
        try {
            try {
                // Pre-emptively delete existing sessions to avoid "Session is active" error
                await this.account.deleteSession({ sessionId: 'current' });
            } catch {
                // No active session, safe to proceed
            }
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

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
        return null;
    }
}

const authService = new AuthService();

export default authService;

