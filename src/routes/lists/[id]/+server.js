import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
	await prisma.list.delete({ where: { id: +params.id } });

	return json({ success: true });
}
