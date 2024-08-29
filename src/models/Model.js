import { Sequelize } from "sequelize";
import db from "../config/index.js";

const { DataTypes } = Sequelize;

// Model Penghuni
const PenghuniModel = db.define(
  "db_penghuni",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_lengkap: DataTypes.STRING,
    foto_ktp: DataTypes.STRING,
    status_penghuni: DataTypes.ENUM("kontrak", "tetap"),
    nomor_telepon: DataTypes.STRING,
    status_menikah: DataTypes.ENUM("menikah", "belum menikah"),
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Model Rumah
const RumahModel = db.define(
  "db_rumah",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nomor_rumah: DataTypes.STRING,
    status_rumah: DataTypes.ENUM("dihuni", "kosong"),
    id_penghuni_sekarang: {
      type: DataTypes.INTEGER,
      references: {
        model: PenghuniModel,
        key: "id",
      },
    },
    histori_penghuni: DataTypes.JSON,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Model Pembayaran
const PembayaranModel = db.define(
  "db_pembayaran",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_rumah: {
      type: DataTypes.INTEGER,
      references: {
        model: RumahModel,
        key: "id",
      },
    },
    id_penghuni: {
      type: DataTypes.INTEGER,
      references: {
        model: PenghuniModel,
        key: "id",
      },
    },
    bulan_bayar: DataTypes.ENUM(
      "januari",
      "februari",
      "maret",
      "april",
      "mei",
      "juni",
      "juli",
      "agustus",
      "september",
      "oktober",
      "november",
      "desember"
    ),
    jumlah_pembayaran: DataTypes.FLOAT,
    jenis_iuran: DataTypes.ENUM("satpam", "kebersihan", "lain-lain"),
    status_pembayaran: DataTypes.ENUM("cicil", "lunas", "dibatalkan", "1tahun"),
    tanggal_pembayaran: DataTypes.DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Model Pengeluaran
const PengeluaranModel = db.define(
  "db_pengeluaran",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    deskripsi: DataTypes.STRING,
    jumlah_pengeluaran: DataTypes.FLOAT,
    tanggal_pengeluaran: DataTypes.DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Relasi antar model

// Relasi satu penghuni memiliki banyak pembayaran
PenghuniModel.hasMany(PembayaranModel, { foreignKey: "id_penghuni" });

// Relasi satu rumah memiliki banyak pembayaran
RumahModel.hasMany(PembayaranModel, { foreignKey: "id_rumah" });

// Relasi rumah berhubungan dengan penghuni sekarang (satu rumah memiliki satu penghuni saat ini)
RumahModel.belongsTo(PenghuniModel, {
  foreignKey: "id_penghuni_sekarang",
  // berfungsi untuk membuat relasi yang terbalik mendapatkan data penghuni
  as: "penghuni_sekarang",
});

// Relasi pembayaran berhubungan dengan satu rumah
PembayaranModel.belongsTo(RumahModel, { foreignKey: "id_rumah" });

// Relasi pembayaran berhubungan dengan satu penghuni
PembayaranModel.belongsTo(PenghuniModel, { foreignKey: "id_penghuni" });

export { PenghuniModel, RumahModel, PembayaranModel, PengeluaranModel };

(async () => {
  await db.sync({ alter: true }); // Menyesuaikan model dengan tabel di database
})();
