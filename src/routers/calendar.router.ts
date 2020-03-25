import { Router } from 'express';
import { Request, Response } from 'express';
import { NextFunction } from 'connect';
const axios = require('axios');

export class CalendarRouter {
  
  public router: Router;

  constructor() {
    this.router = Router();
    this.mountRoutes(this.router)
  }

  private mountRoutes(router: Router): void {

    router.post('/calendar', async (req: Request, res: Response, next: NextFunction) => {
      const calendarURL = 'https://api.songkick.com/api/3.0/metro_areas/9179/calendar.json?apikey=5vCRPKKglri6fMpu'
    
      axios.get(calendarURL)
      .then((response) => {
        const results = response.data.resultsPage.results;

        res.json(results);
      })
      .catch((error) => {
        console.log(error);
      });
    });
  }
}