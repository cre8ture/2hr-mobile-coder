document.getElementById('download-button').addEventListener('click', function() {
    var iframeContent = document.getElementById('code-output').contentDocument.documentElement.outerHTML;
    var blob = new Blob([iframeContent], {type: 'text/html'});
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = 'output.html';
    link.click();
});