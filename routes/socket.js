const fs = require('fs');

module.exports = function (socket) {
  socket.emit('send:name', {
    name: 'Amazonians'
  });

  const multiple = 10;
  // let t = Math.ceil(Math.random()*90);
  let t = -Math.PI;

  setInterval(function () {
    socket.emit('send:time', {
      // time: 2*t%1-0.5
      // time: (1-0.9*Math.cos(8*t))*(1+0.1*Math.cos(24*t))*(0.9+0.05*Math.cos(200*t))*(1+Math.sin(t))
      // time: Math.sin(multiple * Math.PI * t/180)
      time: multiple + (2*Math.random() - 1)
    });
    t+=0.08;
  }, 340);

  var filePath = __dirname + '/../test.txt';
  var file = fs.readFileSync(filePath);

  socket.emit('send:file',{
    fileContents: file.toString()
  });

  fs.watchFile(filePath,function(current,previous){
    file = fs.readFileSync(filePath);
    socket.emit('send:file',{
      fileContents: file.toString()
    });
  });
};