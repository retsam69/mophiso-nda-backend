'use strict';

import * as express from 'express';
import * as crypto from 'crypto';
import * as moment from 'moment';

import { LoginModel } from '../models/login';
import { Jwt } from '../models/jwt';

const router = express.Router();
const loginModel = new LoginModel();
const jwt = new Jwt();

router.get('/', async (req, res, next) => {
  res.send('login page.');
});

router.post('/auth', async (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  if (username && password) {
    let encPassword = crypto
      .createHash('md5')
      .update(password)
      .digest('hex');
      try {
        let rs = await loginModel.doLogin(req.db, username, encPassword);
        if(rs.length) {
          const payload = {
            userId: rs[0].user_id,
            username: rs[0].username,
            firstName: rs[0].firstname,
            lastName: rs[0].lastname,
            userLevelId: rs[0].user_level_id,
          }
          let token = jwt.sign({userProfile: payload});
          res.send({ok: true, token: token});
        } else {
          res.send({ok: false, error: 'ชื่อผู้ใช้งาน/รหัสผ่าน ไม่ถูกต้อง.'});
        }
      } catch (error) {
        res.send({ok: false, error: error.message});
      }
  } else {
    res.send({ok:false, error: 'ข้อมูลไม่ครบถ้วน.'});
  }
});

export default router;