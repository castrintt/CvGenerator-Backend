import crypto from 'crypto';

export class UuidGenerator {
    public static generate(): string {
        return crypto.randomUUID();
    }
}