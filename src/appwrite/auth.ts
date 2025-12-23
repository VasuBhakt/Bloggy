import config from "../config/config";
import { Client, Account, ID } from 'appwrite';

class SignupRequest {
    email: string;
    password: string;
    name: string;

    constructor(email: string, password: string, name: string) {
        this.email = email;
        this.password = password;
        this.name = name;
    }
}

class LoginRequest {
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}

export class AuthService {

    client = new Client();
    account: Account;

    constructor() {
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
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
                return this.login({ email, password });
            } else {
                throw userAccount;
            }
        } catch (error) {
            console.log("Appwrite service :: createAccount :: error", error);
        }
        return null;
    }

    async login({ email, password }: LoginRequest) {
        try {
            const session = await this.account.createEmailPasswordSession({
                email: email,
                password: password
            });
            return session;
        } catch (error) {
            console.log("Appwrite service :: login :: error", error);
        }
        return null;
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

