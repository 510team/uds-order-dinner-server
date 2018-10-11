
import date from '../util/date';

module.exports = class extends think.Model {
    async eat(openid) {
        const today = date.toFormat(new Date(), "yyyy-MM-dd");
        const isCanEat = this.canEat(openid);
        let ret = false;
        if(isCanEat){
            try{
                ret = await this.model('eat').add({ open_id: openid, eat_day: today });
            }catch(e){
                ret = false;
            }
        }
        console.log('ret............ ',ret);
        return ret;
    }
    async canEat(openid) {
        let canEat = false;
        const today = date.toFormat(new Date(), "yyyy-MM-dd")
        canEat = await this.model('eat').where({ open_id: openid, eat_day: today }).count() === 0;
        return canEat;
    }

};
