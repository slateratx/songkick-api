import { Router } from 'express';
import { Request, Response } from 'express';
import { NextFunction } from 'connect';
const axios = require('axios');

export class CalendarRouter {
  
  public router: Router;

  constructor(
    private songkick_key: string 
  ) {
    this.router = Router();
    this.mountRoutes(this.router)
  }

  private mountRoutes(router: Router): void {

    router.post('/shows', async (req: Request, res: Response, next: NextFunction) => {
      const metroId = req.body.metroId;
      const calendarURL = `https://api.songkick.com/api/3.0/metro_areas/${metroId}/calendar.json?apikey=${this.songkick_key}`;
    
      axios.get(calendarURL)
      .then((response) => {
        const results = response.data.resultsPage.results;

        res.json(results);
      })
      .catch((error) => {
        console.log(error);
      });
    });

    router.post('/weekly/shows', async (req: Request, res: Response, next: NextFunction) => {
      const metroId = req.body.metroId;
      const calendarURL = `https://api.songkick.com/api/3.0/metro_areas/${metroId}/calendar.json?apikey=${this.songkick_key}&min_date=2009-09-07&max_date=2009-09-13`;
    
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