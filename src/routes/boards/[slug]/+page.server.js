import prisma from '$lib/prisma';
import { Prisma } from '@prisma/client';
import { fail } from '@sveltejs/kit';

/** @satisfies {import('./$types').Actions} */
export const actions = {
	/** @param {import('@sveltejs/kit').RequestEvent} event */
	edit: async ({ request, locals, params }) => {
		const data = await request.formData();
		const name = data.get('name') ?? undefined;
		const desc = data.get('desc') ?? undefined;

		const board = await prisma.board.update({
			where: { slug: params.slug },
			data: { name, desc, updatedAt: new Date() }
		});

		return { success: true, board };
	}
};

/** @type {import('@sveltejs/kit').PageServerLoad} */
export const load = async ({ params, locals }) => {
	if (!locals.user) {
		return fail(401);
	}

	const board = await prisma.board.findFirst({
		where: {
			slug: params.slug
		},
		include: {
			lists: {
				orderBy: { order: 'asc' },
				include: {
					tasks: {
						orderBy: { order: 'asc' }
					}
				}
			}
		}
	});

	if (!board) {
		return fail(404);
	}

	return {
		board
	};
};
