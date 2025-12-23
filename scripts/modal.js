// Open modal with fade-in
settingsBtn.addEventListener("click", () => {
  modal.classList.add("show");
  document.body.style.overflow = "hidden"; // Prevent background scroll
});

// Close modal with fade-out
closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
  document.body.style.overflow = ""; // Restore scrolling
});

// Optional: click outside to close
window.addEventListener("click", e => {
  if (e.target === modal) modal.classList.remove("show");
  document.body.style.overflow = ""; // Restore scrolling
});