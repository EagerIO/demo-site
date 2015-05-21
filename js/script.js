var ready, addBanner, addOffButton, addOnButton, addNote, apps, play, playFromLocalStorageCurrentAppId, pathsEqual, ensurePath;

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
  } else {
    playFromLocalStorageCurrentAppId();
  }
});

window.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'photon-photos-demo:play') {
    play(event.data.appId);
  }
}, false);

apps = [
  {
    id: 'DvuKIoU8iTOt',
    alias: 'photoswipe',
    title: 'PhotoSwipe',
    metadata: {
      icon: {
        key: 'hIJSQ6fSVCcOXyZ8oye9_photo-swipe-icon.png'
      }
    },
    demoPath: '/photography/'
  },
  {
    id: 'fNjUnjurPXkD',
    alias: 'gumroad',
    title: 'Gumroad',
    metadata: {
      icon: {
        key: 'mwmGjbgMR6i7BJjysBWL_gumroad.png'
      }
    },
    demoPath: '/photography/'
  },
  {
    id: 'w-B2nEFkVIx7',
    alias: 'social-icons',
    title: 'Social Icons',
    metadata: {
      icon: {
        key: '3qpSgatQByxdP40iveDw_social-icons-icon.png'
      }
    },
    demoPath: '/photography/'
  },
  {
    id: 'eA9ULux0UOJP',
    alias: 'smartunderline',
    title: 'SmartUnderline',
    metadata: {
      icon: {
        key: 'vG072c9WT7qrCgEucqcz_smart-underline-icon.png'
      }
    },
    demoPath: '/blog/'
  },
  {
    id: 'BurROp-cWQ3Y',
    alias: 'like-button',
    title: 'Like Button',
    metadata: {
      icon: {
        key: '0AoPcpqqSRWvPRwQJugR_like-button-icon.png'
      }
    },
    demoPath: '/blog/thailand/'
  },
  {
    id: '8KqAj3D-rZkN',
    alias: 'disqus',
    title: 'Disqus',
    metadata: {
      icon: {
        key: '9DgPMbQaQzcwljSEAaqQ_disqus-icon.png'
      }
    },
    demoPath: '/blog/thailand/#disqus-demo'
  },
  {
    id: 'z1o4cnLQKenU',
    alias: 'typist',
    title: 'Typist',
    metadata: {
      icon: {
        key: '6Q8q8IjpSKVV34BAKmZU_typist-icon.png'
      }
    },
    demoPath: '/about/'
  },
  {
    id: 'AN_LdP2tOk0f',
    alias: 'hover',
    title: 'Hover',
    metadata: {
      icon: {
        key: 'ITZqwibSPa4EiVS3AaK9_hover-css-icon.png'
      }
    },
    demoPath: '/'
  },
  {
    id: 'PoIrgiLyzYcP',
    alias: 'animate',
    title: 'Animate',
    metadata: {
      icon: {
        key: 'aPPw3TGLRtqQgUwTb5is_animte-css-icon.png'
      }
    },
    demoPath: '/'
  }
];

play = function(appId) {
  var i, app;

  for (i = 0; i < apps.length; i++) {
    if (apps[i].id === appId) {
      app = apps[i];
    }
  }

  if (!app) {
    return;
  }

  if (!window.localStorage) {
    return;
  }

  window.localStorage.currentAppAlias = app.alias;
  if (ensurePath(app.demoPath)) {
    playFromLocalStorageCurrentAppId();
  }
};

playFromLocalStorageCurrentAppId = function() {
  if (!window.localStorage) {
    return;
  }

  if (window.localStorage.currentAppAlias) {
    document.documentElement.setAttribute('data-current-demo-app-alias', window.localStorage.currentAppAlias);
    delete window.localStorage.currentAppAlias;
  }
};

pathsEqual = function(a, b) {
  return a.replace(/\/$/, '') === b.replace(/\/$/, '');
};

ensurePath = function(path) {
  var pathMatch, sanitizedPath;

  pathMatch = location.href.match('photonphotos.github.io') ?
    location.href.match(/photonphotos\.github\.io(\/.*)/) :
    location.href.match(/photon\.photos(\/.*)/)
  ;

  if (pathMatch && pathMatch.length === 2) {
    sanitizedPath = pathMatch[1];
  }

  if (pathsEqual(sanitizedPath, path)) {
    return true;
  } else {
    navigatePath(path);
  }
};

navigatePath = function(path) {
  var firstPartMatch, sanitizedFirstPart;

  firstPartMatch = location.href.match('photonphotos.github.io') ?
    location.href.match(/(.*\/photonphotos\.github\.io)/) :
    location.href.match(/(.*\/photon\.photos)/)
  ;

  if (firstPartMatch && firstPartMatch.length === 2) {
    sanitizedFirstPart = firstPartMatch[1];
  }

  location.href = sanitizedFirstPart + path;
};
