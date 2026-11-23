import React, { useState, useEffect } from "react";
import "./style.css";

const ARTICLES = [
  {
    id: "qa",
    category: "QA TESTING",
    date: "Sep — Okt 2026",
    readTime: "6 MIN READ",
    title: "Analisis Bug & Pengujian Sistem Nusa Global",
    excerpt:
      "Dokumentasi pengujian sebagai Quality Assurance pada sistem sertifikat online. Melacak bug pembuatan akun member, anomali refresh dashboard, hingga perbaikan tampilan kode HTML pada detail pembayaran di portal admin.",
    content: [
      {
        heading: "1. Pengujian Autentikasi & Sesi Dashboard",
        body: "Dalam proyek sistem sertifikat online Nusa Global, saya berperan sebagai Quality Assurance (QA). Pada pengujian awal, ditemukan bug pada fitur login serta pembuatan akun member. Selain itu, pengguna secara otomatis kembali ke halaman login setelah melakukan refresh pada dashboard. Setelah ditelusuri dan diperbaiki pada lingkungan lokal, sesi login dapat bertahan normal setelah halaman di-refresh.",
      },
      {
        heading: "2. Analisis Menu Ujian & Status Pending Pembayaran",
        body: "Pengujian dilanjutkan pada modul ujian dan transaksi pembayaran sertifikasi lama maupun baru. Ditemukan bug di mana pembayaran tidak dapat dilakukan pada sertifikasi baru. Hasil pengecekan dari sisi member dan portal admin menunjukkan bahwa kendala dipicu oleh status transaksi pending yang menggantung.",
      },
      {
        heading: "3. Audit Portal Administrator",
        body: "Pada pengujian portal admin, ditemukan bug berupa tampilnya tag kode HTML mentah pada halaman detail pembayaran, serta kendala fungsi perubahan status transaksi yang belum dapat dieksekusi oleh admin. Seluruh temuan dicatat sebagai bahan evaluasi tim pengembang.",
      },
    ],
  },
  {
    id: "waha",
    category: "BACKEND API",
    date: "Okt 2026",
    readTime: "8 MIN READ",
    title: "Integrasi WhatsApp Realtime dengan Docker & WAHA",
    excerpt:
      "Merancang alur komunikasi dari Kitagiat API ke Blazz API hingga WAHA. Menyelesaikan konflik port 8027/8028 dan memisahkan konfigurasi agar tidak mengganggu API utama perusahaan.",
    content: [
      {
        heading: "1. Konfigurasi Docker, Blazz API, & Penanganan Port",
        body: "Untuk mengaktifkan pengiriman notifikasi WhatsApp secara realtime pada sistem Kitagiat, saya menyiapkan Blazz API dan WAHA di lingkungan lokal menggunakan Docker. Port pada Blazz API diubah dari 8027 menjadi 8028 untuk menghindari konflik dengan Kitagiat API, diikuti dengan instalasi dependency Composer pada folder vendor Laravel.",
      },
      {
        heading: "2. Pemetaan Alur Integrasi End-to-End",
        body: "Melalui pemeriksaan route dan source code, dipetakan penggunaan WahaService sebagai penghubung antara Blazz API dan WAHA beserta pengaturan URL, API key, dan session default. Alur komunikasi yang dirancang adalah: Kitagiat API → Blazz API → WAHA → WhatsApp Penerima.",
      },
      {
        heading: "3. Isolasi dari API Utama",
        body: "Agar pengiriman pesan realtime tidak membebani atau mengubah sistem utama, konfigurasi dan mekanisme integrasi notifikasi WhatsApp dipisahkan dari API utama Kitagiat sehingga berjalan secara mandiri dan aman.",
      },
    ],
  },
  {
    id: "email",
    category: "BACKEND API",
    date: "Sep 2026",
    readTime: "5 MIN READ",
    title: "Pengembangan Backend Laravel & Notifikasi Email Mail Hog",
    excerpt:
      "Menyusun struktur database, API, dan autentikasi token pada sistem kenaikan kelas. Menguji pengiriman email lokal dengan Mail Hog hingga notifikasi realtime berhasil diterima oleh akun orang tua.",
    content: [
      {
        heading: "1. Struktur Database, API, & Hak Akses Role",
        body: "Pengembangan diawali dengan mempelajari fitur admin pada modul kenaikan kelas serta hak akses setiap role pengguna. Setelah menyelesaikan kendala token autentikasi lokal pada framework Laravel, saya menyusun keterkaitan antara database, API, Docker, dan backend Laravel.",
      },
      {
        heading: "2. Pengujian Lokal Menggunakan Mail Hog",
        body: "Sistem dihubungkan dengan layanan Mail Hog sebagai lingkungan pengujian email lokal. Struktur, format, dan tampilan template email juga diperbaiki agar pesan notifikasi tampil rapi dan sesuai standar sistem.",
      },
      {
        heading: "3. Pengiriman Realtime ke Akun Orang Tua",
        body: "Setelah mengatasi kendala antrean pengiriman notifikasi realtime, saya mengidentifikasi dan membuat akun orang tua di dalam sistem untuk pengujian menyeluruh hingga seluruh email dipastikan terkirim secara realtime ke akun tujuan.",
      },
    ],
  },
  {
    id: "docker",
    category: "INFRASTRUKTUR",
    date: "Agu — Sep 2026",
    readTime: "4 MIN READ",
    title: "Adaptasi Lingkungan Kerja, Docker & Kubernetes",
    excerpt:
      "Catatan awal magang mulai dari produksi konten video internal, sesi materi bersama owner mengenai penerapan Docker dan keamanan website, hingga konfigurasi server.",
    content: [
      {
        heading: "1. Budaya Kerja & Produksi Video Promosi Internal",
        body: "Setiap aktivitas harian diawali dengan piket pagi dan ditutup dengan piket sore untuk menjaga kenyamanan ruang kerja. Di minggu awal, saya mempelajari profil software house, menyusun storyboard, mengambil footage b-roll, serta menyunting video promosi internal perusahaan.",
      },
      {
        heading: "2. Pembekalan Docker & Keamanan Jaringan",
        body: "Sebagai persiapan proyek, saya mempelajari dasar penggunaan Docker serta mengikuti sesi materi langsung bersama owner perusahaan mengenai manajemen kontainer Docker dan aspek keamanan jaringan (network security) pada sistem website.",
      },
      {
        heading: "3. Konfigurasi Server & Identitas Visual",
        body: "Selain kontainerisasi, saya mempelajari proses instalasi dan konfigurasi server serta memperbarui konfigurasi favicon pada sistem website yang sedang dikembangkan.",
      },
    ],
  },
];

