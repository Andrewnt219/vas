const handlerKeys = [
  'get',
  'post',
  'update',
  'delete',
  'patch',
  'head',
  'connect',
  'options',
  'trace',
] as const;
export type Handler = typeof handlerKeys[number];

export function isValidHttpMethod(method: any): method is Handler {
  return handlerKeys.includes(method.toLowerCase());
}
