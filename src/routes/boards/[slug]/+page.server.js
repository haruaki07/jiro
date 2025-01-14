import prisma from '$lib/prisma';
import { fail } from '@sveltejs/kit';

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
