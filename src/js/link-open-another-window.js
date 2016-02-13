window.onload = function() {
  for (var i = 0; i < document.links.length; i++) {
    var ele = document.links[i];
    if (ele.href.match(/^http/)) {
      ele.target = "_blank";
    }
  }
}
