// =========================
// HEADER: Scroll e Toggle
// =========================
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const toggleBtn = document.getElementById('toggle-btn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('shrink');
      header.classList.remove('expanded');
    } else {
      header.classList.remove('shrink');
    }
  });

  toggleBtn.addEventListener('click', () => {
    header.classList.toggle('expanded');
  });
});

// =========================
// PRELOADER
// =========================
window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');
  const delay = 2500;

  setTimeout(() => {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }, delay);
});

// =========================
// SCROLL TEXT CHI SIAMO
// =========================
function revealOnScroll() {
  const texts = document.querySelectorAll('.scroll-text1');
  const text2 = document.querySelector('.scroll-text2');

  texts.forEach(text => {
    const rect1 = text.getBoundingClientRect();

    if (rect1.top < window.innerHeight - 100) {
      text.classList.add('visible');

      if (text2 && !text2.classList.contains('visible')) {
        setTimeout(() => {
          text2.classList.add('visible');
        }, 500);
      }
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// =========================
// SCROLL FOTO "CHI SIAMO"
// =========================
const observerChiSiamo = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

const grid = document.querySelector('.staggered-photo-grid');
if (grid) observerChiSiamo.observe(grid);

// =========================
// GRAFICI D3
// =========================
const data = [
  { label: "Soci Larinesi", value: 40 },
  { label: "Resto della Regione", value: 53 },
  { label: "Resto d'Italia", value: 4.5 },
  { label: "Estero", value: 2.5 },
];

const colors = ["#f4a900", "#aa0000"];
const width = 250;
const height = 250;
const radius = Math.min(width, height) / 2 - 20;

const chartContainer = d3.select("#chart");

function easeInQuad(t) {
  return t * t;
}

data.forEach((d, i) => {
  const pieDiv = chartContainer.append("div").attr("class", "pie-chart");
  const svg = pieDiv.append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

  const pie = d3.pie().value(d => d.value);
  const arcData = pie([d, { value: 100 - d.value }]);

  const arc = d3.arc()
    .innerRadius(radius * 0.7)
    .outerRadius(radius);

  svg.append("path")
    .datum({ startAngle: 0, endAngle: 2 * Math.PI })
    .attr("fill", "#333")
    .attr("d", arc);

  const coloredArc = svg.append("path")
    .datum(arcData[0])
    .attr("fill", colors[i % 2])
    .attr("stroke", "#222")
    .attr("stroke-width", 3)
    .attr("opacity", 0.9);

  const label = pieDiv.append("div").attr("class", "pie-label").text("0%");
  pieDiv.append("div").attr("class", "pie-subtitle").text(d.label);

  const duration = 1500;

  function animate(timeStart) {
    function frame(time) {
      const elapsed = time - timeStart;
      const t = Math.min(elapsed / duration, 1);
      const easedT = easeInQuad(t);

      const newEndAngle = 2 * Math.PI * d.value / 100 * easedT;
      coloredArc.datum({ startAngle: 0, endAngle: newEndAngle }).attr("d", arc);

      label.text(`${(d.value * easedT).toFixed(1)}%`);

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        label.text(`${d.value}%`);
      }
    }
    requestAnimationFrame(frame);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        pieDiv.classed("active", true);
        animate(performance.now());
        observer.unobserve(pieDiv.node());
      }
    });
  }, { threshold: 0.5 });

  observer.observe(pieDiv.node());
});

const titolo = document.querySelector(".grafico-titolo");
const titoloObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      titolo.classList.add("active");
      titoloObserver.unobserve(titolo);
    }
  });
}, { threshold: 0.5 });

titoloObserver.observe(titolo);

// =========================
// SCROLL BOX NOTIZIE
// =========================
const notizieBox = document.querySelector(".notizie-box");
const notizieObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      notizieBox.classList.add("active");
      notizieObserver.unobserve(notizieBox);
    }
  });
}, { threshold: 0.5 });

notizieObserver.observe(notizieBox);

// =========================
// SCROLL ANIMAZIONE FOTO CLUB
// =========================
document.addEventListener('DOMContentLoaded', function () {
  const images = document.querySelectorAll('.club-img');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  images.forEach(img => observer.observe(img));
});

document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.club-img');
  let currentIndex = 0;
  const delay = 3000; // 3 secondi

  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  setInterval(nextImage, delay);
});


// =========================
// SPONSOR SCROLL FOTO
// =========================


  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-track img');
  const totalSlides = slides.length;
  let currentIndex = 0;

  setInterval(() => {
    currentIndex++;
    if (currentIndex > totalSlides - 3) { // -3 perché ne mostriamo 3
      currentIndex = 0;
    }
    const slideWidth = slides[0].clientWidth;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }, 2500);

// =========================
// SPONSOR RIQUADRO
// =========================

 // Attiva l’animazione quando il box entra nello schermo
  document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.4 // Quando il 40% è visibile
    });

    const target = document.querySelector('.sponsor-box');
    if (target) observer.observe(target);
  });


// =========================
// PRELOADER  NOTIZIE
// =========================

window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader-notizie');
  if (!preloader) return;

  const delay = 2500; // 2.5 secondi prima di iniziare a scomparire

  setTimeout(() => {
    preloader.style.setProperty('opacity', '0', 'important');
    setTimeout(() => {
    preloader.style.setProperty('display', 'none', 'important');
    }, 500); // deve corrispondere alla durata della transition in CSS
  }, delay);
});

  
// =========================
// HEADER NOTIZIE: Scroll e Toggle
// =========================
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header-notizie');
  const toggleBtn = document.getElementById('toggle-btn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('shrink');
      header.classList.remove('expanded');
    } else {
      header.classList.remove('shrink');
    }
  });

  toggleBtn.addEventListener('click', () => {
    header.classList.toggle('expanded');
  });
});



// =========================
// PRELOADER  NEGOZIO
// =========================

window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader-negozio');
  if (!preloader) return;

  const delay = 2500; // 2.5 secondi prima di iniziare a scomparire

  setTimeout(() => {
    preloader.style.opacity = '0';
    setTimeout(() => {
    preloader.style.display = 'none';
}, 500); // deve corrispondere alla durata della transition in CSS
  }, delay);
});

  
// =========================
// HEADER NEGOZIO: Scroll e Toggle
// =========================
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header-negozio');
  const toggleBtn = document.getElementById('toggle-btn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('shrink');
      header.classList.remove('expanded');
    } else {
      header.classList.remove('shrink');
    }
  });

  toggleBtn.addEventListener('click', () => {
    header.classList.toggle('expanded');
  });
});
 
// =========================
// EFFETTO CARRELLO MAGLIE
// =========================

function showImage(dotElement, imageIndex) {
  const photoBox = dotElement.closest('.photo-box');
  const images = photoBox.querySelectorAll('.image-slider img');
  const dots = photoBox.querySelectorAll('.dot');

  // Nasconde tutte le immagini
  images.forEach(img => img.classList.remove('active'));

  // Mostra solo l'immagine selezionata
  if (images[imageIndex]) {
    images[imageIndex].classList.add('active');
  }

  // Aggiorna i pallini
  dots.forEach(dot => dot.classList.remove('active-dot'));
  dotElement.classList.add('active-dot');
}
