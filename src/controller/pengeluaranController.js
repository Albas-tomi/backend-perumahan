import { PengeluaranModel } from "../models/Model.js";

export const getAllPengeluaran = async (req, res) => {
  try {
    const response = await PengeluaranModel.findAll();
    res.json(response);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data pengeluaran",
      error: error.message,
    });
  }
};

export const createPengeluaran = async (req, res) => {
  const { deskripsi, jumlah_pengeluaran, tanggal_pengeluaran } = req.body;
  try {
    const newPengeluaran = await PengeluaranModel.create({
      deskripsi,
      jumlah_pengeluaran,
      tanggal_pengeluaran,
    });
    res.status(201).json({
      message: "Pengeluaran berhasil dibuat",
      data: newPengeluaran,
    });
  } catch (error) {
    console.error("Error creating pengeluaran:", error);
    res.status(500).json({
      message: "Gagal membuat pengeluaran",
      error: error.message,
    });
  }
};

export const updatePengeluaran = async (req, res) => {
  const { id } = req.params;
  const { deskripsi, jumlah_pengeluaran, tanggal_pengeluaran } = req.body;
  try {
    const [updated] = await PengeluaranModel.update(
      {
        deskripsi,
        jumlah_pengeluaran,
        tanggal_pengeluaran,
      },
      {
        where: { id: id },
      }
    );
    if (updated) {
      const response = await PengeluaranModel.findByPk(id);
      res.json(response);
    } else {
      res.status(404).json({ message: "Pengeluaran tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePengeluaran = async (req, res) => {
  const { id } = req.params;
  try {
    const pengeluaran = await PengeluaranModel.findByPk(id);
    if (!pengeluaran) {
      return res.status(404).json({ message: "Pengeluaran tidak ditemukan" });
    }

    await PengeluaranModel.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Pengeluaran sukses dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
