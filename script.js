document.querySelectorAll(".question").forEach((question) => {
  const answer = question.querySelector(".answer");
  const transitionDuration = 300; // Waktu transisi yang sama dengan CSS (0.3s)

  question.addEventListener("click", () => {
    const isActive = question.classList.contains("active");

    // Tutup semua jawaban terlebih dahulu
    document.querySelectorAll(".question").forEach((q) => {
      const ans = q.querySelector(".answer");
      if (q !== question) {
        // Pastikan tidak memodifikasi yang sedang diklik
        q.classList.remove("active");
        ans.style.maxHeight = null; // Reset max-height
        ans.style.opacity = 0; // Set opacity to 0
        q.style.gap = "0"; // Reset gap
      }
    });

    if (!isActive) {
      question.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px"; // Set max-height sesuai dengan konten
      answer.style.opacity = 1; // Set opacity to 1
      question.style.gap = "20px"; // Atur gap saat aktif
    } else {
      // Toggle jawaban yang sama
      question.classList.remove("active");
      answer.style.maxHeight = null; // Tutup jawaban
      answer.style.opacity = 0; // Set opacity to 0
      question.style.gap = "0"; // Reset gap
    }
  });
});

const circle = document.querySelector(".cursor");
let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;
const delay = 0.1; // Adjust this for more or less delay

function updateCircle() {
  // Calculate the difference between current and target positions
  const dx = targetX - currentX;
  const dy = targetY - currentY;

  // Smoothly update the current position towards the target position
  currentX += dx * delay;
  currentY += dy * delay;

  // Set the position of the circle using transform
  circle.style.transform = `translate(${currentX}px, ${currentY}px)`;

  // Request the next animation frame
  requestAnimationFrame(updateCircle);
}

// Update the target position on mouse move
window.addEventListener("mousemove", (event) => {
  targetX = event.clientX - circle.offsetWidth / 2; // Center the circle
  targetY = event.clientY + window.scrollY - circle.offsetHeight / 2; // Center the circle and account for scrolling
});

// Start the animation
updateCircle();
