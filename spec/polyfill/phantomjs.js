// PhantomJS is missing the bind function, so this polyfill is necessary
// https://github.com/ariya/phantomjs/issues/10522
if (!Function.prototype.bind) {
  Function.prototype.bind = require('function-bind');
}

// Patch since PhantomJS does not implement click() on HTMLElement. In some
// cases we need to execute the native click on an element. However, jQuery's
// $.fn.click() does not dispatch to the native functions, so we can't use it
// in our implementations: $el[0].click() to correctly dispatch.
// http://stackoverflow.com/questions/15739263/phantomjs-click-an-element/17789929#17789929
if (!HTMLElement.prototype.click) {
  HTMLElement.prototype.click = function() {
    let e = document.createEvent('MouseEvent');
    e.initMouseEvent(
        'click',
        true, /*bubble*/
        true, /*cancelable*/
        window, null,
        0, 0, 0, 0, /*coordinates*/
        false, false, false, false, /*modifier keys*/
        0 /*button=left*/,
        null);
    this.dispatchEvent(e);
  };
}
