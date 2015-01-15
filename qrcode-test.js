var sizeOf = require('image-size');
var qread = require('./src/qread');
var fs = require('fs');
var getPixels = require("get-pixels")

Buffer.prototype.toByteArray = function () {
  return Array.prototype.slice.call(this, 0)
}

fs.readFile('examples/o5.jpg', function (err, buf) {
  if (err) throw err;
  try{
    var imageinfo = sizeOf(buf);
  }catch(e){
    console.error(e);
  }
  if(imageinfo){
    getPixels(buf,'image/'+imageinfo.type.replace('jpg','jpeg'),function(err, pixels) {
      if(err){
          console.err('get pixels error: '+err);
      }else{
          var iarr = [];
          var pd = pixels.data;
          for(i in pd){
            if(pd.hasOwnProperty(i)){
              if(/^\d+$/.test(i) && /^\d+$/.test(pd[i])){
                iarr.push(pd[i]);
              }
            }
          }
          imageinfo['data'] = iarr;
          qread(imageinfo, function(val){
            if(val)console.log(val);
            else console.error("Can not read qrcode!");
          });
      }
    });
  }
});
