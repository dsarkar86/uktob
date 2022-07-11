// Constants.js
const prod = {
 url: {
  API_URL: 'https://miragesoftwares.com/copy_backend/public/api'
 }
};

const dev = {
 url: {
  API_URL: 'https://miragesoftwares.com/copy_backend/public/api'
 }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;