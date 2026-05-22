
const dataPengguna = {
  1: { userId: 1, nama: "Rina Wulandari", email: "rina@ut.ac.id",   password: "rina123",   role: "UPBJJ-UT",      lokasi: "UPBJJ Jakarta"  },
  2: { userId: 2, nama: "Agus Pranoto",   email: "agus@ut.ac.id",   password: "agus123",   role: "UPBJJ-UT",      lokasi: "UPBJJ Makassar" },
  3: { userId: 3, nama: "Siti Marlina",   email: "siti@ut.ac.id",   password: "siti123",   role: "Puslaba",       lokasi: "Pusat"          },
  4: { userId: 4, nama: "Doni Setiawan",  email: "doni@ut.ac.id",   password: "doni123",   role: "Fakultas",      lokasi: "FISIP"          },
  5: { userId: 5, nama: "Admin SITTA",    email: "admin@ut.ac.id",  password: "admin123",  role: "Administrator", lokasi: "Pusat"          },
};

const loginData = {
  "rina@ut.ac.id":  { userId: 1, nama: "Rina Wulandari", password: "rina123",   role: "UPBJJ-UT",      lokasi: "UPBJJ Jakarta"  },
  "agus@ut.ac.id":  { userId: 2, nama: "Agus Pranoto",   password: "agus123",   role: "UPBJJ-UT",      lokasi: "UPBJJ Makassar" },
  "siti@ut.ac.id":  { userId: 3, nama: "Siti Marlina",   password: "siti123",   role: "Puslaba",       lokasi: "Pusat"          },
  "doni@ut.ac.id":  { userId: 4, nama: "Doni Setiawan",  password: "doni123",   role: "Fakultas",      lokasi: "FISIP"          },
  "admin@ut.ac.id": { userId: 5, nama: "Admin SITTA",    password: "admin123",  role: "Administrator", lokasi: "Pusat"          },
};


const dataBahanAjar = [
  { kodeLokasi: "0TMP01",    kodeBarang: "ASIP4301", namaBarang: "Pengantar Ilmu Komunikasi",  jenisBarang: "BMP", edisi: "2", stok: 548, cover: "../assets/books/pengantar_komunikasi.jpg" },
  { kodeLokasi: "0JKT01",    kodeBarang: "EKMA4216", namaBarang: "Manajemen Keuangan",         jenisBarang: "BMP", edisi: "3", stok: 392, cover: "../assets/books/manajemen_keuangan.jpg"   },
  { kodeLokasi: "0SBY02",    kodeBarang: "EKMA4310", namaBarang: "Kepemimpinan",               jenisBarang: "BMP", edisi: "1", stok: 278, cover: "../assets/books/kepemimpinan.jpg"          },
  { kodeLokasi: "0MLG01",    kodeBarang: "BIOL4211", namaBarang: "Mikrobiologi Dasar",         jenisBarang: "BMP", edisi: "2", stok: 165, cover: "../assets/books/mikrobiologi.jpg"          },
  { kodeLokasi: "0UPBJJBDG", kodeBarang: "PAUD4401", namaBarang: "Perkembangan Anak Usia Dini",jenisBarang: "BMP", edisi: "4", stok: 204, cover: "../assets/books/paud_perkembangan.jpeg"    },
];


const dataTracking = [
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
  }
];


if (!localStorage.getItem('books') && typeof dataBahanAjar !== 'undefined') {
    localStorage.setItem('books', JSON.stringify(dataBahanAjar));
}

const getUserById = id => dataPengguna[id];

function getTrackingByUserId(userId) {
  const entry = dataTracking.find(u => u.userId === userId);
  return entry ? entry.datas : null;
}

function checkAuth(email, password) {
  const data = loginData[email];
  if (!data || data.password !== password) return false;

  console.log(getTrackingByUserId(data.userId))

  sessionStorage.setItem('userId',       data.userId);
  sessionStorage.setItem('userRole',     data.role);
  sessionStorage.setItem('userData',     JSON.stringify(getUserById(data.userId)));
  sessionStorage.setItem('userTracking', JSON.stringify(getTrackingByUserId(data.userId)));

  return true;
}


