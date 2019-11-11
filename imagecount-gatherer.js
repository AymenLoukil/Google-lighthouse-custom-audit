const Gatherer = require('lighthouse').Gatherer;


class ImageCount extends Gatherer {

    afterPass(options) {
        return options.driver.querySelectorAll('img').then(nodeList => {
            return nodeList.length;
        });
    }
}

module.exports = ImageCount;
