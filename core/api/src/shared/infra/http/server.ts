import startSocket from '../websockets/server';
import app from './app';

startSocket(app);

const port = 45541;

app.listen(port, () => {
  console.log(`Listening the port ${port}`);
});
