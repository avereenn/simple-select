export function setCopyYear(selector) {
  document.querySelector(selector).textContent = new Date().getFullYear() + ' г.';
}