let kriteriaTemp = [];
let modeEditKriteria = false;
let selectedKriteria = null;

function renderKriteria() {

    kriteriaTemp =

        JSON.parse(

            JSON.stringify(

                getKriteria()

            )

        );

    kriteriaTemp.forEach(item => {

        item.namaLama =
            item.nama;

    });

    renderTabelKriteria();

}

function renderTabelKriteria() {
    let html = "";
    let total = 0;
    kriteriaTemp.forEach(item => {
        total += Number(
            item.bobot
        );
        if(
            modeEditKriteria
        ){
            html += `
                <tr
                    class="${
                        selectedKriteria === item.id
                        ?
                        'selected-row'
                        :
                        ''
                    }"
                >
                    <td>
                        ${item.id}

                    </td>
                    <td>
                        <input
                            type="text"
                            value="${item.nama}"
                            style="
                                width:320px;
                                padding:10px;
                                font-size:15px;"
                            onchange="
                                updateNama(
                                    ${item.id},
                                    this.value)"
                        >
                    </td>
                    <td>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value="${item.bobot}"
                            onclick="event.stopPropagation()"
                            onchange="
                                updateBobot(
                                    ${item.id},
                                    this.value
                                )
                            "
                            style="
                                width:100%;
                                box-sizing:border-box;
                                padding:8px;
                            "
                        >
                    </td>
                    <td>
                        <button
                            onclick="
                                hapusKriteria(
                                    ${item.id}
                                )
                            "
                        >

                            Hapus

                        </button>

                    </td>
                </tr>
            `;
        }
        else{
            html += `
                <tr
                    class="
                        ${
                            selectedKriteria === item.id
                            ?
                            "selected-row"
                            :
                            ""
                        }
                    "
                >
                    <td>
                        ${item.id}

                    </td>
                    <td>
                        ${item.nama}
                    </td>
                    <td>
                        ${item.bobot}%
                    </td>
                    <td>
                        <button
                            onclick="
                                hapusKriteria(
                                    ${item.id}
                                )
                            "
                        >

                            Hapus

                        </button>

                    </td>
                </tr>
            `;
        }
    });

    document.getElementById(
        "kriteriaTable"
    ).innerHTML = html;

    const totalElement =
        document.getElementById(
            "totalBobot"
        );

    totalElement.innerHTML =

        `Total Bobot : ${total}%`;

    if(
        total === 100
    ){

        totalElement.style.color =
            "green";

    }

    else{

        totalElement.style.color =
            "red";

    }

    document.getElementById(
        "btnSimpanKriteria"
    ).style.display =

        modeEditKriteria

        ?

        "inline-block"

        :

        "none";

}

function updateNama(
    id,
    value
){

    const item =
        kriteriaTemp.find(
            x => x.id === id
        );

    if(item){

        item.nama = value;

    }

}

function updateBobot(id, value)
{
    value =
        parseInt(value);
    if(isNaN(value))
        { value = 0; }

    if( value < 0)
        { value = 0; }

    if( value > 100 )
        { value = 100; }

    const item =
        kriteriaTemp.find( x => x.id === id);

    if(item){item.bobot = value; }

    renderTabelKriteria();

}

function simpanKriteria(){

    const total =

        kriteriaTemp.reduce(

            (sum,item) =>

                sum +
                Number(item.bobot),

            0

        );

    if(
        total !== 100
    ){

        alert(
            "Total bobot harus 100%"
        );

        return;

    }

    let penilaian =
        getPenilaian();

    const kriteriaLama =
        getKriteria();

    // RENAME KRITERIA
    kriteriaTemp.forEach(item => {

        const keyLama =

            convertKey(
                item.namaLama
            );

        const keyBaru =

            convertKey(
                item.nama
            );

        if(
            keyLama !== keyBaru
        ){

            penilaian.forEach(p => {

                p[keyBaru] =
                    p[keyLama] || 0;

                delete p[keyLama];

            });

        }

    });

    // TAMBAH KRITERIA BARU
    kriteriaTemp.forEach(item => {

        const keyBaru =

            convertKey(
                item.nama
            );

        const sudahAda =

            kriteriaLama.some(

                lama =>

                    convertKey(
                        lama.nama
                    ) === keyBaru

            );

        if(
            !sudahAda
        ){

            penilaian.forEach(p => {

                if(
                    p[keyBaru] ===
                    undefined
                ){

                    p[keyBaru] = 0;

                }

            });

        }

    });

    // HAPUS KRITERIA
    kriteriaLama.forEach(item => {

        const keyLama =

            convertKey(
                item.nama
            );

        const masihAda =

            kriteriaTemp.some(

                baru =>

                    convertKey(
                        baru.nama
                    ) === keyLama

                    ||

                    convertKey(
                        baru.namaLama
                    ) === keyLama

            );

        if(
            !masihAda
        ){

            penilaian.forEach(p => {

                delete p[keyLama];

            });

        }

    });

    localStorage.setItem(

        "penilaian",

        JSON.stringify(
            penilaian
        )

    );

    localStorage.setItem(

        "kriteria",

        JSON.stringify(
            kriteriaTemp
        )

    );

    modeEditKriteria =
        false;

    selectedKriteria =
        null;

    renderTabelKriteria();

    alert(
        "Kriteria berhasil disimpan"
    );

}

function showTambahKriteria(){

    const nama =
        prompt( "Masukkan Nama Kriteria");

    if( !nama ) return;

    const idBaru =
        kriteriaTemp.length > 0 ?
        Math.max( ...kriteriaTemp.map( x => x.id ) ) + 1 : 1;

    kriteriaTemp.push({
        id:idBaru,
        nama:nama,
        bobot:0
    });
    renderTabelKriteria();
}

function hapusKriteria(id){
    if( !confirm( "Hapus kriteria ini?" ) )
    { return; }

    kriteriaTemp =
        kriteriaTemp.filter( item => item.id !== id );
    renderTabelKriteria();
}

function convertKey( nama ){
    return nama
        .toLowerCase()
        .replaceAll(
            " ",
            "_"
        );
}

function aktifkanEditKriteria(){

    modeEditKriteria =
        !modeEditKriteria;

    renderTabelKriteria();

}

function pilihKriteria(id){

    selectedKriteria = id;

    renderTabelKriteria();

}

function hapusKriteriaTerpilih(){

    if(
        selectedKriteria === null
    ){

        alert(
            "Pilih kriteria terlebih dahulu"
        );

        return;

    }

    if(
        !confirm(
            "Hapus kriteria ini?"
        )
    ){
        return;
    }

    kriteriaTemp =
        kriteriaTemp.filter(

            item =>

            item.id !==
            selectedKriteria

        );

    selectedKriteria =
        null;

    renderTabelKriteria();

}

function hapusKriteria(id){

    if(
        !confirm(
            "Hapus kriteria ini?"
        )
    ){
        return;
    }

    kriteriaTemp =
        kriteriaTemp.filter(

            item =>

            item.id !== id

        );

    renderTabelKriteria();

}