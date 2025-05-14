import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient, Song, Album} from './prisma/client';
import logger from 'jet-logger';

import BaseRouter from '@src/routes';

import Paths from '@src/common/constants/Paths';
import ENV from '@src/common/constants/ENV';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { RouteError } from '@src/common/util/route-errors';
import { NodeEnvs } from '@src/common/constants';


/******************************************************************************
                                Setup
******************************************************************************/

const prisma = new PrismaClient();
const app = express();


// **** Middleware **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/*****************************************************************************
                                  Types
*****************************************************************************/

interface CreateSongRequest {
  title: string;
  artist: string;
  albumId: number;
}


/*****************************************************************************
                                  Endpoints
*****************************************************************************/

/*
* Songs
*/
app.get('/song', async (req: Request, res: Response) => {

  try {
    const songs: Song[] = await prisma.song.findMany();
    res.json({
      message: "Song Library",
      data: songs
    })
  } catch (error) {
    res.status(500).json({
      message: "Error fetching songs",
      error: error instanceof Error ? error.message : "Unknown error"
    })
  }
  
})

app.post('/song', async (req: Request<{}, {}, CreateSongRequest>, res: Response) => {
  const { title, artist, albumId } = req.body;

  
  const song = await prisma.song.create({
    data: {
      title,
      artist,
      albumId,
    },
  });

  res.json({
    message: `Added ${title} by ${artist} to library.`,
    data: song,
  });
})

// // Show routes called in console during development
// if (ENV.NodeEnv === NodeEnvs.Dev) {
//   app.use(morgan('dev'));
// }

// // Security
// if (ENV.NodeEnv === NodeEnvs.Production) {
//   // eslint-disable-next-line n/no-process-env
//   if (!process.env.DISABLE_HELMET) {
//     app.use(helmet());
//   }
// }

// // Add APIs, must be after middleware
// app.use(Paths.Base, BaseRouter);

// // Add error handler
// app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
//   if (ENV.NodeEnv !== NodeEnvs.Test.valueOf()) {
//     logger.err(err, true);
//   }
//   let status = HttpStatusCodes.BAD_REQUEST;
//   if (err instanceof RouteError) {
//     status = err.status;
//     res.status(status).json({ error: err.message });
//   }
//   return next(err);
// });


// // **** FrontEnd Content **** //

// // Set views directory (html)
// const viewsDir = path.join(__dirname, 'views');
// app.set('views', viewsDir);

// // Set static directory (js and css).
// const staticDir = path.join(__dirname, 'public');
// app.use(express.static(staticDir));

// // Nav to users pg by default
// app.get('/', (_: Request, res: Response) => {
//   return res.redirect('/users');
// });

// // Redirect to login if not logged in.
// app.get('/users', (_: Request, res: Response) => {
//   return res.sendFile('users.html', { root: viewsDir });
// });


/******************************************************************************
                                Export default
******************************************************************************/

export default app;
