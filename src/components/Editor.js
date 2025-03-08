import React, { useRef, useEffect } from 'react';
import { fabric } from 'fabric';

export default function Editor({ template }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: template.width,
      height: template.height,
      backgroundColor: '#fff'
    });

    // Add template boundaries
    canvas.add(new fabric.Rect({
      width: template.width,
      height: template.height,
      fill: 'transparent',
      stroke: '#000',
      strokeWidth: 2
    }));

    return () => canvas.dispose();
  }, [template]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      fabric.Image.fromURL(event.target.result, img => {
        img.scaleToWidth(200);
        canvasRef.current.add(img);
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="editor">
      <canvas ref={canvasRef} />
      <input type="file" onChange={handleImageUpload} accept="image/*" />
    </div>
  );
}