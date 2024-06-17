/**
 * Makes an HTTP request to the specified URI using the provided method, body, and headers.
 * @param {Object} options - The options for the API request.
 * @param {string} options.uri - The URI to make the request to.
 * @param {('GET'|'POST'|'PUT'|'DELETE'|'PATCH')} options.method - The HTTP method to use for the request.
 * @param {Object} [options.body] - The request body.
 * @param {Object} [options.headers] - The headers to include in the request.
 * @returns {Promise<Response>} - A Promise that resolves to the response from the API request.
 * @example
 * const response = await api({
 *  uri: '/login',
 *  method: 'POST',
 *  body: { login, senha },
 * });
 * const data = await response.json();
 */
export default function api({ uri, method, body, headers }) {
  const METHODS_THAT_ALLOW_BODY = ['POST', 'PUT', 'PATCH'];

  const { token } = JSON.parse(localStorage.getItem('@App:user') || '{}');

  const requestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...headers,
    },
  };

  if (METHODS_THAT_ALLOW_BODY.includes(method)) {
    requestOptions.body = JSON.stringify(body || {});
  }

  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3005';

  return fetch(`${baseUrl}${uri}`, requestOptions);
}
