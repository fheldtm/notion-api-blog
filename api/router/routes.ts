import { Router, type Request, type Response } from 'express';

const router = Router();

router.get('/test', (req: Request, res: Response) => {
  console.log(req.url);
  console.log('THIS !');
  res.send('hello world');
});

export default router;
