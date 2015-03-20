function loadDemo() {
  var staticOverlay = $('#render-demo-static');
  var demoOverlay = $('#render-demo-overlay');
  var pluginOverlay = $('#render-demo-pnacl');
  var statsOverlay = $('#render-demo-stats');

  staticOverlay.css('visibility', 'hidden');
  demoOverlay.css('visibility', 'hidden');
  pluginOverlay.css('visibility', 'visible');
  statsOverlay.css('visibility', 'visible').text('Loading demo...');

  $('<embed/>', {
    id: 'pnacl-module',
    name: 'pnacl-module',
    width: 450,
    height: 337,
    src: 'path-tracer.nmf',
    type: 'application/x-pnacl'
  }).bind('message', handleMessage).appendTo(pluginOverlay);
}

var startTime = new Date();

function handleMessage(event) {
  var text = "";

  var message = event.originalEvent;
  if (message.data === 1) {
    text = "1 iteration";
  } else {
    text = message.data + " iterations";
  }
  var curTime = new Date();
  text += " (" + getTimeString(curTime - startTime) + ")";

  var statsOverlay = $('#render-demo-stats');
  statsOverlay.text(text);
}

function getTimeString(duration) {
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;

  var days = Math.floor(duration / DAY);
  duration -= (days * DAY);

  var hours = Math.floor(duration / HOUR);
  duration -= (hours * HOUR);

  var minutes = Math.floor(duration / MINUTE);
  duration -= (minutes * MINUTE);

  var seconds = Math.floor(duration / SECOND);

  var formatString = "";

  if (days > 0) {
    formatString += (days + "d ");
  }

  if (hours > 0 || formatString.length > 0) {
    formatString += (hours + "h ");
  }

  if (minutes > 0 || formatString.length > 0) {
    formatString += (minutes + "min ");
  }

  formatString += (seconds + "s ");

  return formatString.slice(0, formatString.length - 1);
}

$(document).ready(function() {
  var demoStatic = $('#render-demo-static');
  var demoOverlay = $('#render-demo-overlay');

  if (demoStatic.length && demoOverlay.length) {
    // Check to see if PNaCl if available.
    if (navigator.mimeTypes['application/x-pnacl'] !== undefined) {
      demoOverlay.css('visibility', 'visible')
      demoOverlay.click(loadDemo);
    }
  }
});
