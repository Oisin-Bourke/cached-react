export const memoize = <T extends (...args: any[]) => any>(func: T) => {
	const cache = new Map<string, ReturnType<T>>()
	console.log("Cache initialized", cache)

	return (...args: Parameters<T>): ReturnType<T> => {
		const key = JSON.stringify(args)

		if (cache.has(key)) {
			console.log("Cache hit")
			return cache.get(key) as ReturnType<T>
		}

		const result = func(...args)
		cache.set(key, result)
		console.log("Cache miss")
		return result
	}
}
