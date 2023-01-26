import { SERVER_PORT } from './config';
import app from './app';

(() => {
  try {
    app.listen(SERVER_PORT, () => {
      console.log(`Express App Listening on Port ${SERVER_PORT}`);
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
})();
