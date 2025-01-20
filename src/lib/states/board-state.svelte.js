import { getContext, setContext } from 'svelte';

/**
 * @typedef {import('@prisma/client').Task} Task
 *
 * @typedef {import('@prisma/client').List & { tasks: Task[] }} List
 *
 * @typedef {import('@prisma/client').Board & { lists: List[] }} Board
 */

class BoardState {
	/** @type {Board} */
	board = $state(null);

	/** @param {Board} board */
	constructor(board) {
		this.board = board;
	}

	addList(list) {
		this.board.lists.push(list);
	}

	removeList(listId) {
		this.board.lists = this.board.lists.filter((l) => l.id !== listId);
	}

	addTask(task, listId) {
		const list = this.board.lists.find((l) => l.id === listId);
		list.tasks.push(task);
	}

	removeTask(taskId, listId) {
		const list = this.board.lists.find((l) => l.id === listId);
		list.tasks = list.tasks.filter((t) => t.id !== taskId);
	}

	updateBoard(board) {
		this.board.name = board.name;
		this.board.desc = board.desc;
		this.board.updatedAt = board.updatedAt;
	}

	updateList(listId, newList) {
		const index = this.board.lists.findIndex((l) => l.id === listId);
		const list = this.board.lists[index];

		list.name = newList.name;
		list.order = newList.order;
		list.updatedAt = newList.updatedAt;
	}
}

const BOARD_STATE_KEY = Symbol('BOARD');

/** @returns {BoardState} */
export function getBoardState() {
	return getContext(BOARD_STATE_KEY);
}

/** @param {Board} board */
export function setBoardState(board) {
	return setContext(BOARD_STATE_KEY, new BoardState(board));
}
