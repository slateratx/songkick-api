import * as express from 'express';
import { Request, Response, Application, NextFunction } from 'express';
import { corsMiddleware } from './utils';
import { CalendarRouter } from './routers/calendar.router';
import { LocationRouter } from './routers/location.router';

process.on('uncaughtException', (err: Error) => {
  console.log(err);
  throw err;
});

const SONGKICK_KEY = process.env.SONGKICK_KEY;
if (!SONGKICK_KEY) { throw new Error('Required Env Var SONGKICK_KEY not found.'); }

const app: Application = express();
app.use(corsMiddleware);
app.use(express.json());
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  res.sendStatus(500);
});

const locationRouter = new LocationRouter(SONGKICK_KEY);
app.use('/location', locationRouter.router);

const calendarRouter = new CalendarRouter(SONGKICK_KEY);
app.use('/calendar', calendarRouter.router);


app.listen(process.env.PORT || 3000);
console.log("Listening on port 3000");