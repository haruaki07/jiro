import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
	const id = +params.id;

	const board = await prisma.board.delete({ where: { id } });

	return new Response(null, { status: 204 });
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function PUT({ request, params }) {
	const data = await request.json();
	const name = data.name ?? undefined;

	const board = await prisma.board.update({
		where: { id: +params.id },
		data: { name, updatedAt: new Date() }
	});

	return json({ success: true, board });
}
