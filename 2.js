function hitungHurufDariKalimat(letter, sentence) {
  let totalLetter = 0;
  for (let i = 0; i < sentence.length; i++) {
    if (sentence[i] === letter) {
      totalLetter++;
    }
  }
  return totalLetter;
}

let letter = 'a';
let sentence = 'saya mau makan sate bersama teman saya setelah lulus dari sekolah dasar';

console.log(hitungHurufDariKalimat(letter, sentence));