import {
	defaultDropAnimationSideEffects,
	MouseSensor,
	PointerSensor,
	useSensor,
	useSensors
} from 'svelte-dnd-kit';

const pointerSensor = useSensor(PointerSensor, {
	activationConstraint: {
		distance: 0.01
	}
});
const mouseSensor = useSensor(MouseSensor);

export const sensors = useSensors(mouseSensor, pointerSensor);

export const dropAnimation = {
	sideEffects: defaultDropAnimationSideEffects({
		styles: {
			active: {
				opacity: '0.5'
			}
		}
	})
};
