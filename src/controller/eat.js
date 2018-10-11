const Api = require('./api.js');
module.exports = class extends Api {
    async indexAction() {
        const result = {
            success: false,
            errorMsg: '',
            data: {}
        };
        const status = await this.model('eat').eat(this.ctx.state.userInfo.openid);
        result.success = true;
        result.data.status = status;
        result.data.can_eat = status === "eated" ? false : true;
        return this.json(result);
    }


    async canEatAction() {
        const result = {
            success: false,
            errorMsg: '',
            data: {}
        };
        const can_eat = await this.model('eat').canEat(this.ctx.state.userInfo.openid);
        result.success = true;
        result.data.can_eat = can_eat;
        return this.json(result);
    }

    async peopleAction() {
        const result = {
            success: false,
            errorMsg: '',
            data: {}
        };
        const list = await this.model('eat').eatPeopleList();
        result.success = true;
        result.data.list = list;
        return this.json(result);
    }

};
