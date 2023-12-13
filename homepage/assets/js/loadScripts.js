var paths = [
    'jquery.js',
    'materialize.js',
    'globalVariable.js',
    'search.js',
    'swatchy.js',
    'calendar.js',
    'https://cdn.jsdelivr.net/npm/darkmode-js@1.5.7/lib/darkmode-js.min.js'
];

function loadScripts() {
    for (var i = 0; i < paths.length; i++) {
        var script = document.createElement('script');
        script.src = paths[i];
        document.head.appendChild(script);
    }
}

loadScripts();
