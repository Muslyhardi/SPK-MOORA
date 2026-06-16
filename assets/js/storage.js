function initializeData() {

    if (!localStorage.getItem("karyawan")) {

        const karyawan = [

            {
                id: 1,
                nama: "Andi",
                jabatan: "Staff"
            },

            {
                id: 2,
                nama: "Budi",
                jabatan: "Staff"
            },

            {
                id: 3,
                nama: "Citra",
                jabatan: "Supervisor"
            },

            {
                id: 4,
                nama: "Dedi",
                jabatan: "Staff"
            },

            {
                id: 5,
                nama: "Eka",
                jabatan: "Staff"
            }

        ];

        localStorage.setItem(
            "karyawan",
            JSON.stringify(karyawan)
        );

    }

    if (!localStorage.getItem("penilaian")) {

        const penilaian = [

            {
                idKaryawan: 1,
                kehadiran: 90,
                produktivitas: 88,
                sikapKerja: 85,
                inisiatif: 87,
                tanggungJawab: 91
            },

            {
                idKaryawan: 2,
                kehadiran: 85,
                produktivitas: 90,
                sikapKerja: 82,
                inisiatif: 86,
                tanggungJawab: 88
            },

            {
                idKaryawan: 3,
                kehadiran: 95,
                produktivitas: 93,
                sikapKerja: 90,
                inisiatif: 91,
                tanggungJawab: 93
            },

            {
                idKaryawan: 4,
                kehadiran: 80,
                produktivitas: 84,
                sikapKerja: 79,
                inisiatif: 78,
                tanggungJawab: 83
            },

            {
                idKaryawan: 5,
                kehadiran: 88,
                produktivitas: 86,
                sikapKerja: 84,
                inisiatif: 87,
                tanggungJawab: 89
            }

        ];

        localStorage.setItem(
            "penilaian",
            JSON.stringify(penilaian)
        );

    }

    if (!localStorage.getItem("kriteria")) {

        const kriteria = [

            {
                id: 1,
                nama: "Kehadiran",
                bobot: 25
            },

            {
                id: 2,
                nama: "Produktivitas",
                bobot: 25
            },

            {
                id: 3,
                nama: "Sikap Kerja",
                bobot: 20
            },

            {
                id: 4,
                nama: "Inisiatif",
                bobot: 15
            },

            {
                id: 5,
                nama: "Tanggung Jawab",
                bobot: 15
            }

        ];

        localStorage.setItem(
            "kriteria",
            JSON.stringify(kriteria)
        );

    }

}

function getKaryawan() {

    return JSON.parse(
        localStorage.getItem(
            "karyawan"
        )
    ) || [];

}

function getPenilaian() {

    return JSON.parse(
        localStorage.getItem(
            "penilaian"
        )
    ) || [];

}

function getKriteria() {

    return JSON.parse(
        localStorage.getItem(
            "kriteria"
        )
    ) || [];

}