/**
 * SCAT (Systematic Cause Analysis Technique) Data
 * Source: Panduan_SCAT.xlsx - MASTER SCAT (2) Sheet
 * Version: 8.1
 */

const SCAT_DATA = {

  // ── INCIDENT TYPES (Tipe Kejadian) ──────────────────────────────────────────
  incidentTypes: {
    1:  { name: "Terbentur Pada/Ke", desc: "Berlari/Menabrak/Bertabrakan/Kandas/Terbentur", icon: "💥", risk: "high" },
    2:  { name: "Terkena Objek Bergerak", desc: "Dipukul Oleh Objek Yang Bergerak", icon: "⚡", risk: "high" },
    3:  { name: "Jatuh Dari Ketinggian", desc: "Orang/Peralatan/Material", icon: "⬇️", risk: "critical" },
    4:  { name: "Jatuh Di Permukaan Sama", desc: "Terpeleset Dan Jatuh/Tersandung", icon: "🚶", risk: "medium" },
    5:  { name: "Terjepit", desc: "Di, Pada, Antara atau Di Bawah", icon: "🗜️", risk: "high" },
    6:  { name: "Kontak Suhu Ekstrem", desc: "Panas/Dingin", icon: "🌡️", risk: "high" },
    7:  { name: "Kontak Dengan Listrik", desc: "Sengatan/Paparan Listrik", icon: "⚡", risk: "critical" },
    8:  { name: "Paparan Kebisingan", desc: "Tingkat Kebisingan Berbahaya", icon: "🔊", risk: "medium" },
    9:  { name: "Paparan Getaran", desc: "Getaran Mekanis Berbahaya", icon: "📳", risk: "medium" },
    10: { name: "Paparan Radiasi Pengion", desc: "Radioaktif/Sinar-X/Gamma", icon: "☢️", risk: "critical" },
    11: { name: "Tegangan Mekanis Berlebih", desc: "Kelebihan Beban/Tekanan Berlebih", icon: "⚙️", risk: "high" },
    12: { name: "Kontak Zat Berbahaya", desc: "Toksik/Korosif/Biologis/Viral", icon: "☠️", risk: "critical" },
    13: { name: "Kehilangan Penampungan", desc: "Kebocoran/Tumpahan Penampungan Utama", icon: "🛢️", risk: "high" },
    14: { name: "Pelepasan Lingkungan", desc: "Ke Udara/Air/Tanah", icon: "🌍", risk: "high" },
    15: { name: "Kebakaran", desc: "Kebakaran Kolam/Jet/Cepat", icon: "🔥", risk: "critical" },
    16: { name: "Ledakan", desc: "Awan Uap/Debu/Tekanan/BLEVE", icon: "💣", risk: "critical" },
    17: { name: "Kegagalan Peralatan Mekanik", desc: "Kerusakan Mesin/Alat Mekanik", icon: "🔧", risk: "high" },
    18: { name: "Kegagalan Sistem Listrik", desc: "Gangguan Jaringan/Sistem Listrik", icon: "🔌", risk: "high" },
    19: { name: "Kegagalan Instrumen", desc: "Kegagalan Logika/Rangkaian/Kontrol", icon: "📟", risk: "high" },
    20: { name: "Kegagalan Struktur Sipil", desc: "Runtuhan/Kerusakan Struktur", icon: "🏗️", risk: "critical" },
    21: { name: "Gangguan Proses", desc: "Operasi Abnormal/Gangguan Proses", icon: "⚠️", risk: "high" },
    22: { name: "Proses Tidak Stabil", desc: "Proses/Reaksi Tidak Stabil", icon: "🧪", risk: "critical" },
    23: { name: "Keluhan Pelanggan", desc: "Keluhan Pelanggan/Pemangku Kepentingan", icon: "📋", risk: "low" },
    24: { name: "Tindakan Kekerasan", desc: "Kekerasan di Tempat Kerja", icon: "🚨", risk: "high" },
  },

  // ── UNSAFE ACTIONS (Tindakan Tidak Aman) ────────────────────────────────────
  unsafeActions: {
    1:  "Mengoperasikan Peralatan Tanpa Wewenang",
    2:  "Gagal Memberi Informasi/Peringatan",
    3:  "Gagal Mengamankan",
    4:  "Mengoperasikan dengan Kecepatan yang Tidak Tepat",
    5:  "Membuat Perangkat Keselamatan Kritis Tidak Berfungsi",
    6:  "Menggunakan Alat/Peralatan/Mesin yang Cacat",
    7:  "Pengoperasian Alat/Peralatan/Mesin yang Tidak Tepat",
    8:  "Pemeliharaan Alat/Peralatan/Mesin yang Tidak Memadai",
    9:  "Menggunakan Bahan yang Salah/Tidak Tepat",
    10: "Gagal Menggunakan APD dengan Benar",
    11: "Pemuatan yang Salah",
    12: "Penempatan yang Tidak Tepat",
    13: "Pengangkatan yang Tidak Tepat",
    14: "Posisi yang Salah untuk Tugas",
    15: "Perilaku Tidak Tepat/Tidak Pantas",
    16: "Di Bawah Pengaruh Obat-obatan/Alkohol",
    17: "Gagal Mengikuti Prosedur/Instruksi",
    18: "Gagal Mengidentifikasi Bahaya",
    19: "Tindakan Tidak Standar Oleh Pihak Eksternal",
    20: "Gagal Mengidentifikasi Persyaratan Pelanggan/Stakeholder",
    21: "Gagal Memenuhi Persyaratan Pelanggan/Stakeholder",
    22: "Gangguan Sipil (Kerusuhan, Huru-hara, Perang)",
    23: "Mengemudi yang Tidak Tepat",
  },

  // ── UNSAFE CONDITIONS (Kondisi Tidak Aman) ──────────────────────────────────
  unsafeConditions: {
    24: "Kondisi Lantai/Permukaan yang Tidak Memadai",
    25: "Alat/Peralatan yang Cacat",
    26: "Alat/Peralatan yang Salah/Tidak Memadai",
    27: "Integritas Peralatan yang Tidak Memadai",
    28: "Gagal Mendeteksi/Mengukur",
    29: "Pengukuran Konversi Sinyal yang Salah",
    30: "Bahan yang Salah",
    31: "Komposisi Bahan/Gas yang Salah",
    32: "Penghalang/Pelindung yang Tidak Memadai",
    33: "Alat Pelindung Diri yang Salah/Tidak Memadai",
    34: "Ruang yang Terbatas untuk Bertindak",
    35: "Sistem Peringatan yang Tidak Memadai",
    36: "Adanya Atmosfer yang Mudah Terbakar/Meledak",
    37: "Adanya Bahan Berbahaya yang Tidak Sah",
    38: "Kebersihan/Penataan yang Buruk",
    39: "Tingkat Kebisingan di Atas Ambang Batas",
    40: "Bahaya Radiasi di Atas Ambang Batas",
    41: "Pencahayaan yang Tidak Cukup/Berlebihan",
    42: "Getaran di Atas Ambang Batas",
    43: "Suhu di Luar Batas",
    44: "Tekanan di Luar Batas",
    45: "Ventilasi yang Tidak Memadai",
    46: "Informasi yang Tidak Memadai",
    47: "Kondisi Cuaca yang Merugikan",
  },

  // ── ROOT CAUSES (Akar Penyebab) ─────────────────────────────────────────────
  rootCauses: {
    // Personal Factors
    1:  { name: "Kemampuan Fisik/Fisiologis yang Tidak Memadai", category: "personal" },
    2:  { name: "Kemampuan Mental/Psikologis yang Tidak Memadai", category: "personal" },
    3:  { name: "Stress Fisik/Fisiologis", category: "personal" },
    4:  { name: "Stress Mental/Psikologis", category: "personal" },
    5:  { name: "Kurangnya Kompetensi", category: "personal" },
    6:  { name: "Motivasi yang Tidak Tepat", category: "personal" },
    // Job/System Factors
    7:  { name: "Struktur Organisasi yang Tidak Jelas", category: "system" },
    8:  { name: "Kepemimpinan yang Tidak Memadai", category: "system" },
    9:  { name: "Pengawasan/Pembimbingan yang Tidak Memadai", category: "system" },
    10: { name: "Manajemen Perubahan yang Tidak Memadai", category: "system" },
    11: { name: "Manajemen Rantai Pasokan yang Tidak Memadai", category: "system" },
    12: { name: "Pemeliharaan/Inspeksi yang Tidak Memadai", category: "system" },
    13: { name: "Keausan/Beban yang Berlebihan", category: "system" },
    14: { name: "Alat/Peralatan/Mesin yang Tidak Memadai", category: "system" },
    15: { name: "Desain Produk/Layanan yang Tidak Memadai", category: "system" },
    16: { name: "Standar Kerja/Produksi yang Tidak Memadai", category: "system" },
    17: { name: "Komunikasi/Informasi yang Tidak Memadai", category: "system" },
  },

  // ── CORRECTIVE ACTIONS (Area Tindakan Perbaikan) ────────────────────────────
  correctiveActions: {
    1:  {
      name: "KEPEMIMPINAN",
      items: ["1.1 Tujuan dan Nilai","1.2 Sasaran","1.3 Kebijakan","1.4 Strategi","1.5 Keterlibatan Pemangku Kepentingan","1.6 Proses Bisnis","1.7 Risiko Bisnis","1.8 Akuntabilitas","1.9 Komitmen Manajemen","1.10 Kepemimpinan Keselamatan Proses"]
    },
    2:  {
      name: "PERENCANAAN DAN ADMINISTRASI",
      items: ["2.1 Perencanaan Bisnis","2.2 Perencanaan dan Kontrol Kerja","2.3 Pelacakan Tindakan","2.4 Dokumentasi Sistem Manajemen","2.5 Catatan","2.6 Perencanaan Keselamatan Proses"]
    },
    3:  {
      name: "EVALUASI RISIKO",
      items: ["3.1 Identifikasi dan Evaluasi Bahaya Kesehatan","3.2 Identifikasi dan Evaluasi Bahaya Keselamatan","3.3 Identifikasi dan Evaluasi Bahaya Keamanan","3.4 Identifikasi dan Evaluasi Bahaya Lingkungan","3.5 Identifikasi dan Evaluasi Ekspektasi Pelanggan","3.6 Evaluasi Risiko Tugas","3.7 Informasi Keselamatan Proses","3.8 Analisis Bahaya Proses"]
    },
    4:  {
      name: "SUMBER DAYA MANUSIA",
      items: ["4.1 Sistem Sumber Daya Manusia","4.2 Rekrutmen","4.3 Mengelola Kinerja Individu","4.4 Pengakuan dan Disiplin","4.5 Meninggalkan Organisasi","4.6 Manajemen Perubahan Organisasi","4.7 Sumber Daya Manusia Keamanan Proses"]
    },
    5:  {
      name: "KEPATUHAN",
      items: ["5.1 Regulasi","5.2 Persyaratan untuk Beroperasi","5.3 Kode dan Standar Industri","5.4 Pelaporan kepada Otoritas","5.5 Keamanan Informasi","5.6 Perlindungan Aset","5.7 Kepatuhan Keamanan","5.8 Keamanan Sistem Informasi","5.9 Privasi dan Kerahasiaan"]
    },
    6:  {
      name: "MANAJEMEN PROYEK",
      items: ["6.1 Proyek Awal","6.2 Perencanaan Proyek","6.3 Eksekusi Proyek","6.4 Evaluasi Proyek","6.5 Penutupan Proyek","6.6 Tinjauan Proyek Keamanan Proses"]
    },
    7:  {
      name: "KOMPETENSI PELATIHAN",
      items: ["7.1 Sistem Pelatihan","7.2 Analisis Pelatihan","7.3 Pelatihan Baru","7.4 Pelatihan Lanjutan","7.5 Pelatihan Kepemimpinan","7.6 Orientasi Umum/Induksi","7.7 Orientasi Pekerjaan/Induksi","7.8 Evaluasi Sistem Pelatihan"]
    },
    8:  {
      name: "KOMUNIKASI DAN PROMOSI",
      items: ["8.1 Rapat Manajemen","8.2 Rapat Kelompok","8.3 Komite Bersama/Konsil","8.4 Pembinaan","8.5 Pengakuan","8.6 Kampanye Promosi","8.7 Informasi Keselamatan saat Jauh dari Tempat Kerja","8.8 Kesadaran Keamanan Proses"]
    },
    9:  {
      name: "PENGENDALIAN RISIKO",
      items: ["9.1 Pengendalian Bahaya Kesehatan","9.2 Pengendalian Bahaya Keselamatan","9.3 Pengendalian Keamanan","9.4 Pengendalian Bahaya Lingkungan","9.5 Kontrol Kualitas Material dan Produk","9.6 Kontrol Proses dan Prosedur Operasi","9.7 Aturan","9.8 Izin Kerja","9.9 Tanda Peringatan dan Pemberitahuan","9.10 Alat Pelindung Diri","9.11 Kontrol Bahaya Proses","9.12 Prosedur Operasi untuk Mengendalikan Risiko Proses","9.13 Laporan Bahaya Utama"]
    },
    10: {
      name: "MANAJEMEN ASET",
      items: ["10.1 Program Pemeliharaan","10.2 Perencanaan dan Penjadwalan Pemeliharaan","10.3 Eksekusi Pemeliharaan","10.4 Tinjauan Pemeliharaan","10.5 Inspeksi Kondisi Umum","10.6 Tur Kondisi Fisik","10.7 Inspeksi Peralatan Khusus","10.8 Inspeksi Peralatan Sebelum Digunakan","10.9 Manajemen Perubahan Rekayasa","10.10 Peralatan Inspeksi, Pengukuran, dan Pengujian","10.11 Akuisisi dan Penjualan","10.12 Program Integritas Aset","10.13 Inspeksi Keamanan Proses"]
    },
    11: {
      name: "MANAJEMEN KONTRAKTOR/PENGADAAN",
      items: ["11.1 Seleksi Kontraktor/Pemasok","11.2 Operasi Kontraktor","11.3 Jaminan Kontraktor/Pemasok","11.4 Rantai Pasokan dan Pengadaan","11.5 Logistik","11.6 Pengelolaan Kontraktor di Area Proses"]
    },
    12: {
      name: "KESIAPAN DARURAT",
      items: ["12.1 Penilaian Kebutuhan Darurat","12.2 Rencana Darurat Situs","12.3 Rencana Darurat di luar Situs","12.4 Rencana Krisis","12.5 Rencana Kelangsungan Bisnis","12.6 Tinjauan Rencana Darurat","12.7 Komunikasi Darurat","12.8 Sistem Perlindungan Darurat","12.9 Pengendalian Energi","12.10 Tim Darurat","12.11 Latihan dan Simulasi","12.12 Pertolongan Pertama","12.13 Dukungan Medis","12.14 Bantuan Eksternal yang Terorganisir","12.15 Kesiapsiagaan untuk Kecelakaan Besar"]
    },
    13: {
      name: "PEMBELAJARAN DARI KEJADIAN",
      items: ["13.1 Sistem Pembelajaran dari Kejadian","13.2 Pembelajaran dari Keberhasilan","13.3 Partisipasi dalam Investigasi","13.4 Kondisi Hampir Terjadi Kecelakaan dan Kondisi Tidak Standar","13.5 Manajemen Keluhan","13.6 Pengumuman Kejadian","13.7 Kecelakaan di Luar Jam Kerja","13.8 Tindak Lanjut Tindakan","13.9 Verifikasi Pelaporan LFE","13.10 Analisa Kejadian","13.11 Tim Perbaikan"]
    },
    14: {
      name: "MONITORING RISIKO",
      items: ["14.1 Pemantauan Bahaya Kesehatan","14.2 Pemantauan Bahaya Keselamatan","14.3 Pemantauan Bahaya Keamanan","14.4 Pemantauan Bahaya Lingkungan","14.5 Kepuasan Pelanggan","14.6 Efektivitas Pemantauan","14.7 Survei Persepsi","14.8 Observasi Perilaku","14.9 Observasi Tugas","14.10 Audit","14.11 Pemantauan Bahaya Proses"]
    },
    15: {
      name: "HASIL DAN TINJAUAN",
      items: ["15.1 Hasil Bisnis","15.2 Tinjauan Manajemen","15.3 Pelaporan Kepada Pemangku Kepentingan","15.4 Manajemen Risiko Residual"]
    },
  },

  // ── RELATIONSHIP MATRICES (derived from Excel matrix) ───────────────────────
  // incidentType ID -> list of UA IDs
  incidentToUA: {
    1:  [1,2,3,4,5,6,7,14,16,17,19,22,23],
    2:  [1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,22,23],
    3:  [2,3,5,6,7,8,10,11,12,13,14,15,16,17,18,19],
    4:  [4,7,11,12,13,14,15,16,17,18,19],
    5:  [1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19],
    6:  [1,2,3,5,6,7,8,9,10,12,14,15,16,17,18,19],
    7:  [1,2,3,5,6,7,8,10,12,14,15,16,17,18,19],
    8:  [2,3,5,6,7,8,10,12,14,15,16,17,18,19],
    9:  [1,2,3,5,6,7,8,11,12,14,15,16,17,18,19],
    10: [1,2,3,5,6,7,8,10,12,14,15,16,17,18,19],    
    11: [1,2,3,4,5,6,7,8,9,11,12,13,14,17,18],
    12: [1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
    13: [1,2,3,5,6,7,8,9,11,12,13,15,16,17,18,19],
    14: [1,2,3,4,5,6,7,8,9,11,17,18,19,20,21],
    15: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,23],
    16: [1,2,3,4,5,6,7,8,9,11,15,16,17,18,19,20,21,22,23],
    17: [1,4,6,9,11,12,13,17,18],
    18: [1,4,6,9,11,12,13,17],
    19: [1,4,5,6,9,11,12,13,17],
    20: [1,2,3,4,5,6,7,9,11,12,14,17,18],
    21: [1,2,3,5,6,7,8,9,11,12,14,16,17,18,19],
    22: [1,2,5,6,7,8,9,11,12,13,14,16,17,18,19],
    23: [1,2,5,6,7,8,9,10,11,12,13,15,16,17,19,20,21],
    24: [15,16,17,18,19,22,23],
  },

  // incidentType ID -> list of UC IDs
  incidentToUC: {
    1:  [24,25,26,32,33,34,35,38,41,47],
    2:  [24,25,26,28,32,33,34,35,41,47],
    3:  [24,25,26,32,33,38,41,47],
    4:  [24,25,26,38,41,47],
    5:  [24,25,26,27,28,29,32,33,34,35,38,41,44,46,47],
    6:  [25,26,27,28,29,30,31,32,33,34,35,38,41,43,44,45,46,47],
    7:  [25,26,27,28,29,30,32,33,34,35,38,41,46,47],
    8:  [25,26,27,28,29,32,33,34,35,38,39,41,44,46,47],
    9:  [25,26,27,28,29,30,32,34,35,38,41,42,46,47],
    10: [25,26,27,28,29,32,33,34,35,36,37,38,40,41,43,45,46,47],
    11: [25,26,28,29,31,34,35,42,43,44,46,47],
    12: [25,26,27,28,29,30,31,32,33,34,35,37,38,41,44,45,47],
    13: [25,26,27,28,29,30,31,32,34,35,37,38,42,43,44,47],
    14: [25,26,27,28,29,30,31,32,34,35,37,38,43,44,46,47],
    15: [25,26,27,28,29,30,31,32,35,36,37,38,40,43,44,45,46,47],
    16: [25,26,27,28,29,30,31,32,35,36,37,38,40,43,44,45,46,47],
    17: [25,26,28,29,30,35,37,42,43,45,46,47],
    18: [25,26,28,29,30,35,37,42,43,45,46,47],
    19: [25,26,28,29,30,35,37,42,43,46,47],
    20: [25,26,28,29,30,34,35,38,42,43,44,46,47],
    21: [25,26,27,28,29,30,31,35,37,38,40,42,43,44,46],
    22: [25,26,27,28,29,30,31,34,35,38,40,42,43,44,46],
    23: [25,26,27,28,29,30,31,35,38,39,40,41,42,46,47],
    24: [32,35],
  },

  // UA ID -> list of RC IDs
  uaToRC: {
    1:  [2,4,5,6,7,8,9,14,15,16,17],
    2:  [1,2,3,4,5,6,7,8,9,11,13,16,17],
    3:  [1,2,3,4,5,6,8,9,11,13,16,17],
    4:  [2,3,4,5,6,8,9,10,14,15,16],
    5:  [2,4,5,6,7,8,9,10,12,17],
    6:  [2,3,4,5,6,8,9,10,11,12,13,14,15,16,17],
    7:  [1,2,3,4,5,6,7,8,9,10,11,13,14,15,16,17],
    8:  [3,4,5,6,7,8,9,10,12,13,14,15,16,17],
    9:  [4,5,6,7,8,9,10,11,12,13,14,15,16,17],
    10: [1,2,3,4,5,6,8,9,11,12,13,14,15,16,17],
    11: [1,2,3,4,5,6,8,9,10,11,12,13,14,15,16],
    12: [1,2,3,4,5,6,8,9,10,11,12,13,14,15,16],
    13: [1,2,3,4,5,6,8,9,10,11,12,14,15,16],
    14: [1,2,3,4,5,6,10,14,15,16,17],
    15: [2,3,4,5,6,7,8,9,16],
    16: [1,2,3,4,5,6,8,9,16],
    17: [1,2,3,4,5,6,7,8,9,11,16],
    18: [3,4,5,6,7,8,9,10,12,16],
    19: [6,7,8,9,10,11,16,17],
    20: [4,5,6,7,8,9,10,11,12,13,14,15,16,17],
    21: [4,5,6,7,8,9,10,11,12,13,14,15,16,17],
    22: [3,4,6,8,9,11,16,17],
    23: [5,6,8,11,12,16,17],    
  },
  ucToRC: {
    24: [10,12,13,14,16,17],
    25: [8,9,10,11,12,13,14,15],
    26: [3,4,5,6,9,10,11,12,13,14,16,17],
    27: [8,10,11,12,13,14,15,16],
    28: [1,2,3,4,5,6,8,9,10,12,13,14,15,16,17],
    29: [1,2,3,4,5,6,8,9,10,12,13,14,15,16,17],
    30: [8,9,10,11,12,13,14,15],
    31: [8,9,10,11,12,13,14,15,16,17],
    32: [5,8,9,10,11,12,13,14,15],
    33: [5,6,8,9,10,11,12,13,14,15],
    34: [8,9,11,16],
    35: [7,8,9,10,11,12,13,14,15,17],
    36: [5,6,7,8,9,10,11,12,13,14,15],
    37: [5,8,9,10,11,12,13,14,15,16,17],
    38: [6,7,8,9,10,12,16,17],
    39: [8,9,10,11,12,13,14,15,16,17],
    40: [8,9,10,11,12,13,14,15,16,17],
    41: [8,9,10,11,12,13,14,15,16,17],
    42: [6,8,9,10,11,12,13,14,15,16,17],
    43: [6,8,9,10,11,12,13,14,15,16,17],
    44: [6,8,9,10,11,12,13,14,15,16,17],
    45: [8,9,10,11,12,13,14,15,16,17],
    46: [5,8,9,10,11,12,17],
    47: [5,6,8,9,10,12,13,14,15,16,17],
  },

  // RC ID -> list of CA IDs (corrective action mapping)
  rcToCA: {
    1:  [1,3,4,5,7,8,9,11,13,14,15],
    2:  [1,2,3,4,5,7,8,9,10,11,13,14,15],
    3:  [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
    4:  [1,2,4,6,7,8,9,10,11,12,13,14,15],
    5:  [1,2,3,4,5,6,7,8,9,10,11,13,14,15],
    6:  [1,2,3,4,5,6,7,8,9,10,11,13,14,15],
    7:  [1,2,4,5,6,8,9,11,13,15],
    8:  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    9:  [1,2,4,5,6,7,8,9,11,13],
    10: [1,2,3,4,5,6,7,8,9,10,11,13,14,15],
    11: [1,2,3,4,5,6,8,9,10,11,13,14,15],
    12: [1,2,3,4,5,6,7,8,9,10,11,13,14,15],
    13: [1,2,3,4,5,7,8,9,10,11,13,14,15],
    14: [1,2,3,4,5,6,8,9,10,11,12,13,14,15],
    15: [1,2,3,5,6,7,9,10,11,13,14,15],
    16: [1,2,3,4,5,6,7,8,9,10,11,13,14,15],
    17: [1,2,3,4,5,6,7,8,9,10,11,13,14,15],
  },
};

// ── HELPER FUNCTIONS ──────────────────────────────────────────────────────────

/**
 * Get UAs relevant to an incident type
 */
function getUAsForIncident(incidentId) {
  const ids = SCAT_DATA.incidentToUA[incidentId] || [];
  return ids.map(id => ({ id, name: SCAT_DATA.unsafeActions[id] })).filter(x => x.name);
}

/**
 * Get UCs relevant to an incident type
 */
function getUCsForIncident(incidentId) {
  const ids = SCAT_DATA.incidentToUC[incidentId] || [];
  return ids.map(id => ({ id, name: SCAT_DATA.unsafeConditions[id] })).filter(x => x.name);
}

/**
 * Get RCs from selected direct causes (UA + UC)
 */
function getRCsFromDirectCauses(uaIds, ucIds) {
  const rcSet = new Set();
  uaIds.forEach(uaId => {
    const rcs = SCAT_DATA.uaToRC[uaId] || [];
    rcs.forEach(rc => rcSet.add(rc));
  });
  ucIds.forEach(ucId => {
    const rcs = SCAT_DATA.ucToRC[ucId] || [];
    rcs.forEach(rc => rcSet.add(rc));
  });
  // ✅ TAMBAHKAN RETURN
  return Array.from(rcSet).map(id => ({ id, ...SCAT_DATA.rootCauses[id] }));
}

/**
 * Get RCs relevant to a specific incident type (FALLBACK – sebaiknya tidak dipakai)
 */
function getRCsForIncident(incidentId) {
  // Karena incidentToRC tidak ada, kita fallback ke semua UA/UC dari incident tsb
  const uaIds = SCAT_DATA.incidentToUA[incidentId] || [];
  const ucIds = SCAT_DATA.incidentToUC[incidentId] || [];
  return getRCsFromDirectCauses(uaIds, ucIds);
}

/**
 * Get CAs relevant to selected root causes
 */
function getCAsForRCs(rcIds) {
  const caSet = new Set();
  rcIds.forEach(rcId => {
    const cas = SCAT_DATA.rcToCA[rcId] || [];
    cas.forEach(caId => caSet.add(caId));
  });
  return Array.from(caSet).sort((a,b) => a-b).map(id => ({
    id,
    ...SCAT_DATA.correctiveActions[id]
  })).filter(x => x.name);
}

/**
 * Get risk level color classes
 */
function getRiskBadge(risk) {
  const map = {
    low:      { label: "Rendah",   cls: "badge-low" },
    medium:   { label: "Sedang",   cls: "badge-medium" },
    high:     { label: "Tinggi",   cls: "badge-high" },
    critical: { label: "Kritis",   cls: "badge-critical" },
  };
  return map[risk] || map.medium;
}
