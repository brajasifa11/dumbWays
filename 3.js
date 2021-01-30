let s = '';

for (var i=1;i<=5;i++){

  for (var j=i;j<=5;j++){
    s += ' ';
  }
  for (var k=1;k<=i;k++){
    s += "*";
  }
  for (var l=1;l<=i-1;l++){
    s += "*";
  }
  s += '\n';
}

for (var i=1;i<=5;i++){
  
  for (var j=1;j<=i;j++){
    s += " "
  }
  for (var k=5;k>=i;k--){
    s += "*";
  }
  for (var l=5;l>i;l--){
    s += "*";
  }
  s += '\n';
}

console.log(s);
