// export const baseURI =  'http://localhost:8080';
export const baseURI = process.env.API_BASE_URL || 'http://localhost:8080';

console.log(baseURI);