import "./Prism Editor_files/bililiteRange";
import "./Prism Editor_files/bililiteRange.fancytext";
import "./Prism Editor_files/bililiteRange.undo";
import "./Prism Editor_files/`bililiteRange`.util";

var editor = document.querySelector('pre');
const ret = bililiteRange(editor)
bililiteRange.fancyText(ret._el, Prism.highlightElement);

// add the undo's
ret.undo(0).data().autoindent = true; // init
// ret.addEventListener('keydown', function (evt) {
//     // control z
//     if (evt.ctrlKey && evt.which == 90) bililiteRange.undo(evt);
//     // control y
//     if (evt.ctrlKey && evt.which == 89) bililiteRange.redo(evt);
//     // tab
//     if (evt.which == 9) {
//         ret.sendkeys('{tab}');
//         evt.returnValue = false;
//     }
// });

var ai = document.getElementById('autoindent');
ai.addEventListener('change', function () {
    ret.data().autoindent = this.checked;
});

var ln = document.getElementById('linenumber');
ln.addEventListener('change', function () {
    this.checked ? editor.setAttribute('data-linenumber', 0) : editor.removeAttribute('data-linenumber');
    Prism.highlightElement(editor);
});
