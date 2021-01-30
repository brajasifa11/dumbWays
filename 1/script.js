var d = document.getElementById('durasi');
var t = document.getElementById('tipe');
var button = document.getElementById('submit');
var hasil = document.querySelector('.tipe p');
var dp = document.querySelector('.dp p');
var type = document.querySelector('.tipeRumah p')
var price = document.querySelector('.harga p')
var remaining = document.querySelector('.remain p')
var duration = document.querySelector('.duration p')
var payment = document.querySelector('.payment p')
var text = document.getElementById('text')

button.addEventListener('click', function() {
  var durasi = d.value
  var tipe = t.value
  let harga = 0;
  let angsuran = 0
  let sisa = 0;

  if (tipe === 'Rose') {
    harga = 120000000
  } else if (tipe === 'Gold') {
    harga = 300000000
  } else if (tipe === 'Platinum') {
    harga = 360000000
  }

  sisa = harga - (harga * 0.20)
  angsuran = Math.ceil(sisa / durasi)
  console.log(angsuran);

  let tipeRumah = `Type Rumah: ${tipe}`
  let hargaRumah = `Harga Rumah: Rp ${harga}`
  let uangMuka = `Uang Muka: Rp ${harga * 0.20}`
  let sisaHarga = `Sisa: ${sisa}`

  type.innerHTML = tipeRumah;
  price.innerHTML = hargaRumah;
  dp.innerHTML = uangMuka;
  remaining.innerHTML = sisaHarga;
  duration.innerHTML = `Lama Kredit: ${durasi}`;
  payment.innerHTML = `Angsuran: ${angsuran}`

  var table = document.getElementById("table");
  var tbl = document.createElement("table");
  var thead = document.createElement("thead");
  var tblBody = document.createElement("tbody");
  var row = document.createElement("tr");
  var cell = document.createElement("td");
  var cell2 = document.createElement("td");
  var cell3 = document.createElement("td");
  var cellText = document.createTextNode('Bulan ke');
  var cellText2 = document.createTextNode('Angsuran');
  var cellText3 = document.createTextNode('Sisa');
  cell.appendChild(cellText);
  cell2.appendChild(cellText2);
  cell3.appendChild(cellText3);
  row.appendChild(cell);
  row.appendChild(cell2);
  row.appendChild(cell3);
  thead.appendChild(row);

  var i = 1
  while (sisa >= angsuran) {
    let sisaCicilan = sisa - angsuran
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    var cell2 = document.createElement("td");
    var cell3 = document.createElement("td");
    var cellText = document.createTextNode(i);
    var cellText2 = document.createTextNode(angsuran);
    var cellText3 = document.createTextNode(sisaCicilan);

    cell.appendChild(cellText);
    cell2.appendChild(cellText2);
    cell3.appendChild(cellText3);
    row.appendChild(cell);
    row.appendChild(cell2);
    row.appendChild(cell3);

    tblBody.appendChild(row);
    sisa -= angsuran
    i++
  }

  if (sisa > 0) {
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    var cell2 = document.createElement("td");
    var cell3 = document.createElement("td");
    var cellText = document.createTextNode(i);
    var cellText2 = document.createTextNode(sisa);
    var cellText3 = document.createTextNode(sisa - sisa);

    cell.appendChild(cellText);
    cell2.appendChild(cellText2);
    cell3.appendChild(cellText3);
    row.appendChild(cell);
    row.appendChild(cell2);
    row.appendChild(cell3);
    tblBody.appendChild(row);
  }
  tbl.appendChild(thead);
  tbl.appendChild(tblBody);
  table.appendChild(tbl);
  tbl.setAttribute("border", "1");
  text.innerHTML = `Tabel Angsuran`
});
