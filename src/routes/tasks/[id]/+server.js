import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function PUT({ params, request }) {
	const data = await request.json();
	const name = data.name ?? undefined;
	const order = data.order ?? undefined;
	const listId = data.listId ?? undefined;

	await prisma.task.update({
		where: { id: +params.id },
		data: { name, order, listId, updatedAt: new Date() }
	});

	return json({ success: true });
}
