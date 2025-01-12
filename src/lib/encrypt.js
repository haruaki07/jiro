import crypto from 'node:crypto';

const algorithm = 'aes256';

function generateKey(secret, salt) {
	return crypto.scryptSync(secret, salt, 32);
}

function encrypt(rawText, secret) {
	const iv = crypto.randomBytes(16);
	const salt = crypto.randomBytes(16).toString('hex');
	const key = generateKey(secret, salt);

	const cipher = crypto.createCipheriv(algorithm, key, iv);
	const encrypted = cipher.update(rawText, 'utf8', 'hex');
	return [encrypted + cipher.final('hex'), iv.toString('hex'), salt].join('|');
}

function decrypt(encryptedText, secret) {
	const [encrypted, iv, salt] = encryptedText.split('|');
	if (!iv || !salt) throw new Error('IV or salt not found');

	const key = generateKey(secret, salt);
	const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
	return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
}

export { encrypt, decrypt };
