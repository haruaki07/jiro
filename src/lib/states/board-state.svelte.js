import { getContext, setContext } from 'svelte';

/**
 * @typedef {import('@prisma/client').Board & { lists: import('@prisma/client').List[] }} Board
 */

class BoardState {
	/** @type {Board} */
	board = $state(null);

	/**
	 *
	 * @param {Board} board
	 */
	constructor(board) {
		this.board = board;
	}

	addList(list) {
		this.board.lists.push(list);
	}

	removeList(listId) {
		this.board.lists = this.board.lists.filter((l) => l.id !== listId);
	}
}

const BOARD_STATE_KEY = Symbol('BOARD');

/**
 *
 * @returns {BoardState}
 */
export function getBoardState() {
	return getContext(BOARD_STATE_KEY);
}

/** @param {Board} board */
export function setBoardState(board) {
	return setContext(BOARD_STATE_KEY, new BoardState(board));
}
