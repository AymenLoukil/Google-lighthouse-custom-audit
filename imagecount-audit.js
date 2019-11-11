
const Audit = require('lighthouse').Audit;

class ImageCount extends Audit {
    static get meta() {
        return {
            category: 'Image metrics',
			id:'imagecount-audit',
            title: 'Number of images',
            description: 'Find how many img elements on the page.',
            requiredArtifacts: ['ImageCount']
        };
    }

    static audit(artifacts) {
        const imageCount = artifacts.ImageCount;
        console.log("The page has " + imageCount + "images");
		const belowThreshold = imageCount <= 15;
        return {
            rawValue: imageCount,
			score: Number(belowThreshold),
			displayValue: imageCount,
        };
    }
}
module.exports = ImageCount;



