// Reload buttons for the embedded live previews (website-in-website).
document.querySelectorAll('[data-reload]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var frame = document.getElementById(btn.getAttribute('data-reload'));
    if (!frame) return;
    var src = frame.getAttribute('src');
    frame.setAttribute('src', src);
    btn.textContent = 'Reloading…';
    setTimeout(function () { btn.textContent = 'Reload preview'; }, 1200);
  });
});
