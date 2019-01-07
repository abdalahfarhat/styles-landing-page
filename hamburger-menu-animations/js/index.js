Array.from(document.getElementsByTagName('path')).map(function (path) {
    console.log(path.getTotalLength());
    var debugPath = path.cloneNode();
    debugPath.classList.add('line--debug');
    if (path.parentNode)
        path.parentNode.insertBefore(debugPath.cloneNode(), path);
});
var debugCheckbox = document.getElementById('debug');
debugCheckbox.addEventListener('change', function () {
    if (debugCheckbox.checked) {
        debugCheckbox.parentElement.classList.add('active');
    }
    else {
        debugCheckbox.parentElement.classList.remove('active');
    }
});
var currentActive = 0;
var checkboxes = document.querySelectorAll('.grid input');
var autoShow = setInterval(function () {
    checkboxes[currentActive % 4].checked = !checkboxes[currentActive % 4].checked;
    if (!checkboxes[currentActive % 4].checked)
        currentActive += 1;
}, 1000);
document.querySelector('.grid').addEventListener('click', function () {
    clearInterval(autoShow);
});