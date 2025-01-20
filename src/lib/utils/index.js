/**
 * @param {{ order: number }[]} array
 * @param {number} from
 * @param {number} to
 * @returns
 */
export function getNewOrder(array, from, to) {
	let order;

	if (to === 0) {
		order = array[to].order / 2;
	} else if (to === array.length - 1) {
		order = array[to].order + array[from]?.order ?? 32;
	} else {
		if (to < 0) return;

		const prev = array[to - 1];
		const next = array[to + 1];
		order = (prev.order + next.order) / 2;
	}

	return order;
}
