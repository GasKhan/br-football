import express from 'express';
import cors from 'cors';

import { router as playersRouter } from './players/players-router';
import { router as gamesRouter } from './games/games-router';
import { router as teamsRouter } from './teams/teams-router';
import { router as awardsRouter } from './awards/awards-router';
import { router as goalsRouter } from './goals/goals-router';
import { router as ratingsRouter } from './ratings/ratings-router';

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
