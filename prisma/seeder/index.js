// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt-ts/node';
import users from './users.json' assert { type: 'json' };

const prisma = new PrismaClient();

async function main() {
	console.log(`Start seeding ...`);

	for (const u of users) {
		const user = await prisma.user.create({
			data: {
				name: u.name,
				email: u.email,
				password: await hash(u.password, 10)
			}
		});
		console.log(`Created user with id: ${user.id}`);
	}
	console.log(`Seeding finished.`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
