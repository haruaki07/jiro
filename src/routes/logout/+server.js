import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export function GET({ locals, cookies }) {
	cookies.delete('sid', {
		path: '/'
	});

	delete locals.user;

	redirect(302, '/login');
}
