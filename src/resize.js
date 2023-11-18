interact('.resizable:not(#codeAI)')
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    listeners: {
      move (event) {
        var target = event.target;
        var x = (parseFloat(target.getAttribute('data-x')) || 0);
        var y = (parseFloat(target.getAttribute('data-y')) || 0);

        // update the element's style
        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.transform = 'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      }
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: 'parent'
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 100, height: 50 }
      })
    ],

    inertia: true
  });

  var textareas = document.querySelectorAll('.resizable');

// textareas.forEach(function(textarea) {
//     textarea.addEventListener('click', function() {
//         // Remove the active class from all textareas
//         textareas.forEach(function(other) {
//             other.classList.remove('active');
//         });

//         // Add the active class to the clicked textarea
//         textarea.classList.add('active');
//     });
// });

var textareas = document.querySelectorAll('.resizable');

textareas.forEach(function(textarea) {
    textarea.addEventListener('click', function() {
        // Remove the active class from all textareas
        textareas.forEach(function(other) {
            other.classList.remove('active');
        });

        // Add the active class to the clicked textarea
        textarea.classList.add('active');
    });
});

document.getElementById('download-button').addEventListener('click', function() {
    var iframeContent = document.getElementById('code-output').contentDocument.documentElement.outerHTML;
    var blob = new Blob([iframeContent], {type: 'text/html'});
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = 'output.html';
    link.click();
});