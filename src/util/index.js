export const Loaded = (components) => {
	return Object.keys(components).filter((key) => {
		return !components[key]
	}).length < 1
}