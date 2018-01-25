const fs = require('fs');

fs.readFile(process.argv[2], "utf8", (err, data) => {
  if (err) return console.log(err);
  const lines = data.split('\r\n');
  const trimLines = lines.map((line, index) => {
    for (let i = 0; i < line.length; i++){
      if(line[i] === '(') return line = line.substring(i);
    }
    return line;
  });

  const converted = trimLines.map((line) => {
    const lineArr = line.split('');
    if(lineArr[lineArr.length - 1] !== ')') return "";    
    for (let i = 0; i < lineArr.length; i++){
      if(lineArr[i] === '(') lineArr[i] = '[';
      if(lineArr[i] === ')') lineArr[i] = ']';
    }
    return lineArr.join('');
  });

  fs.writeFile("colors.js", "module.exports = [" + converted + "]", (err) => err ? console.log(err) : console.log("File Saved"));

})

