'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const crypto = require("crypto");
const login_1 = require("../models/login");
const jwt_1 = require("../models/jwt");
const router = express.Router();
const loginModel = new login_1.LoginModel();
const jwt = new jwt_1.Jwt();
router.get('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    res.send('login page.');
}));
router.post('/auth', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
        let encPassword = crypto
            .createHash('md5')
            .update(password)
            .digest('hex');
        try {
            let rs = yield loginModel.doLogin(req.db, username, encPassword);
            if (rs.length) {
                const payload = {
                    userId: rs[0].user_id,
                    username: rs[0].username,
                    firstName: rs[0].firstname,
                    lastName: rs[0].lastname,
                    userLevelId: rs[0].user_level_id,
                };
                let token = jwt.sign({ userProfile: payload });
                res.send({ ok: true, token: token });
            }
            else {
                res.send({ ok: false, error: 'ชื่อผู้ใช้งาน/รหัสผ่าน ไม่ถูกต้อง.' });
            }
        }
        catch (error) {
            res.send({ ok: false, error: error.message });
        }
    }
    else {
        res.send({ ok: false, error: 'ข้อมูลไม่ครบถ้วน.' });
    }
}));
exports.default = router;
//# sourceMappingURL=login.js.map