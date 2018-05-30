"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoginModel {
    doLogin(db, username, password) {
        return db('tb_user AS u')
            .select('u.id AS user_id', 'u.officer_id', 'u.username', 'u.user_level_id', 'u.is_active', 'o.cid', 'o.firstname', 'o.lastname')
            .leftJoin('tb_officer AS o', 'u.officer_id', 'o.id')
            .where({ username: username, password: password })
            .limit(1);
    }
}
exports.LoginModel = LoginModel;
//# sourceMappingURL=login.js.map