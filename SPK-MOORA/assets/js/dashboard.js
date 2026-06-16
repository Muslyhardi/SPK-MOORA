function convertKey(nama)
{
    return nama
        .toLowerCase()
        .replaceAll(
            " ",
            "_"
        );
}

function renderDashboard() 
{
    const ranking =
        hitungMOORA();
    const kriteria =
        getKriteria();
    const totalKaryawan =
        getKaryawan().length;
    const totalPenilaian =
        getPenilaian().length;
    const terbaik =
        ranking.length > 0 ? ranking[0]:
        null;
    let header = `<th>Nama</th>`;

    kriteria.forEach(item => {
        header += `<th>${item.nama}</th>`;
    });

    header += `<th>Nilai Akhir</th>`;

    let tabel = "";
    ranking.forEach(item => {
        tabel += `<tr><td>${item.nama}</td>`;
        kriteria.forEach(k => {
            const key =
                convertKey(k.nama);
            tabel += `<td>${item[key] || 0}</td>`;
        });
        tabel += `<td>${item.nilaiAkhir}</td></tr>`;
    });

    document.getElementById("dashboard-content").innerHTML = 
    `
        <div class="card-grid">
            <div class="dashboard-card">
                <h3>Total Karyawan</h3>
                <h2>${totalKaryawan}</h2>
            </div>

            <div class="dashboard-card">
                <h3>Total Kriteria</h3>
                <h2>${kriteria.length}</h2>
            </div>

            <div class="dashboard-card">
                <h3>Total Penilaian</h3>
                <h2> ${totalPenilaian}</h2>
            </div>

            <div class="dashboard-card">
                <h3>Karyawan Terbaik</h3>
                <h2> ${ terbaik ? terbaik.nama : "-" }</h2>
            </div>
        </div>

        <div class="table-card">
            <h2>Hasil Ranking MOORA</h2>
            <br>
            <table class="main-table">
                <thead>
                    <tr>${header}</tr>
                </thead>
                <tbody>
                    ${tabel}
                </tbody>
            </table>
        </div>
    `;

}