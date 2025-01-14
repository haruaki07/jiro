import prisma from '$lib/prisma';
import { fail } from '@sveltejs/kit';

/** @satisfies {import('./$types').Actions} */
export const actions = {
	/** @param {import('@sveltejs/kit').RequestEvent} event */
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const name = data.get('name');
		const boardId = +data.get('boardId');
		const order = +data.get('order');

		if (!name) {
			return fail(400, { message: 'name is required' });
		}

		if (!boardId) {
			return fail(400, { message: 'boardId is required' });
		}

		if (!order) {
			return fail(400, { message: 'order is required' });
		}

		const list = await prisma.list.create({
			data: {
				name,
				order,
				board: { connect: { id: boardId } },
				author: { connect: { id: locals.user.id } }
			}
		});

		return { success: true, list };
	}
};
