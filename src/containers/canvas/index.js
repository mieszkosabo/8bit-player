import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { itemSelector } from "../app/selectors";

export const Canvas = () => {
  const item = useSelector(itemSelector);

  // bad code, TODO: put these to redux
  var imgWidth, imgHeight, ctx;
  // helpers
  var getAverageRGB = function(imgData) {
    var red = 0;
    var green = 0;
    var blue = 0;
    var total = 0;

    for (var i = 0; i < imgData.length; i += 4) {
      if (imgData[i + 3] !== 0) {
        red += imgData[i + 0];
        green += imgData[i + 1];
        blue += imgData[i + 2];
        total++;
      }
    }

    var avgRed = Math.floor(red / total);
    var avgGreen = Math.floor(green / total);
    var avgBlue = Math.floor(blue / total);

    return "rgba(" + avgRed + "," + avgGreen + "," + avgBlue + ", 1)";
  };

  var pixelatize = function(size) {
    for (var x = 0; x < imgWidth; x += size) {
      for (var y = 0; y < imgHeight; y += size) {
        var pixels = ctx.getImageData(x, y, size, size);
        var averageRGBA = getAverageRGB(pixels.data);
        ctx.fillStyle = averageRGBA;
        ctx.fillRect(x, y, size, size);
      }
    }
  };
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    ctx = canvas.getContext("2d"); // dispach to redux
    const img = new Image();
    img.crossOrigin = "Anonimous";
    img.src = item.album.images[0].url;
    img.onload = function() {
      imgWidth = img.width;
      imgHeight = img.height;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      pixelatize(8);
    };
  });

  return <canvas ref={canvasRef} />;
};