import { PembayaranModel, PenghuniModel, RumahModel } from "../models/Model.js";

export const getALlPembayaran = async (req, res) => {
  try {
    const response = await PembayaranModel.findAll();
    res.json(response);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data pembayaran",
      error: error.message,
    });
  }
};

export const createPembayaran = async (req, res) => {
  const {
    jumlah_pembayaran,
    jenis_iuran,
    tanggal_pembayaran,
    status_pembayaran,
    id_penghuni,
    bulan_bayar,
    id_rumah,
  } = req.body;
  console.log(req.body);
  try {
    if (id_penghuni) {
      const penghuni = await PenghuniModel.findByPk(id_penghuni);
      if (!penghuni) {
        return res.status(400).json({ message: "Penghuni tidak ditemukan" });
      }
    }

    if (id_rumah) {
      const rumah = await RumahModel.findByPk(id_rumah);
      if (!rumah) {
        return res.status(400).json({ message: "Rumah tidak ditemukan" });
      }
    }

    if (id_penghuni) {
      const penghuniRumah = await RumahModel.findOne({
        where: {
          id: id_rumah,
          id_penghuni_sekarang: id_penghuni,
        },
      });
      console.log(penghuniRumah);
      if (!penghuniRumah) {
        return res
          .status(400)
          .json({ message: "Penghuni ini bukan milik rumah ini" });
      }
    }

    const newPembayaran = await PembayaranModel.create({
      jumlah_pembayaran,
      jenis_iuran,
      tanggal_pembayaran,
      status_pembayaran,
      id_penghuni,
      id_rumah,
      bulan_bayar,
    });
    res.status(201).json({
      message: "Pembayaran sukses ditambahkan",
      data: newPembayaran,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal membuat pembayaran",
      error: error.message,
    });
  }
};

export const updatePembayaran = async (req, res) => {
  const { id } = req.params;
  const {
    id_rumah,
    id_penghuni,
    jumlah_pembayaran,
    jenis_iuran,
    tanggal_pembayaran,
    status_pembayaran,
    bulan_bayar,
  } = req.body;
  try {
    const pembayaran = await PembayaranModel.findByPk(id);
    if (!pembayaran) {
      return res.status(404).json({ message: "Pembayaran tidak ditemukan" });
    }

    // Cek apakah id penghuni dan id rumah valid
    if (id_penghuni) {
      const penghuni = await PenghuniModel.findByPk(id_penghuni);
      if (!penghuni) {
        return res.status(400).json({ message: "Penghuni tidak ditemukan" });
      }
    }

    // Cek apakah id rumah valid
    if (id_rumah) {
      const rumah = await RumahModel.findByPk(id_rumah);
      if (!rumah) {
        return res.status(400).json({ message: "Rumah tidak ditemukan" });
      }
    }

    // Cek apakah id penghuni dan id rumah milik penghuni yang sama
    if (id_penghuni) {
      const penghuniRumah = await RumahModel.findOne({
        where: {
          id: id_rumah,
          id_penghuni_sekarang: id_penghuni,
        },
      });
      if (!penghuniRumah) {
        return res
          .status(400)
          .json({ message: "Penghuni ini bukan milik rumah ini" });
      }
    }

    // Update data pembayaran
    const [updatedPembayaran] = await PembayaranModel.update(
      {
        id_rumah,
        id_penghuni,
        jumlah_pembayaran,
        jenis_iuran,
        status_pembayaran,
        tanggal_pembayaran,
        bulan_bayar,
      },
      {
        where: { id },
      }
    );
    if (updatedPembayaran === 0) {
      return res.status(404).json({ message: "Pembayaran tidak ditemukan" });
    }
    res.status(200).json({ message: "Pembayaran berhasil diupdate" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal memperbarui pembayaran",
      error: error.message,
    });
  }
};

export const deletePembayaran = async (req, res) => {
  const { id } = req.params;
  try {
    const pembayaran = await PembayaranModel.findByPk(id);
    if (!pembayaran) {
      return res.status(404).json({ message: "Pembayaran tidak ditemukan" });
    }

    await pembayaran.destroy();
    res.status(200).json({ message: "Pembayaran sukses dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal menghapus pembayaran",
      error: error.message,
    });
  }
};
