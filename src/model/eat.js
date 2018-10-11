
import date from '../util/date';

module.exports = class extends think.Model {
    async eat(openid) {
        const today = date.toFormat(new Date(), "yyyy-MM-dd");
        const isCanEat = await this.canEat(openid);
        think.logger.info('eat:isCanEat:' + isCanEat);
        let ret = '';
        if (isCanEat) {
            await this.model('eat').add({ open_id: openid, eat_day: today });
            ret = 'eated';
        } else {
            ret = await this.model('eat').where({ open_id: openid, eat_day: today }).delete();
            ret = 'uneated';
        }
        console.log('ret............ ', ret);
        return ret;
    }
    async canEat(openid) {
        let canEat = false;
        const today = date.toFormat(new Date(), "yyyy-MM-dd")
        canEat = await this.model('eat').where({ open_id: openid, eat_day: today }).count() === 0;
        return canEat;
    }

    async eatPeopleList() {
        let canEat = false;
        return await this.join({
            table: 'user',
            join: 'left',
            on: ['open_id', 'openid']
        }).select()
    }

};
