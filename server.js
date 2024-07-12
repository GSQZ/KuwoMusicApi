import express from 'express';
import getNeteaseMusicUrl from './getNeteaseMusicUrl.js';

const app = express();
const port = 3005;

app.use(express.json());

app.get('/getMusicUrl', async (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword) {
    return res.status(400).send('缺少关键词');
  }
  try {
    const musicUrl = await getNeteaseMusicUrl(keyword);
    if (musicUrl) {
      res.json({ url: musicUrl });
    } else {
      res.status(404).send('音乐链接获取失败');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('网络错误');
  }
});

app.listen(port, () => {
  console.log(`服务运行在 http://localhost:${port}`);
});
