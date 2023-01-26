import { writable } from 'svelte/store';

export function createMessageStore(initial: string[]) {
	let uid = 1;
	type Message = { id: number; description: string };
	const messages: Message[] = initial.map((description) => ({
		id: uid++,
		description
	}));

	const { subscribe, update } = writable(messages);

	return {
		subscribe,
		add: (description: string) => {
			const todo = {
				id: uid++,
				description
			};

			update(($messages) => [...$messages, todo]);
		},
		remove: (todo: Message) => {
			update(($messages) => $messages.filter((t) => t !== todo));
		}
	};
}
