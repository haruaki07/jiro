import prisma from '$lib/prisma';

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
	const slug = params.slug;

	const board = await prisma.board.delete({ where: { slug } });

	return new Response(null, { status: 204 });
}
