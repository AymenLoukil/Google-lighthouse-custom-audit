const Audit = require('lighthouse').Audit;
const MAX_Font_SIZE_KB = 100;
const NetworkRecords = require('../node_modules/lighthouse/lighthouse-core/computed/network-records.js');
class LoadAudit extends Audit {
  static get meta() {
    return {
      id: "size-audit",
      title: "Font bundle size",
      failureTitle: "Fonts size exceeds your threshold of 100 Kb",
      description: "Compares Fonts sizes with predefined thresholds.",
      requiredArtifacts: ["devtoolsLogs"]
    };
  }

  static async audit(artifacts, context) {
    const devtoolsLogs = artifacts.devtoolsLogs[Audit.DEFAULT_PASS];
    const records = await NetworkRecords.request(devtoolsLogs, context);

        let totalBytes = 0;

    records.forEach(record => {

      if (record.resourceType == 'Font') {
      console.log(record.url);
      totalBytes += record.transferSize;

      
    }
    });
    console.log("Font sizes" + totalBytes );

    const belowThreshold = totalBytes <= MAX_Font_SIZE_KB * 1024;


    return {
      rawValue: totalBytes,
      score: Number(belowThreshold),
      displayValue: (totalBytes / 1024).toFixed(1),
        };
  }

}


module.exports = LoadAudit;