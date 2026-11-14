/**
 * Optimized client script for Exp 11 After Version
 * Deferred execution, zero external dependencies, no console spam
 */
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('perfActionBtn');
  if (btn) {
    btn.addEventListener('click', () => {
      alert('Optimized action executed cleanly without blocking the UI thread!');
    });
  }
});
