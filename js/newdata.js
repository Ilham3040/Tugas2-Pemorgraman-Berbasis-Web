var app = new Vue({
  el: '#app',
  data: {
    upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
    kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
    pengirimanList: [
      { kode: "REG", nama: "Reguler (3-5 hari)" },
      { kode: "EXP", nama: "Ekspres (1-2 hari)" }
    ],
    paket: [
      { kode: "PAKET-UT-001", nama: "PAKET IPS Dasar", isi: ["EKMA4116", "EKMA4115"], harga: 120000 },
      { kode: "PAKET-UT-002", nama: "PAKET IPA Dasar", isi: ["BIOL4201", "FISIP4001"], harga: 140000 }
    ],
    stok: [
      {
        kode: "EKMA4116",
        judul: "Pengantar Manajemen",
        kategori: "MK Wajib",
        upbjj: "Jakarta",
        lokasiRak: "R1-A3",
        harga: 65000,
        qty: 28,
        safety: 20,
        catatanHTML: "<em>Edisi 2024, cetak ulang</em>"
      },
      {
        kode: "EKMA4115",
        judul: "Pengantar Akuntansi",
        kategori: "MK Wajib",
        upbjj: "Jakarta",
        lokasiRak: "R1-A4",
        harga: 60000,
        qty: 7,
        safety: 15,
        catatanHTML: "<strong>Cover baru</strong>"
      },
      {
        kode: "BIOL4201",
        judul: "Biologi Umum (Praktikum)",
        kategori: "Praktikum",
        upbjj: "Surabaya",
        lokasiRak: "R3-B2",
        harga: 80000,
        qty: 12,
        safety: 10,
        catatanHTML: "Butuh <u>pendingin</u> untuk kit basah"
      },
      {
        kode: "FISIP4001",
        judul: "Dasar-Dasar Sosiologi",
        kategori: "MK Pilihan",
        upbjj: "Makassar",
        lokasiRak: "R2-C1",
        harga: 55000,
        qty: 2,
        safety: 8,
        catatanHTML: "Stok <i>menipis</i>, prioritaskan reorder"
      },
      {
        kode: "ESPA4122",
        judul: "Matematika Ekonomi",
        kategori: "MK Wajib",
        upbjj: "Surabaya",
        lokasiRak: "R3-B3",
        harga: 70000,
        qty: 150,
        safety: 30,
        catatanHTML: "<span>Edisi terbaru revisi</span>"
      },
      {
        kode: "ESPA4110",
        judul: "Pengantar Ekonomi Makro",
        kategori: "MK Wajib",
        upbjj: "Jakarta",
        lokasiRak: "R1-A5",
        harga: 75000,
        qty: 220,
        safety: 25,
        catatanHTML: "<em>Buku materi pokok utama</em>"
      },
      {
        kode: "MKWU4108",
        judul: "Bahasa Indonesia",
        kategori: "MK Wajib",
        upbjj: "Makassar",
        lokasiRak: "R2-C2",
        harga: 50000,
        qty: 310,
        safety: 40,
        catatanHTML: "<strong>Wajib untuk semua prodi</strong>"
      },
      {
        kode: "EKMA4111",
        judul: "Pengantar Bisnis",
        kategori: "MK Wajib",
        upbjj: "Padang",
        lokasiRak: "R4-D1",
        harga: 68000,
        qty: 185,
        safety: 20,
        catatanHTML: "<span>Sesuai kurikulum baru</span>"
      }
    ],
    tracking: {
      "DO2025-0001": {
        nim: "123456789",
        nama: "Rina Wulandari",
        status: "Dalam Perjalanan",
        ekspedisi: "JNE",
        tanggalKirim: "2025-08-25",
        paket: "PAKET-UT-001",
        total: 120000,
        perjalanan: [
          { waktu: "2025-08-25 10:12:20", keterangan: "Penerimaan di Loket: TANGSEL" },
          { waktu: "2025-08-25 14:07:56", keterangan: "Tiba di Hub: JAKSEL" },
          { waktu: "2025-08-26 08:44:01", keterangan: "Diteruskan ke Kantor Tujuan" }
        ]
      },
      "DO2025-0002": {
        nim: "987654321",
        nama: "Budi Santoso",
        status: "Dalam Perjalanan",
        ekspedisi: "Pos Indonesia",
        tanggalKirim: "2025-08-26",
        paket: "PAKET-UT-002",
        total: 140000,
        perjalanan: [
          { waktu: "2025-08-26 09:00:00", keterangan: "Penerimaan di Loket: SURABAYA" },
          { waktu: "2025-08-26 13:15:00", keterangan: "Diteruskan ke Kantor Tujuan" }
        ]
      },
      "DO2025-0003": {
        nim: "456789123",
        nama: "Dewi Lestari",
        status: "Selesai Antar",
        ekspedisi: "JNE",
        tanggalKirim: "2025-08-25",
        paket: "PAKET-UT-001",
        total: 120000,
        perjalanan: [
          { waktu: "2025-08-25 08:30:00", keterangan: "Penerimaan di Loket: DENPASAR" },
          { waktu: "2025-08-26 10:00:00", keterangan: "Tiba di Hub: DENPASAR" },
          { waktu: "2025-08-26 14:20:00", keterangan: "Selesai Antar. Penerima: Dewi Lestari" }
        ]
      }
    },
    dataPengguna: {
      1: { userId: 1, nama: "Rina Wulandari", email: "rina@ut.ac.id", role: "UPBJJ-UT", lokasi: "UPBJJ Jakarta" },
      2: { userId: 2, nama: "Agus Pranoto", email: "agus@ut.ac.id", role: "UPBJJ-UT", lokasi: "UPBJJ Makassar" },
      3: { userId: 3, nama: "Siti Marlina", email: "siti@ut.ac.id", role: "Puslaba", lokasi: "Pusat" },
      4: { userId: 4, nama: "Doni Setiawan", email: "doni@ut.ac.id", role: "Fakultas", lokasi: "FISIP" },
      5: { userId: 5, nama: "Admin SITTA", email: "admin@ut.ac.id", role: "Administrator", lokasi: "Pusat" },
      6: { userId: 6, nama: "Budi Santoso", email: "budi@ut.ac.id", role: "UPBJJ-UT", lokasi: "UPBJJ Surabaya" },
      7: { userId: 7, nama: "Dewi Lestari", email: "dewi@ut.ac.id", role: "UPBJJ-UT", lokasi: "UPBJJ Denpasar" }
    },
    loginData: {
      "rina@ut.ac.id": { userId: 1, nama: "Rina Wulandari", password: "rina123", role: "UPBJJ-UT", lokasi: "UPBJJ Jakarta" },
      "agus@ut.ac.id": { userId: 2, nama: "Agus Pranoto", password: "agus123", role: "UPBJJ-UT", lokasi: "UPBJJ Makassar" },
      "siti@ut.ac.id": { userId: 3, nama: "Siti Marlina", password: "siti123", role: "Puslaba", lokasi: "Pusat" },
      "doni@ut.ac.id": { userId: 4, nama: "Doni Setiawan", password: "doni123", role: "Fakultas", lokasi: "FISIP" },
      "admin@ut.ac.id": { userId: 5, nama: "Admin SITTA", password: "admin123", role: "Administrator", lokasi: "Pusat" },
      "budi@ut.ac.id": { userId: 6, nama: "Budi Santoso", password: "budi123", role: "UPBJJ-UT", lokasi: "UPBJJ Surabaya" },
      "dewi@ut.ac.id": { userId: 7, nama: "Dewi Lestari", password: "dewi123", role: "UPBJJ-UT", lokasi: "UPBJJ Denpasar" }
    },
    dataBahanAjar: [
      { kodeLokasi: "0TMP01", kodeBarang: "ASIP4301", namaBarang: "Pengantar Ilmu Komunikasi", jenisBarang: "BMP", edisi: "2", stok: 548, cover: "../assets/books/pengantar_komunikasi.jpg" },
      { kodeLokasi: "0JKT01", kodeBarang: "EKMA4216", namaBarang: "Manajemen Keuangan", jenisBarang: "BMP", edisi: "3", stok: 392, cover: "../assets/books/manajemen_keuangan.jpg" },
      { kodeLokasi: "0SBY02", kodeBarang: "EKMA4310", namaBarang: "Kepemimpinan", jenisBarang: "BMP", edisi: "1", stok: 278, cover: "../assets/books/kepemimpinan.jpg" },
      { kodeLokasi: "0MLG01", kodeBarang: "BIOL4211", namaBarang: "Mikrobiologi Dasar", jenisBarang: "BMP", edisi: "2", stok: 165, cover: "../assets/books/mikrobiologi.jpg" },
      { kodeLokasi: "0UPBJJBDG", kodeBarang: "PAUD4401", namaBarang: "Perkembangan Anak Usia Dini", jenisBarang: "BMP", edisi: "4", stok: 204, cover: "../assets/books/paud_perkembangan.jpeg" },
      { kodeLokasi: "0SBY03", kodeBarang: "ESPA4122", namaBarang: "Matematika Ekonomi", jenisBarang: "BMP", edisi: "2", stok: 150, cover: "../assets/books/matematika_ekonomi.jpg" },
      { kodeLokasi: "0JKT02", kodeBarang: "ESPA4110", namaBarang: "Pengantar Ekonomi Makro", jenisBarang: "BMP", edisi: "3", stok: 220, cover: "../assets/books/ekonomi_makro.jpg" },
      { kodeLokasi: "0MKS01", kodeBarang: "MKWU4108", namaBarang: "Bahasa Indonesia", jenisBarang: "BMP", edisi: "2", stok: 310, cover: "../assets/books/bahasa_indonesia.jpg" },
      { kodeLokasi: "0PDG01", kodeBarang: "EKMA4111", namaBarang: "Pengantar Bisnis", jenisBarang: "BMP", edisi: "4", stok: 185, cover: "../assets/books/pengantar_bisnis.jpg" }
    ],
    dataTracking: [
      {
        userId: 1,
        datas: [
          {
            nomorDO: "2023001234",
            nama: "Rina Wulandari",
            status: "Dalam Perjalanan",
            ekspedisi: "JNE",
            tanggalKirim: "2025-08-25",
            paket: "0JKT01",
            total: "Rp 180.000",
            perjalanan: [
              { waktu: "2025-08-25 10:12", keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka" },
              { waktu: "2025-08-25 14:07", keterangan: "Tiba di Hub: TANGERANG SELATAN" },
              { waktu: "2025-08-26 11:33", keterangan: "Diteruskan ke Kantor Jakarta Selatan" }
            ]
          }
        ]
      },
      {
        userId: 2,
        datas: [
          {
            nomorDO: "2023005678",
            nama: "Agus Pranoto",
            status: "Dikirim",
            ekspedisi: "Pos Indonesia",
            tanggalKirim: "2025-08-25",
            paket: "0UPBJJBDG",
            total: "Rp 220.000",
            perjalanan: [
              { waktu: "2025-08-25 10:12", keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka" },
              { waktu: "2025-08-25 14:07", keterangan: "Tiba di Hub: TANGERANG SELATAN" },
              { waktu: "2025-08-25 16:30", keterangan: "Diteruskan ke Kantor Kota Bandung" },
              { waktu: "2025-08-26 12:15", keterangan: "Tiba di Hub: Kota BANDUNG" },
              { waktu: "2025-08-26 15:06", keterangan: "Proses antar ke Cimahi" },
              { waktu: "2025-08-26 20:00", keterangan: "Selesai Antar. Penerima: Agus Pranoto" }
            ]
          }
        ]
      },
      {
        userId: 6,
        datas: [
          {
            nomorDO: "2023009012",
            nama: "Budi Santoso",
            status: "Dalam Perjalanan",
            ekspedisi: "Pos Indonesia",
            tanggalKirim: "2025-08-26",
            paket: "0SBY03",
            total: "Rp 140.000",
            perjalanan: [
              { waktu: "2025-08-26 09:00", keterangan: "Penerimaan di Loket: SURABAYA. Pengirim: Universitas Terbuka" },
              { waktu: "2025-08-26 13:15", keterangan: "Diteruskan ke Kantor Tujuan" }
            ]
          }
        ]
      },
      {
        userId: 7,
        datas: [
          {
            nomorDO: "2023009345",
            nama: "Dewi Lestari",
            status: "Selesai Antar",
            ekspedisi: "JNE",
            tanggalKirim: "2025-08-25",
            paket: "0JKT02",
            total: "Rp 120.000",
            perjalanan: [
              { waktu: "2025-08-25 08:30", keterangan: "Penerimaan di Loket: DENPASAR. Pengirim: Universitas Terbuka" },
              { waktu: "2025-08-26 10:00", keterangan: "Tiba di Hub: DENPASAR" },
              { waktu: "2025-08-26 14:20", keterangan: "Selesai Antar. Penerima: Dewi Lestari" }
            ]
          }
        ]
      }
    ]
  },
  created: function () {
    if (!localStorage.getItem('books')) {
      localStorage.setItem('books', JSON.stringify(this.dataBahanAjar));
    }
    if (!localStorage.getItem('tracking')) {
      localStorage.setItem('tracking', JSON.stringify(this.dataTracking));
    }
  },
  methods: {
    getUserById: function (id) {
      return this.dataPengguna[id];
    },
    getTrackingByUserId: function (userId) {
      var entry = this.dataTracking.find(function (u) {
        return u.userId === userId;
      });
      return entry ? entry.datas : null;
    },
    checkAuth: function (email, password) {
      var data = this.loginData[email];
      if (!data || data.password !== password) return false;
      sessionStorage.setItem('userId', data.userId);
      sessionStorage.setItem('userRole', data.role);
      sessionStorage.setItem('userData', JSON.stringify(this.getUserById(data.userId)));
      return true;
    }
  }
});