var getParams, ready;

getParams = function() {
  var index, param, paramBits, params, _i, _len;
  paramBits = document.location.search.substring(1).split('&');
  params = {};
  for (_i = 0, _len = paramBits.length; _i < _len; _i++) {
    param = paramBits[_i];
    index = param.indexOf('=');
    params[param.substring(0, index)] = decodeURIComponent(param.substring(index + 1));
  }
  return params;
};

ready = function(fn) {
  if (document.readyState != 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

ready(function(){
  if (getParams().eager) {
    Array.prototype.forEach.call(document.querySelectorAll('a[href]'), function(link){
      link.href = link.href + '?eager=true'
    });
  }
});
