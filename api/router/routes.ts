import { Router, type Request, type Response } from 'express';
import { getArticles } from '../lib/notion';

const router = Router();

router.get('/test', async (req: Request, res: Response) => {
  const result = await getArticles();

  res.status(200).json(result);
});

export default router;
