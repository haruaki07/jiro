import {
	defaultDropAnimationSideEffects,
	MouseSensor,
	useSensor,
	useSensors
} from 'svelte-dnd-kit';

export const sensors = useSensors(useSensor(MouseSensor));

export const dropAnimation = {
	sideEffects: defaultDropAnimationSideEffects({
		styles: {
			active: {
				opacity: '0.5'
			}
		}
	})
};
