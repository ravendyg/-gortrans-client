/* global process */
const
  apiVersion = 'v1',
  baseApiUrl = process.env.API_URL || '',
  apiUrl = baseApiUrl// + apiVersion + '/'
  ;

export const config = {
  apiUrl
};
