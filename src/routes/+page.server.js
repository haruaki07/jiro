import prisma from '$lib/prisma';
import slugify from 'slugify';
import crypto from 'node:crypto';
import { fail } from '@sveltejs/kit';

/** @satisfies {import('./$types').Actions} */
export const actions = {
	/** @param {import('@sveltejs/kit').RequestEvent} event */
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const name = data.get('name');
		const desc = data.get('description');

		if (!name) {
			return fail(400, { message: 'name is required' });
		}

		if (name.length < 3) {
			return fail(400, { message: 'name must be at least 3 characters' });
		}

		const slug = slugify(`${name} ${crypto.randomBytes(3).toString('hex')}`, {
			lower: true,
			strict: true
		});

		const board = await prisma.board.create({
			data: {
				name,
				desc,
				slug,
				author: { connect: { id: locals.user.id } }
			}
		});

		return { success: true, slug };
	}
};

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const boards = await prisma.board.findMany({ where: { authorId: locals.user.id } });

	return {
		boards
	};
}
