let editingKaryawan = null;

function renderKaryawan() {

    const data =
        getKaryawan();

    let html = "";

    data.forEach(item => {

        if (
            editingKaryawan === item.id
        ) {

            html += `

                <tr>

                    <td>

                        <input
                            type="number"
                            id="id_${item.id}"
                            value="${item.id}">

                    </td>

                    <td>

                        <input
                            type="text"
                            id="nama_${item.id}"
                            value="${item.nama}">

                    </td>

                    <td>

                        <input
                            type="text"
                            id="jabatan_${item.id}"
                            value="${item.jabatan}">

                    </td>

                    <td>

                        <button
                            onclick="simpanKaryawan(${item.id})">

                            Simpan

                        </button>

                    </td>

                </tr>

            `;

        }

        else {

            html += `

                <tr>

                    <td>${item.id}</td>

                    <td>${item.nama}</td>

                    <td>${item.jabatan}</td>

                    <td>

                        <button
                            onclick="editKaryawan(${item.id})">

                            Edit

                        </button>

                        <button
                            onclick="hapusKaryawan(${item.id})">

                            Hapus

                        </button>

                    </td>

                </tr>

            `;

        }

    });

    document.getElementById(
        "karyawanTable"
    ).innerHTML = html;

}

function tambahKaryawan() {

    const nama =
        document.getElementById(
            "namaKaryawan"
        ).value.trim();

    const jabatan =
        document.getElementById(
            "jabatanKaryawan"
        ).value.trim();

    if (
        !nama ||
        !jabatan
    ) {

        alert(
            "Lengkapi data terlebih dahulu"
        );

        return;

    }

    const data =
        getKaryawan();

    const idBaru =
        data.length > 0
        ? Math.max(
            ...data.map(
                x => x.id
            )
        ) + 1
        : 1;

    data.push({

        id: idBaru,

        nama: nama,

        jabatan: jabatan

    });

    localStorage.setItem(
        "karyawan",
        JSON.stringify(data)
    );

    let penilaian =
        getPenilaian();

    let dataPenilaianBaru = {

        idKaryawan: idBaru

    };

    const kriteria =
        getKriteria();

    kriteria.forEach(item => {

        const key =

            item.nama

                .toLowerCase()

                .replaceAll(
                    " ",
                    "_"
                );

        dataPenilaianBaru[
            key
        ] = 0;

    });

    penilaian.push(
        dataPenilaianBaru
    );

    localStorage.setItem(
        "penilaian",
        JSON.stringify(penilaian)
    );

    document.getElementById(
        "namaKaryawan"
    ).value = "";

    document.getElementById(
        "jabatanKaryawan"
    ).value = "";

    renderKaryawan();

}

function editKaryawan(id) {

    editingKaryawan = id;

    renderKaryawan();

}

function simpanKaryawan(id) {

    const data =
        getKaryawan();

    const index =
        data.findIndex(
            x => x.id === id
        );

    if(index === -1) return;

    const idBaru =
        parseInt(
            document.getElementById(
                `id_${id}`
            ).value
        );

    if(
        isNaN(idBaru)
    ){

        alert(
            "ID tidak valid"
        );

        return;

    }

    const idSudahAda =
        data.some(
            item =>
                item.id === idBaru &&
                item.id !== id
        );

    if(idSudahAda){

        alert(
            "ID sudah digunakan!"
        );

        return;

    }

    const namaBaru =
        document.getElementById(
            `nama_${id}`
        ).value.trim();

    const jabatanBaru =
        document.getElementById(
            `jabatan_${id}`
        ).value.trim();

    if(

        namaBaru === "" ||

        jabatanBaru === ""

    ){

        alert(
            "Data tidak boleh kosong"
        );

        return;

    }

    let penilaian =
        getPenilaian();

    const penilaianIndex =
        penilaian.findIndex(
            item =>
            item.idKaryawan === id
        );

    if(
        penilaianIndex !== -1
    ){

        penilaian[
            penilaianIndex
        ].idKaryawan = idBaru;

        localStorage.setItem(
            "penilaian",
            JSON.stringify(
                penilaian
            )
        );

    }

    data[index].id =
        idBaru;

    data[index].nama =
        namaBaru;

    data[index].jabatan =
        jabatanBaru;

    localStorage.setItem(
        "karyawan",
        JSON.stringify(data)
    );

    editingKaryawan = null;

    renderKaryawan();

}

function hapusKaryawan(id) {

    if (
        !confirm(
            "Hapus karyawan ini?"
        )
    ) {
        return;
    }

    let karyawan =
        getKaryawan();

    karyawan =
        karyawan.filter(
            x => x.id !== id
        );

    localStorage.setItem(
        "karyawan",
        JSON.stringify(karyawan)
    );

    let penilaian =
        getPenilaian();

    penilaian =
        penilaian.filter(
            x => x.idKaryawan !== id
        );

    localStorage.setItem(
        "penilaian",
        JSON.stringify(penilaian)
    );

    renderKaryawan();

}