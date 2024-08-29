import { PenghuniModel, RumahModel } from "../models/Model.js";

// CONTROLLER GET ALL PPID
export const getAllRumah = async (req, res) => {
  try {
    const response = await RumahModel.findAll({
      include: [
        {
          model: PenghuniModel,
          // untuk menampilkan data penghuni sekarang
          as: "penghuni_sekarang",
          // data penghuni yang ingin ditampilkan
          attributes: [
            "id",
            "nama_lengkap",
            "status_penghuni",
            "nomor_telepon",
            "status_menikah",
          ],
        },
      ],
    });
    res.json(response);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// CONTROLLER CREATE RUMAH
export const createRumah = async (req, res) => {
  const { nomor_rumah, status_rumah, id_penghuni_sekarang, histori_penghuni } =
    req.body;
  try {
    // Cek apakah id_penghuni_sekarang valid (opsional)
    if (id_penghuni_sekarang) {
      const penghuni = await PenghuniModel.findByPk(id_penghuni_sekarang);
      if (!penghuni) {
        return res.status(400).json({ message: "Penghuni tidak ditemukan" });
      }
    }

    if (id_penghuni_sekarang) {
      const penghuniRumah = await RumahModel.findOne({
        where: {
          id_penghuni_sekarang: id_penghuni_sekarang,
        },
      });

      if (penghuniRumah) {
        return res
          .status(400)
          .json({ message: "Penghuni ini sudah memiliki rumah" });
      }
    }

    // Membuat entitas rumah baru
    const newRumah = await RumahModel.create({
      nomor_rumah,
      status_rumah,
      id_penghuni_sekarang,
      histori_penghuni,
    });

    res.status(201).json({
      message: "Rumah berhasil dibuat",
      data: newRumah,
    });
  } catch (error) {
    console.error("Error creating rumah:", error);
    res.status(500).json({
      message: "Gagal membuat rumah",
      error: error.message,
    });
  }
};

export const updateRumah = async (req, res) => {
  const { id } = req.params;
  const { nomor_rumah, status_rumah, id_penghuni_sekarang, histori_penghuni } =
    req.body;

  try {
    // Cek apakah id_penghuni_sekarang valid jika tidak null
    if (id_penghuni_sekarang) {
      const penghuni = await PenghuniModel.findByPk(id_penghuni_sekarang);
      if (!penghuni) {
        return res.status(400).json({ message: "Penghuni tidak ditemukan" });
      }
    }

    //cek apakah sudah punya rumah
    const penghuniRumah = await RumahModel.findOne({
      where: {
        id: id,
        id_penghuni_sekarang: id_penghuni_sekarang,
      },
    });

    if (penghuniRumah) {
      return res
        .status(400)
        .json({ message: "Penghuni ini sudah memiliki rumah" });
    }

    // Cek apakah valid isi
    if (status_rumah === "kosong" && id_penghuni_sekarang !== null) {
      {
        res.status(400).json({ message: "Penghuni tidak ditemukan" });
      }
    }
    // Cek apakah valid isi
    if (status_rumah !== "kosong" && id_penghuni_sekarang === null) {
      {
        res.status(400).json({ message: "Status tidak ditemukan" });
      }
    }

    // Update data rumah
    const updatedRumah = await RumahModel.update(
      {
        nomor_rumah,
        status_rumah,
        id_penghuni_sekarang, // null jika rumah kosong
        histori_penghuni,
      },
      {
        where: { id },
      }
    );

    if (updatedRumah[0] === 0) {
      return res.status(404).json({ message: "Rumah tidak ditemukan" });
    }

    res.status(200).json({ message: "Rumah berhasil diupdate" });
  } catch (error) {
    console.error("Error updating rumah:", error);
    res.status(500).json({
      message: "Gagal mengupdate rumah",
      error: error.message,
    });
  }
};

// CONTROLLER DELETE PPID
export const deleteRumah = async (req, res) => {
  const id = req.params.id;
  try {
    if (id) {
      const rumah = await RumahModel.findByPk(id);
      if (!rumah) {
        return res.status(400).json({ message: "Rumah tidak ditemukan" });
      }
    }
    await RumahModel.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({ message: "Rumah sukses dihapus" });
  } catch (error) {
    res.json({
      message: "Rumah delete dihapus",
      error: error,
    });
  }
};
