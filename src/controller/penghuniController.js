import { PenghuniModel, RumahModel } from "../models/Model.js";

// CONTROLLER GET ALL PENGHUNI
export const getAllPenghuni = async (req, res) => {
  try {
    const response = await PenghuniModel.findAll();
    res.json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mengambil data penghuni", error: error.message });
  }
};

// CONTROLLER CREATE PENGHUNI
export const createPenghuni = async (req, res) => {
  const {
    nama_lengkap,
    foto_ktp,
    status_penghuni,
    nomor_telepon,
    status_menikah,
  } = req.body;
  try {
    // Membuat entitas penghuni baru
    const newPenghuni = await PenghuniModel.create({
      nama_lengkap,
      foto_ktp,
      status_penghuni,
      nomor_telepon,
      status_menikah,
    });

    res.status(201).json({
      message: "Penghuni berhasil dibuat",
      data: newPenghuni,
    });
  } catch (error) {
    console.error("Error creating penghuni:", error);
    res.status(500).json({
      message: "Gagal membuat penghuni",
      error: error.message,
    });
  }
};

// CONTROLLER UPDATE PENGHUNI
export const updatePenghuni = async (req, res) => {
  const { id } = req.params;
  const {
    nama_lengkap,
    foto_ktp,
    status_penghuni,
    nomor_telepon,
    status_menikah,
  } = req.body;

  try {
    // Update data penghuni
    const [updated] = await PenghuniModel.update(
      {
        nama_lengkap,
        foto_ktp,
        status_penghuni,
        nomor_telepon,
        status_menikah,
      },
      {
        where: { id },
      }
    );

    if (updated === 0) {
      return res.status(404).json({ message: "Penghuni tidak ditemukan" });
    }

    res.status(200).json({ message: "Penghuni berhasil diupdate" });
  } catch (error) {
    console.error("Error updating penghuni:", error);
    res.status(500).json({
      message: "Gagal mengupdate penghuni",
      error: error.message,
    });
  }
};

// CONTROLLER DELETE PENGHUNI
export const deletePenghuni = async (req, res) => {
  const id = req.params.id;
  try {
    const penghuni = await PenghuniModel.findByPk(id);
    if (!penghuni) {
      return res.status(404).json({ message: "Penghuni tidak ditemukan" });
    }
    if (id) {
      const rumahHuni = await RumahModel.findOne({
        where: {
          id_penghuni_sekarang: id,
        },
      });

      if (rumahHuni) {
        return res.status(400).json({
          message: "Penghuni sedang tinggal di rumah",
        });
      }
    }

    await PenghuniModel.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({ message: "Penghuni berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting penghuni:", error);
    res.status(500).json({
      message: "Gagal menghapus penghuni",
      error: error.message,
    });
  }
};
