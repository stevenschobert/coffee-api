(function() {
  'use strict';

  // dependencies
  var request = require('request'),
      STATUS_CODES = require('http').STATUS_CODES,
      cheerio = require('cheerio'),

      tableToMeasurements = function tableToMeasurements (table) {
        var cupRows = table.find('tr').slice(3,-1),
            coffeeNames = ['ounces', 'grams', 'teaspoons', 'tablespoons', 'cups'],
            waterNames = ['fluidounces', 'cups', 'pints', 'quarts', 'halfgallons', 'milliliters', 'liters'],
            cups = {};

        cupRows.each(function (i, elem) {
          var cells = cheerio(elem).find('td'),
              coffee = cells.slice(1, 6),
              water = cells.slice(6, cells.length);

          cups[i+1] = { 'coffee': {}, 'water': {} };

          coffee.each(function (j, elem) {
            cups[i+1].coffee[coffeeNames[j]] = cheerio(elem).text();
          });
          water.each(function (j, elem) {
            cups[i+1].water[waterNames[j]] = cheerio(elem).text();
          });
        });

        return cups;
      },

      brew = function brew (cb) {
        var pour = function pour (err, res, body) {
          var $, standard;

          if (err) {
            return cb(err);
          }

          if (res.statusCode !== 200) {
            return cb(new Error(STATUS_CODES[res.statusCode]));
          }

          $ = cheerio.load(body);
          standard = $('#standard').parent().next();
          //connoisseur = $('#connoisseur').parent().next();

          cb(null, tableToMeasurements(standard));
        };

        request('http://blackbearcoffee.com/resources/83', pour);
      };

  module.exports = brew;
})();
