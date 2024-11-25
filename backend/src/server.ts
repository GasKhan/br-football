import express from 'express';
import cors from 'cors';

import { router as gamesRouter } from './games/games.routes';
import { router as goalsRouter } from './goals/goals.routes';
import { router as playersRouter } from './players/players.routes';
import { router as ratingsRouter } from './ratings/ratings.routes';
import { router as teamsRouter } from './teams/teams-router';
import { router as awardsRouter } from './awards/awards-router';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.use('/api/players', playersRouter);
app.use('/api/games', gamesRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/awards', awardsRouter);
app.use('/api/goals', goalsRouter);
app.use('/api/ratings', ratingsRouter);

app.get('/api', (req, res) => {
  res.json({ message: 'Got your request' });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
