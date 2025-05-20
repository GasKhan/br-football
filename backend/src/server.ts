import express from 'express';
import cors from 'cors';

import { router as gamesRouter } from './games/games.routes';
import { router as playersRouter } from './players/players.routes';
import { router as ratingsRouter } from './ratings/ratings.routes';
import { router as authRouter } from './auth/auth.routes';
import { errorMiddleware } from './middlewares/error.middleware';
import { authMiddleware } from './middlewares/auth.middleware';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/players', authMiddleware, playersRouter);
app.use('/api/games', authMiddleware, gamesRouter);
app.use('/api/ratings', ratingsRouter);
// app.use('/api/teams', teamsRouter);
// app.use('/api/awards', awardsRouter);
// app.use('/api/goals', goalsRouter);

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
});
