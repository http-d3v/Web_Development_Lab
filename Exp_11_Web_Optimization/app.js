/**
 * Experiment 11: Performance Optimization Dashboard Logic
 * Student: Dev Kumar Tiwari (http-d3v | httpd3v)
 * 2nd Year B.Tech CSE (Data Science)
 */

document.addEventListener('DOMContentLoaded', () => {
  const viewButtons = document.querySelectorAll('.view-btn');
  const framesWrapper = document.getElementById('framesWrapper');

  viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      viewButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.dataset.view;
      framesWrapper.className = 'frames-grid';
      if (mode === 'before') {
        framesWrapper.classList.add('view-before');
      } else if (mode === 'after') {
        framesWrapper.classList.add('view-after');
      }
    });
  });
});
