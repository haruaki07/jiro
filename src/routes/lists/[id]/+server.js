import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
	await prisma.list.delete({ where: { id: +params.id } });

	return json({ success: true });
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function PUT({ params, request }) {
	const data = await request.json();
	const name = data.name ?? undefined;
	const order = data.order ?? undefined;

	let list = await prisma.list.update({
		where: { id: +params.id },
		data: { name, order, updatedAt: new Date() }
	});

	return json({ success: true, list });
}
