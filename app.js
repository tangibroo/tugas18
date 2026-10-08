// ===== DATA STATIS: edit bagian ini untuk mengganti isi website =====
const company = {
  name: "Tangibro",
  tagline: "Kami membuat produk digital yang nyata dan bisa dipakai.",
  about: "Tangibro adalah studio pengembangan perangkat lunak yang membantu bisnis kecil dan menengah membangun website, aplikasi, dan infrastruktur yang stabil.",
  address: "Jl. Contoh No. 10, Jakarta, Indonesia",
  email: "halo@tangibro.example",
  phone: "+62 812-0000-0000",
  hours: "Senin–Jumat, 09.00–17.00 WIB",
  stats: [["50+", "Proyek selesai"], ["30+", "Klien aktif"], ["5", "Tahun berjalan"]],
  services: [
    ["Pengembangan Website", "Company profile, toko online, dan landing page yang cepat dan responsif."],
    ["Aplikasi Web", "Sistem internal, dashboard, dan API sesuai alur kerja bisnis Anda."],
    ["Infrastruktur & DevOps", "Deploy, monitoring, dan otomasi server agar layanan tetap hidup."],
    ["Konsultasi Teknologi", "Pilih teknologi yang tepat sebelum menulis satu baris kode."]
  ],
  team: [
    ["Andi Pratama", "Founder & Lead Engineer"],
    ["Sari Wulandari", "UI/UX Designer"],
    ["Budi Santoso", "Backend Developer"],
    ["Rina Kartika", "DevOps Engineer"]
  ]
};

const card = (t, d) => `<div class="item"><h3>${t}</h3><p>${d}</p></div>`;

const pages = {
  beranda: {
    title: "Beranda",
    html: () => `
      <h1>${company.tagline}</h1>
      <p class="lead">${company.about}</p>
      <a class="btn" href="#/layanan">Lihat layanan</a>
      <div class="stats">${company.stats.map(([n, l]) => `<div><strong>${n}</strong><span>${l}</span></div>`).join("")}</div>`
  },
  tentang: {
    title: "Tentang",
    html: () => `
      <h1>Tentang ${company.name}</h1>
      <p class="lead">${company.about}</p>
      <h2>Cara kerja kami</h2>
      <div class="grid">
        ${card("Dengarkan dulu", "Kami memahami masalah bisnis sebelum menawarkan solusi.")}
        ${card("Bangun bertahap", "Hasil bisa dilihat di setiap tahap, bukan di akhir saja.")}
        ${card("Rawat setelah rilis", "Kami tetap mendampingi setelah produk digunakan.")}
      </div>`
  },
  layanan: {
    title: "Layanan",
    html: () => `<h1>Layanan</h1><p class="lead">Yang bisa kami kerjakan untuk Anda.</p>
      <div class="grid">${company.services.map(([t, d]) => card(t, d)).join("")}</div>`
  },
  tim: {
    title: "Tim",
    html: () => `<h1>Tim kami</h1><p class="lead">Orang-orang di balik ${company.name}.</p>
      <div class="grid">${company.team.map(([n, r]) =>
        `<div class="item"><div class="avatar">${n[0]}</div><h3>${n}</h3><p>${r}</p></div>`).join("")}</div>`
  },
  kontak: {
    title: "Kontak",
    html: () => `<h1>Hubungi kami</h1><p class="lead">Ceritakan kebutuhan Anda, kami balas dalam 1 hari kerja.</p>
      <dl class="contact">
        <dt>Alamat</dt><dd>${company.address}</dd>
        <dt>Email</dt><dd><a href="mailto:${company.email}">${company.email}</a></dd>
        <dt>Telepon</dt><dd>${company.phone}</dd>
        <dt>Jam kerja</dt><dd>${company.hours}</dd>
      </dl>`
  }
};

// ===== LOGIKA APLIKASI =====
const nav = document.getElementById("nav");
const content = document.getElementById("content");
const sidebar = document.getElementById("sidebar");

nav.innerHTML = Object.entries(pages)
  .map(([key, p]) => `<a href="#/${key}" data-key="${key}">${p.title}</a>`).join("");

function render() {
  const key = location.hash.replace("#/", "") || "beranda";
  const page = pages[key] || pages.beranda;
  const active = pages[key] ? key : "beranda";
  content.innerHTML = page.html();
  document.title = `${page.title} | ${company.name}`;
  nav.querySelectorAll("a").forEach(a => a.classList.toggle("active", a.dataset.key === active));
  sidebar.classList.remove("open");
  window.scrollTo(0, 0);
}

document.getElementById("menu-btn").onclick = () => sidebar.classList.toggle("open");
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("footer-contact").textContent = `${company.email} · ${company.phone}`;
window.addEventListener("hashchange", render);
render();
