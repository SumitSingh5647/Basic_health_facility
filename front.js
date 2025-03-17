document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
      card.addEventListener('mouseover', () => {
          card.style.transform = 'scale(1.1)';
      });

      card.addEventListener('mouseleave', () => {
          card.style.transform = 'scale(1)';
      });
  });
});