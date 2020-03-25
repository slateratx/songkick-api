import { Router } from 'express';
import { Request, Response } from 'express';
import { NextFunction } from 'connect';
const axios = require('axios');

export class LocationRouter {
  
  public router: Router;

  constructor(
    private songkick_key: string 
  ) {
    this.router = Router();
    this.mountRoutes(this.router)
  }

  private mountRoutes(router: Router): void {

    router.post('/city', async (req: Request, res: Response, next: NextFunction) => {
      const city = req.body.city;
      const locationURL = `https://api.songkick.com/api/3.0/search/locations.json?query=${city}&apikey=${this.songkick_key}`;
    
      axios.get(locationURL)
      .then((response) => {
        const locations = response.data.resultsPage.results.location;
        const location = locations.filter((item) => item.city.displayName === city).shift();

        res.json(location);
      })
      .catch((error) => {
        console.log(error);
      });
    });
  }
}