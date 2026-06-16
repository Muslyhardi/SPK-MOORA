let editingPenilaian = null;

function convertKey(nama)
{
    return nama
        .toLowerCase()
        .replaceAll(
            " ",
            "_"
        );
}

function renderHeaderPenilaian()
{
    const kriteria =
        getKriteria();
    let html = `<th>Nama</th>`;

    kriteria.forEach(item => {html += `<th>${item.nama}</th>`;});

    html += `<th>Aksi</th>`;

    document.getElementById("penilaianHeader").innerHTML = html;
}

function renderPenilaian() 
{
    const karyawan =
        getKaryawan();
    const penilaian =
        getPenilaian();
    const kriteria =
        getKriteria();
    renderHeaderPenilaian();
    renderBobotKriteria();
    let html = "";
    penilaian.forEach(item => 
    {
        const dataKaryawan =
            karyawan.find( k => k.id === item.idKaryawan );
        if (!dataKaryawan) return;
        html += "<tr>";
        html += 
            `<td>
                ${dataKaryawan.nama}
            </td>`;

        kriteria.forEach(k => {
            const key =
                convertKey( k.nama);
            if(editingPenilaian === item.idKaryawan)
            {
                html += 
                `<td>
                    <input
                        type="number"
                        id="${key}_${item.idKaryawan}"
                        value="${item[key] || 0}"
                    >
                </td>`;
            }

            else{ html += `<td> ${item[key] || 0} </td>`; }
        });

        html += ` <td>`;
        if( editingPenilaian === item.idKaryawan)
        {
            html += `<button onclick="simpanPenilaian( ${item.idKaryawan} )">
                    Simpan
                    </button>`;
        }

        else
        {
            html += `<button onclick="editPenilaian( ${item.idKaryawan})"> 
                Edit
                </button>`;
        }
        html += `</td>`;
        html += "</tr>";
    });
    document.getElementById("penilaianTable").innerHTML = html;
}

function editPenilaian(idKaryawan)
{
    editingPenilaian =
        idKaryawan;
    renderPenilaian();
}

function simpanPenilaian(idKaryawan)
{
    const data =
        getPenilaian();
    const kriteria =
        getKriteria();
    const index =
        data.findIndex(
            item =>
            item.idKaryawan ===
            idKaryawan
        );

    if(index === -1) 
        return;

    kriteria.forEach(k => {
        const key =
            convertKey(
                k.nama
            );

        let value =
            parseInt(document.getElementById(`${key}_${idKaryawan}`).value);

        if(isNaN(value))
            {value = 0;}

        if(value < 0)
            {value = 0;}

        if(value > 100)
            {value = 100;}

        data[index][key] =
            value;
    });

    localStorage.setItem("penilaian",JSON.stringify(data));

    editingPenilaian =
        null;
    renderPenilaian();
}

function renderBobotKriteria()
{
    const kriteria =
        getKriteria();
    let html = "";
    kriteria.forEach(item => {
        html += `
            <div class="bobot-card">
                <h3>
                    ${item.nama}
                </h3>
                <span>
                    ${item.bobot}%
                </span>
            </div>
        `;
    });

    document.getElementById("bobotContainer").innerHTML = html;
}