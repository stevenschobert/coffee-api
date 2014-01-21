var express = require('express'),
    app = express(),
    coffeeBear = require('coffee-bear');

// configuration
app.set('port', process.env.PORT || 5000);
app.use(express.logger());

app.get('/api/v1/measurements/:cups?', function (req, res) {
  coffeeBear(function (err, data) {
    var cups = req.params.cups;

    if (err) { res.json(500, {error: err}); }

    if (cups === undefined) {
      res.json(data);
      return;
    }

    if (data[cups] !== undefined) {
      res.json(data[cups]);
      return;
    }

    res.json(404, {error: 'Measurement not found' });
  });
});

app.listen(app.get('port'), function () {
  console.log('listening on port ' + app.get('port'));
});
