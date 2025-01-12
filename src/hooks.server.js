import { decrypt } from '$lib/encrypt';
import prisma from '$lib/prisma';
import { SESSION_SECRET } from '$env/static/private';

async function getUser(sessionId) {
	const session = await prisma.session.findFirst({
		where: { id: sessionId },
		select: {
			id: true,
			user: { select: { id: true, name: true, email: true, avatar: true } },
			expiredAt: true
		}
	});

	if (!session || new Date() >= session.expiredAt) {
		return null;
	}

	return session.user;
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const sid = event.cookies.get('sid', {
		decode: (value) => decrypt(value, SESSION_SECRET)
	});

	if (sid) {
		event.locals.user = await getUser(sid);
	}

	return await resolve(event);
}
