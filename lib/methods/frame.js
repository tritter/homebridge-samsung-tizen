let WebSocketSecure = require('./wss');
let delay           = require('delay');

module.exports = class Frame extends WebSocketSecure {
    constructor(device) {
        super(device);
    }

    /**
     * Turn the TV Off
     * @return {Promise}
     */
    setStateOff() {
        return this.hold('KEY_POWER', 3500) && Promise.resolve();
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    /**
     * Show next artwork
     * @return {Promise}
     */
     showNextArt() {
        return new Promise(async (resolve, reject) => {
            await delay(5000);
            await this.click('KEY_RETURN'); //Back
            await delay(5000);
            const randomTimes = this.getRandomInt(4);
            for (let index = 0; index < randomTimes; index++) {
                await this.click('KEY_RIGHT'); //Navigate to the next picture (right)
                await delay(5000);
            }
            await this.click('KEY_ENTER'); //Select image
            return resolve();
        });
    }
}