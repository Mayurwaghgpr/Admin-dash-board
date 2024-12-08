import { createServer } from 'json-server';
import { join } from 'path';

export default (req, res) => {
  const server = createServer();
  const router = server.router(join(process.cwd(), 'db.json'));
  console.log(router)
  const middlewares = jsonServer.defaults();

  server.use(middlewares);
  server.use(router);

  // Handling the request to the function
  server.listen(3000, () => {
    res.status(200).json({ message: "Server running" });
  });
};