import React, { useEffect, useRef } from "react";
import { pixelize } from "./pixelize";
import { PIXEL_SIZE } from "./consts";
import { CanvasWrapper } from "./canvasWrapper";

export const Canvas = ({ imgUrl }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "Anonimous";
    img.src = imgUrl;
    img.onload = () => {
      const imgWidth = img.width;
      const imgHeight = img.height;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      pixelize(PIXEL_SIZE, imgWidth, imgHeight, ctx);
    };
  }, [imgUrl]);

  return <CanvasWrapper ref={canvasRef} />;
};
