export const
	diff = (register, log) => (
		Object.keys(register).filter(k => !log.some(action => register[k].indexOf(action) >= 0))
	)
