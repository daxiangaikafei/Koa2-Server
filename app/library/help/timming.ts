import * as schedule from "node-schedule";

class Timming{
    constructor(){
        this.xunhuan = this.xunhuan.bind(this);
    }
    creatJob(callBack, time, warnTime) {
        let _this = this;
        schedule.scheduleJob(time, function () {
            console.log("。。。。", time);
            _this.xunhuan(callBack, warnTime);
        });
    }
    private xunhuan(callBack, warnTime) {
        return callBack().catch((err) => {
            let j = schedule.scheduleJob(warnTime, function () {
                console.info("补偿服务请求")
                callBack().then(() => {
                    j.cancel();
                }).catch((err) => {
                    console.log("000000000")
                })
            });
        })
    }
}

export default Timming;
// 定时器辅助方法