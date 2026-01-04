const router = require('express').Router();
const User = require('../models/User');

const WATCH_TIME = 60 * 1000; // 60 seconds

router.post('/watch-start', async (req, res) => {
  const { telegramId } = req.body;

  let user = await User.findOne({ telegramId });
  if (!user) user = await User.create({ telegramId });

  user.lastWatch = new Date();
  await user.save();

  res.json({ started: true });
});

router.post('/watch-complete', async (req, res) => {
  const { telegramId } = req.body;
  const user = await User.findOne({ telegramId });

  if (!user || !user.lastWatch)
    return res.status(400).json({ error: "Invalid watch" });

  const timeDiff = Date.now() - new Date(user.lastWatch).getTime();

  if (timeDiff < WATCH_TIME)
    return res.status(403).json({ error: "Watch time not completed" });

  user.coins += 5;
  user.lastWatch = null;
  await user.save();

  res.json({ coins: user.coins });
});

router.post('/promote', async (req, res) => {
  const { telegramId, videoUrl } = req.body;
  const user = await User.findOne({ telegramId });

  if (user.coins < 20)
    return res.status(400).json({ error: "Not enough coins" });

  user.coins -= 20;
  user.videos.push(videoUrl);
  await user.save();

  res.json({ success: true });
});

module.exports = router;
