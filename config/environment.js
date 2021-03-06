'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'tepacheweb',
    environment,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      FEATURES: {},
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    'ember-cli-google': {
      analytics: {
        version: 'v4',
        measurementId: 'G-XXXXXXXXXX',
      },
    },

    APP: {},
  };

  if (environment === 'development') {
    ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    ENV.locationType = 'none';

    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    ENV.liveMode = process.env.LIVE_MODE || false;
    ENV['ember-cli-google'] = {
      analytics: {
        version: 'v4',
        measurementId: process.env.GOOGLE_MEASUREMENT_ID,
      },
    };
  }

  return ENV;
};