const CATEGORIES = ["ALL STORIES", "QA TESTING", "BACKEND API", "INFRASTRUKTUR"];

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState("ALL STORIES");
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("satya_theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    document.documentElement.setAttribute("data-theme", nextMode ? "dark" : "light");
    localStorage.setItem("satya_theme", nextMode ? "dark" : "light");
  };

  const filteredArticles =
    activeCategory === "ALL STORIES"
      ? ARTICLES
      : ARTICLES.filter((art) => art.category === activeCategory);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="page-wrapper">
      {/* NAVBAR */}
      <nav className="top-nav">
        <div className="nav-inner">
          <a href="#home" className="brand-logo">
            SATYA NATHA<span className="dot-blue">.</span>
          </a>

          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#blog">Blog</a>
          </div>

          <div className="nav-actions">
            <a
              href="https://github.com/SatyaNatha"
              target="_blank"
              rel="noreferrer"
              className="github-pill"
            >
              <i className="fa-brands fa-github"></i> @SatyaNatha
            </a>
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              <i className={darkMode ? "fa-solid fa-sun" : "fa-regular fa-moon"}></i>
            </button>
          </div>
        </div>
      </nav>

      <main className="main-container" id="home">
        {/* HERO BANNER */}
        <section className="hero-section">
          <div className="hero-quote">“</div>
          <div className="hero-banner">
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <div className="intern-pill">
                <span className="status-dot"></span> SOFTWARE HOUSE INTERN
              </div>

              <h1 className="hero-title">
                PERSONAL
                <br />
                BLOG<span className="dot-blue">.</span>
              </h1>

              <div className="author-pill">
                <span className="chevron-circle">
                  <i className="fa-solid fa-chevron-right"></i>
                </span>
                <span>I Nyoman Putra Satya Natha</span>
              </div>

              <div className="hero-bottom-row">
                <p className="hero-description">
                  Dokumentasi rekayasa sistem, pengembangan API terstruktur,
                  integrasi multi-layanan realtime, dan penjaminan mutu
                  perangkat lunak pada lingkungan produksi.
                </p>

                <div className="hero-Right-meta">
                  <span className="meta-small">INTERNSHIP DOCUMENTATION</span>
                  <h2 className="meta-role">
                    Backend &amp; QA
                    <br />
                    Engineer 2026
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DIVIDER 01: ABOUT */}
        <div className="section-bar" id="about">
          <div className="section-bar-left">
            <span className="num-badge">01</span>
            <h2 className="bar-title">ABOUT</h2>
          </div>
          <div className="bar-line"></div>
          <span className="bar-circle">
            <i className="fa-solid fa-arrow-right"></i>
          </span>
        </div>

        {/* ABOUT SECTION */}
        <section className="about-grid">
          {/* LEFT COLUMN */}
          <div className="about-left-col">
            <div className="navy-profile-card">
              <div className="navy-circle-deco"></div>
              <div className="navy-card-bottom">
                <span className="dev-tag">DEV // QA PROFILE</span>
                <h3 className="navy-name">
                  SATYA
                  <br />
                  NATHA<span className="dot-blue">.</span>
                </h3>
                <p className="navy-univ">
                  Universitas Pendidikan Ganesha • FTK
                </p>
              </div>
            </div>

            <div className="brutal-card contact-card">
              <div className="contact-header">
                <div className="contact-icon-box">
                  <i className="fa-solid fa-qrcode"></i>
                </div>
                <div>
                  <h4>CONTACT</h4>
                  <p>Available for collaboration &amp; discussion</p>
                </div>
              </div>

              <ul className="contact-list">
                <li>
                  <i className="fa-regular fa-envelope"></i>
                  <a href="mailto:putra.satya@student.undiksha.ac.id">
                    putra.satya@student.undiksha.ac.id
                  </a>
                </li>
                <li>
                  <i className="fa-brands fa-github"></i>
                  <a
                    href="https://github.com/SatyaNatha"
                    target="_blank"
                    rel="noreferrer"
                  >
                    github.com/SatyaNatha
                  </a>
                </li>
                <li>
                  <i className="fa-brands fa-linkedin"></i>
                  <a
                    href="https://linkedin.com/in/i-nyoman-putra-satya-natha"
                    target="_blank"
                    rel="noreferrer"
                  >
                    in/i-nyoman-putra-satya-natha
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="about-right-col">
            <h2 className="hello-heading">
              HELLO<span className="dot-blue">.</span>
            </h2>

            <p className="about-paragraph">
              Saya <strong>I Nyoman Putra Satya Natha</strong>, mahasiswa
              Fakultas Teknik dan Kejuruan yang mendalami bidang Ilmu Komputer.
              Saya memiliki ketertarikan besar dalam membangun sistem{" "}
              <em>backend</em> yang terstruktur, mengelola integrasi API, serta
              memastikan kualitas aplikasi sebelum digunakan oleh pengguna.
            </p>

            <p className="about-paragraph">
              Selama menjalani program magang di{" "}
              <strong>Saka Teknologi Indonesia</strong> (Agustus – Desember
              2026), saya mengemban dua tanggung jawab utama: mengembangkan
              fitur notifikasi terintegrasi (Email &amp; WhatsApp API) pada
              sistem <strong className="link-underline">Kitagiat</strong>, serta
              bertindak sebagai <em>Quality Assurance</em> (QA) untuk menguji
              sistem sertifikat <em>online</em> baru perusahaan yaitu{" "}
              <strong className="link-underline">Nusa Global</strong>.
            </p>

            {/* EDUCATION BOX */}
            <div className="education-wrapper">
              <div className="brutal-card education-card">
                <span className="tiny-label">EDUCATION</span>
                <div className="edu-row">
                  <span className="badge-outline-blue">2023 - PRESENT</span>
                  <div className="edu-info">
                    <h4>Fakultas Teknik &amp; Kejuruan</h4>
                    <p>
                      Mahasiswa Pendidikan Teknik Informatika / Ilmu Komputer
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* WORKING EXPERIENCE */}
            <div className="exp-section">
              <span className="tiny-label">WORKING EXPERIENCE</span>
              <div className="exp-grid">
                <div className="brutal-card exp-card">
                  <span className="badge-light-blue">
                    AGUSTUS - DESEMBER 2026
                  </span>
                  <h4>Backend Developer (Sistem Kitagiat)</h4>
                  <span className="exp-company">Software House</span>
                  <p>
                    Menyusun backend dengan Laravel, menguji pengiriman email
                    lokal via Mail Hog, serta mengintegrasikan notifikasi
                    WhatsApp realtime menggunakan Blazz API, WAHA, dan Docker.
                  </p>
                  <div className="hashtag-row">
                    <span>#Laravel</span>
                    <span>#API</span>
                    <span>#Docker</span>
                  </div>
                </div>

                <div className="brutal-card exp-card">
                  <span className="badge-light-blue">
                    SEPTEMBER - OKTOBER 2026
                  </span>
                  <h4>Quality Assurance (Sistem Nusa Global)</h4>
                  <span className="exp-company">Software House</span>
                  <p>
                    Menguji sistem sertifikat online secara menyeluruh, melacak
                    bug autentikasi login, sesi dashboard, modul ujian, serta
                    perbaikan alur transaksi pembayaran member dan portal admin.
                  </p>
                  <div className="hashtag-row">
                    <span>#BugTracking</span>
                    <span>#Testing</span>
                    <span>#QAWebApp</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DIVIDER 02: TECH BLOG */}
        <div className="section-bar" id="blog">
          <div className="section-bar-left">
            <span className="num-badge dark">02</span>
            <h2 className="bar-title">TECH BLOG</h2>
          </div>
          <div className="bar-line"></div>
          <span className="bar-circle">
            <i className="fa-solid fa-chevron-right"></i>
          </span>
        </div>

        {/* TECH BLOG SECTION */}
        <section className="blog-section">
          <div className="blog-header-center">
            <span className="quote-faint">“</span>
            <h2 className="blog-main-title">
              TECH <span className="text-blue">BLOG.</span>
            </h2>
            <p className="blog-subtitle">
              CATATAN TEKNIS &amp; DOKUMENTASI EKSPERIMEN MAGANG
            </p>

            <div className="category-pills">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`cat-pill ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="blog-cards-grid">
            {filteredArticles.map((art) => (
              <article
                key={art.id}
                className="brutal-card blog-card-item"
                onClick={() => setSelectedArticle(art)}
              >
                <div className="blog-card-top">
                  <span className="badge-light-blue">{art.category}</span>
                  <span className="blog-card-date">{art.date}</span>
                </div>

                <h3 className="blog-card-title">{art.title}</h3>
                <p className="blog-card-excerpt">{art.excerpt}</p>

                <div className="blog-card-footer">
                  <span className="read-time">{art.readTime}</span>
                  <button className="read-story-btn">
                    Read Story <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bottom-footer">
        <div className="footer-inner">
          <p>
            © 2026 <strong>I Nyoman Putra Satya Natha</strong>. Dokumentasi
            Magang Software House.
          </p>
          <button onClick={scrollToTop} className="back-top-btn">
            Back to Top <i className="fa-solid fa-arrow-up"></i>
          </button>
        </div>
      </footer>

      {/* MODAL ARTIKEL */}
      {selectedArticle && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="brutal-card modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setSelectedArticle(null)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="blog-card-top">
              <span className="badge-light-blue">
                {selectedArticle.category}
              </span>
              <span className="blog-card-date">{selectedArticle.date}</span>
            </div>
            <h2 className="modal-article-title">{selectedArticle.title}</h2>
            <div className="modal-article-content">
              {selectedArticle.content.map((sec, idx) => (
                <div key={idx} className="modal-section-block">
                  <h4>{sec.heading}</h4>
                  <p>{sec.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}