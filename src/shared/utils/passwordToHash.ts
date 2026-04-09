import * as bcrypt from 'bcrypt';

export class PasswordToHash {
    public static async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }
}