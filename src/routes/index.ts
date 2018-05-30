'use strict';

import * as express from 'express';
import * as crypto from 'crypto';
import * as moment from 'moment';

const router = express.Router();

/* GET home page. */
router.get('/',(req,res,next) => {
  res.render('index', {title: 'Express'});
});

export default router;