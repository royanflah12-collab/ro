const scenes = [
  ["foto1.jpg", "Semua cerita indah dimulai dari sebuah pertemuan."],
  ["foto2.jpg", "Dan tanpa kusadari, kamu menjadi bagian dari banyak kenangan terindah."],
  ["foto3.jpg", "Bersamamu, hal sederhana terasa begitu istimewa."],
  ["foto4.jpg", "Terima kasih untuk setiap tawa, cerita, dan kebersamaan yang pernah kita lewati."],
  ["foto5.jpg", "Mengenalmu adalah sesuatu yang akan selalu aku syukuri."],
  ["foto6.jpg", "Thank you for always being here. I hope our story never ends, and I hope we stay together forever. ❤️"]
];

const bg = document.getElementById("bg");
const caption = document.getElementById("caption");
const progress = document.getElementById("progress");
const music = document.getElementById("music");

/* ===========================
   PLAY MUSIC ON FIRST CLICK
=========================== */

let started = false;

function startMusic() {
  if (started) return;
  started = true;
  music.play().catch(() => {});
}

window.addEventListener("click", startMusic);
window.addEventListener("touchstart", startMusic);

/* ===========================
   TYPEWRITER WITH SPACES
=========================== */

function showText(text) {
  caption.innerHTML = "";

  [...text].forEach((ch, i) => {

    const span = document.createElement("span");

    span.innerHTML = ch === " " ? "&nbsp;" : ch;

    span.style.opacity = "0";
    span.style.display = "inline-block";

    span.animate(
      [
        {
          opacity: 0,
          transform: "translateY(20px)",
          filter: "blur(5px)"
        },
        {
          opacity: 1,
          transform: "translateY(0px)",
          filter: "blur(0)"
        }
      ],
      {
        duration: 500,
        delay: i * 28,
        fill: "forwards",
        easing: "ease-out"
      }
    );

    caption.appendChild(span);

  });
}

/* ===========================
   HEARTS + SPARKLES
=========================== */

function spawnParticle(symbol) {

  const el = document.createElement("div");

  el.textContent = symbol;

  el.style.position = "fixed";
  el.style.left = Math.random() * 100 + "vw";
  el.style.top = "-30px";
  el.style.pointerEvents = "none";
  el.style.zIndex = "999";
  el.style.fontSize = (16 + Math.random() * 18) + "px";

  document.body.appendChild(el);

  el.animate(
    [
      {
        transform: "translateY(0) rotate(0deg)",
        opacity: 1
      },
      {
        transform: `translateY(110vh) translateX(${(Math.random()-0.5)*120}px) rotate(360deg)`,
        opacity: 0
      }
    ],
    {
      duration: 4500 + Math.random() * 2500,
      fill: "forwards",
      easing: "linear"
    }
  );

  setTimeout(() => el.remove(), 7000);
}

setInterval(() => spawnParticle("💖"), 350);
setInterval(() => spawnParticle("✨"), 500);

/* ===========================
   GALAXY CANVAS
=========================== */

const canvas = document.getElementById("galaxy");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}

resize();
window.addEventListener("resize", resize);

const stars = Array.from({ length: 220 }, () => ({
  x: Math.random() * innerWidth,
  y: Math.random() * innerHeight,
  r: Math.random() * 2 + 0.4,
  v: Math.random() * 0.25 + 0.05
}));

function drawGalaxy() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";

  for (const s of stars) {

    ctx.beginPath();

    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);

    ctx.fill();

    s.y += s.v;

    if (s.y > canvas.height) {
      s.y = -5;
      s.x = Math.random() * canvas.width;
    }

  }

  requestAnimationFrame(drawGalaxy);
}

drawGalaxy();

/* ===========================
   PHOTO STORY
=========================== */

let index = 0;

function renderScene() {

  bg.style.opacity = "0";

  setTimeout(() => {

    bg.src = scenes[index][0];

    bg.style.opacity = "1";

    bg.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.12)" }
      ],
      {
        duration: 7000,
        fill: "forwards",
        easing: "ease-out"
      }
    );

    showText(scenes[index][1]);

    progress.style.width =
      ((index + 1) / scenes.length * 100) + "%";

  }, 500);

}

renderScene();

setInterval(() => {

  index++;

  if (index >= scenes.length) {
    index = 0;
  }

  renderScene();

}, 7000);