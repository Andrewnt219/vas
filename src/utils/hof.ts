type Function = (...args: any) => any;
export const tryInvoke = <T extends Function>(
	func: T | undefined | null,
	params: Parameters<T>
) => func && func(...params);
