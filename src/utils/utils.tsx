import bcrypt from 'bcryptjs';

async function encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export default encryptPassword;