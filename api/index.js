import serverless from 'serverless-http';
import app from '../server/app.js';

export const config = {
  runtime: 'nodejs',
};

export default serverless(app);
