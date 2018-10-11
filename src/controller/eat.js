const Api = require('./api.js');
module.exports = class extends Api {
    async indexAction() {
        const result = {
            success: false,
            errorMsg: '',
            data: {}
        };
        const count = await this.model('eat').eat(this.ctx.state.userInfo.openid);
        result.success = true;
        result.data.has_eat = true;
        return this.json(result);
    }


    async canEatAction() {
        const result = {
            success: false,
            errorMsg: '',
            data:{}
        };
        const can_eat = await this.model('eat').canEat(this.ctx.state.userInfo.openid);
        result.success = true;
        result.data.can_eat = can_eat;
        return this.json(result);
    }

};
