// calculate random value from range
export const randomBetween = (from, to) => {
	return Math.random() * (to - from) + from;
}