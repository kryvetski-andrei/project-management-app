export interface IApiError {
  statusCode: number;
  message: string | string[];
}

export function objIsIApiError(obj: object): obj is IApiError {
  return obj.hasOwnProperty('statusCode') && obj.hasOwnProperty('message');
}
