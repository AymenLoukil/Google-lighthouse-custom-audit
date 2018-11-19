/**
 * @license Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

const Audit = require('lighthouse').Audit;

const MAX_LOAD_TIME = 4000;



class LoadAudit extends Audit {
  static get meta() {
    return {
      id: 'heroimage-audit',
      title: 'hero image is loaded',
      failureTitle: 'Hero image is slow to load',
      description: 'Used to measure time from navigationStart to when the hero image' +
          ' is loaded.',

      // The name of the custom gatherer class that provides input to this audit.
      requiredArtifacts: ['TimeToHeroImg'],
    };
  }

  static audit(artifacts) {
    const loadMetrics = artifacts.TimeToHeroImg;
	
    // This score will be binary, so will get a red ✘ or green ✓ in the report.
    const belowThreshold = loadMetrics <= MAX_LOAD_TIME;

    return {
      rawValue: loadMetrics,
      // Cast true/false to 1/0
      score: Number(belowThreshold),
    };
  }
}
module.exports = LoadAudit;
