import { resolve } from 'path';

/**
 * resolve client file path
 * @param pathSegments relative path of file in client
 * @returns absolute path of file
 */
export const resolveClientPath = (...pathSegments: string[]) =>
  resolve(__dirname, '..', '..', 'client', ...pathSegments);
