import crypto from 'node:crypto';
import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';
import { compare } from 'bcrypt-ts';
import { encrypt } from '$lib/encrypt';
import { SESSION_SECRET } from '$env/static/private';

/** @satisfies {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const email = data.get('email');
		const password = data.get('password');

		const user = await prisma.user.findFirst({ where: { email } });
		if (!user) {
			return fail(400, { message: 'wrong username or password' });
		}

		if (!(await compare(password, user.password))) {
			return fail(400, { message: 'wrong username or password' });
		}

		const sid = crypto.randomBytes(16).toString('hex');
		const sexp = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days

		await prisma.session.create({
			data: {
				id: sid,
				userId: user.id,
				expiredAt: sexp
			}
		});

		event.cookies.set('sid', sid, {
			path: '/',
			httpOnly: true,
			sameSite: true,
			expires: sexp,
			encode: (value) => encrypt(value, SESSION_SECRET)
		});

		return redirect(302, '/');
	}
};

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	if (locals.user) {
		redirect(307, '/');
	}
}
