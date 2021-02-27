var id='';
var nama='';
var alamat='';

function add() {
    let url = 'http://localhost:37912/PendudukNegeri/webresources/entity.penduduk/';
    let newid = document.getElementById('buatid');
    let newNama = document.getElementById('buatnama');
    let newNoHp = document.getElementById('buatnohp');
    let newTglLahir = document.getElementById('buattgllahir');
    idbaru = newid.elements[0].value;
    namabaru = newNama.elements[0].value;
    nohpbaru = newNoHp.elements[0].value;
    tgllahirbaru = newTglLahir.elements[0].value;
    let xml = "<penduduk>"+
                "<id>"+idbaru+"</id>"+
                "<nama>"+namabaru+"</nama>"+
                "<nohp>"+nohpbaru+"</nohp>"+
                "<tgllahir>"+tgllahirbaru+"</tgllahir>"+
                "</penduduk>";
    $.ajax({
        url: url,
        method: 'POST',
        data: xml,
        contentType: 'application/xml',
        success: function (xml) {
            alert('Data Berhasil Ditambah!');
        },
        error: function (e) {alert('error');}
    })
}

function update() {
    let url = 'http://localhost:37912/PendudukNegeri/webresources/entity.penduduk/';
    let idInput = document.getElementById("idm");
    url+=idInput.elements[0].value;
//    alert(url);
    let viewId = document.getElementById("id");
    let viewNama = document.getElementById("nama");
    let viewNoHP = document.getElementById("nohp");
    let viewTglLahir = document.getElementById("tgllahir");
    let save = document.getElementById("save");
    $.ajax({
        url: url,
        method: 'GET',
        success: function (xml) {
            id = idInput.elements[0].value;
//            nama = xml.getElementsByTagName('nama')[0].childNodes[0].nodeValue;
//            alamat = xml.getElementsByTagName('alamat')[0].childNodes[0].nodeValue;
            viewId.value = idInput.elements[0].value;
            viewNama.value = xml.getElementsByTagName('nama')[0].childNodes[0].nodeValue;;
            viewNoHP.value = xml.getElementsByTagName('nohp')[0].childNodes[0].nodeValue;
            viewTglLahir.value = xml.getElementsByTagName('tgllahir')[0].childNodes[0].nodeValue;
            save.innerHTML = "<button onclick='edit()'>SIMPAN</button>";

        },
        fail: function (e) {alert('error');}

    })
}

function edit() {
    let url = 'http://localhost:37912/PendudukNegeri/webresources/entity.penduduk/';
    let newnama = document.getElementById('datanama');
    let newNoHp = document.getElementById('datanohp');
    let newTglLahir = document.getElementById('datatgllahir');
    namabaru = newnama.elements[0].value;
    nohpbaru = newNoHp.elements[0].value;
    tgllahirbaru = newTglLahir.elements[0].value;
    let xml = "<penduduk>"+
                "<id>"+id+"</id>"+
                "<nama>"+namabaru+"</nama>"+
                "<nohp>"+nohpbaru+"</nohp>"+
                "<tgllahir>"+tgllahirbaru+"</tgllahir>"+
                "</penduduk>";
    url+= id;
//    alert("Apa anda ingin mengubah data id " + id);
    $.ajax({
        url: url,
        method: 'PUT',
        data: xml,
        contentType: 'application/xml',
        success: function (xml) {
            alert('Data Berhasil Diubah!');
        },
        error: function (e) {alert('error');}

    })

//    alert(nama+alamat);
}

function del() {
    let url = 'http://localhost:37912/PendudukNegeri/webresources/entity.penduduk/';
    let id = document.getElementById("delete");
    let valueid = id.elements[0].value;
    url+=valueid;
//    alert("Apa anda ingin menghapus data ID " + id + "?");
    $.ajax({
        url: url,
        method: 'DELETE',
        success: function (xml) {
            alert('Data Berhasil Dihapus!');
        },
        fail: function (e) {alert('error');}
    })

}

function find() {
    let url = 'http://localhost:37912/PendudukNegeri/webresources/entity.penduduk/';
    let id = document.getElementById("find");
    let show = document.getElementById("result")
    let valueid = id.elements[0].value;
    url+=valueid;
//    alert(url);
    $.ajax({
        url: url,
        method: 'GET',
        success: function (xml) {
            let row = xml.getElementsByTagName('penduduk');
            let id = xml.getElementsByTagName('id')[0].childNodes[0].nodeValue;
            let name = xml.getElementsByTagName('nama')[0].childNodes[0].nodeValue;
            let nohp = xml.getElementsByTagName('nohp')[0].childNodes[0].nodeValue;
            let tglLahir = xml.getElementsByTagName('tgllahir')[0].childNodes[0].nodeValue;
            show.innerHTML = id + " | " + name + " | " + nohp + " | " + tglLahir;
        },
        fail: function (e) {alert('error');}
    })

}

function showalldata(){
    let url = "http://localhost:37912/PendudukNegeri/webresources/entity.penduduk/";
    let view = document.getElementById('show');
    $.ajax ({
        url: url,
        method: 'GET',
        success: function (xml){
            console.log(xml);
            let table = tampildata (xml);
            view.innerHTML = table;
        },
        fail: function (e) {alert('error');}
    })
    //view.innerHTML = "Show here";
}

function tampildata (xml) {
    let sdata = xml.getElementsByTagName('penduduk').length;
    let table = "<table border='1' align='center'>";
    table += '<tr> <th>ID</th> <th>NAMA</th> <th>NO HP</th> <th>TANGGAL LAHIR</th> </tr>'
    for (row=0;row<sdata;row++){
        let id = xml.getElementsByTagName("id")[row].childNodes[0].nodeValue;
        let nama = xml.getElementsByTagName("nama")[row].childNodes[0].nodeValue;
        let nohp = xml.getElementsByTagName("nohp")[row].childNodes[0].nodeValue;
        let tgllahir = xml.getElementsByTagName("tgllahir")[row].childNodes[0].nodeValue;
        table += '<tr> <td>'+id+'</td> <td>'+nama+'</td> <td>'+nohp+'</td> <td>'+tgllahir+'</td></tr>'
    }
    table += "</table>";
    return table;

}
