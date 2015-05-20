var ready, addBanner, addOffButton, addOnButton, addNote;

ready = function(fn) {
  if (document.readyState != 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
};

addBanner = function() {
  var banner = document.createElement('a');
  banner.className = 'eager-banner';
  banner.setAttribute('href', 'https://eager.io/example-site');
  document.body.appendChild(banner);
};

addOffButton = function() {
  var offButton = document.createElement('a');
  offButton.className = 'eager-off-button';
  offButton.setAttribute('href', location.href.match('photonphotos.github.io') ? location.href.replace('/photonphotos.github.io', '/photonphotos.github.io/without-eager') : location.href.replace('/photon.photos', '/photon.photos/without-eager'));
  document.body.appendChild(offButton);
};

addOnButton = function() {
  var onButton = document.createElement('a');
  onButton.className = 'eager-on-button';
  onButton.setAttribute('href', location.href.replace(/\/without\-eager/i, ''));
  document.body.appendChild(onButton);
};

addNote = function() {
  var note = document.createElement('div');
  note.className = 'eager-note';
  document.body.appendChild(note);
};

ready(function(){
  var withEager, inIframe;

  withEager = !!!location.href.match('/without-eager');
  inIframe = window.top !== window;

  if (withEager) {
    document.documentElement.className += ' with-eager';
  } else {
    document.documentElement.className += ' without-eager';
  }

  if (!inIframe) {
    if (withEager) {
      addBanner();
      addOffButton();
    } else {
      addNote();
      addOnButton();
    }
  }
});
