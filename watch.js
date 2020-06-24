let watch = require('node-watch');

watch('./src/pages', { recursive: true }, function(evt, name) {
    console.log('%s changed.', name);
    console.log(evt, 121121)
})