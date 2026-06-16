function convertKey(nama)
{
    return nama
        .toLowerCase()
        .replaceAll(
            " ",
            "_"
        );
}

function hitungMOORA() 
{
    const karyawan =
        getKaryawan();
    const penilaian =
        getPenilaian();
    const kriteria =
        getKriteria();
    if(
        karyawan.length === 0 ||
        penilaian.length === 0 ||
        kriteria.length === 0
    )
    {return [];}

    let pembagi = {};
    kriteria.forEach(k => 
    {
        const key =
            convertKey(k.nama);
            pembagi[key] = 0;
    });

    penilaian.forEach(item => 
    {
        kriteria.forEach(k => {
            const key =
                convertKey(k.nama);
            pembagi[key] +=
                (Number(item[key]) || 0) ** 2;
        });
    });

    kriteria.forEach(k => 
    {
        const key =
            convertKey(k.nama);
        pembagi[key] =
            Math.sqrt(pembagi[key]);
    });

    let hasil = [];
    penilaian.forEach(item => 
    {
        const dataKaryawan =
            karyawan.find(k => k.id === item.idKaryawan);

        if(!dataKaryawan) 
            return;

        let nilaiAkhir = 0;
        kriteria.forEach(k => {
            const key =
                convertKey(k.nama);
            const nilai =
                Number(item[key]) || 0;
            const normalisasi =
                pembagi[key] === 0 ? 0 :
                nilai /
                pembagi[key];
            nilaiAkhir +=
                normalisasi *
                ( Number( k.bobot ) / 100 );
        });

        let hasilItem = 
        {
            nama:
                dataKaryawan.nama,
            jabatan:
                dataKaryawan.jabatan,
            nilaiAkhir:
                Number(nilaiAkhir.toFixed(4))
        };

        kriteria.forEach(k => 
        {
            const key =
                convertKey(k.nama);
            hasilItem[key] =
                item[key] || 0;
        });
        hasil.push(hasilItem);
    });
    hasil.sort((a,b) => b.nilaiAkhir - a.nilaiAkhir );
    return hasil;
}

function renderRanking() 
{
    const ranking =
        hitungMOORA();
    let html = "";
    ranking.forEach(
        (item,index) => {
            let badge =
                index + 1;
            if(index === 0){
                badge =
                "🥇";
            }
            else if(index === 1){
                badge =
                "🥈";
            }
            else if(index === 2){
                badge =
                "🥉";
            }
            html += `
               <tr>
                    <td>${badge}</td>
                    <td>${item.nama}</td>
                    <td>${item.jabatan}</td>
                    <td>${item.nilaiAkhir}</td>
                </tr>`;
        }
    );
    document.getElementById("rankingTable").innerHTML = html;
}