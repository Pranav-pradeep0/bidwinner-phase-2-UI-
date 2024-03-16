import React, { useEffect, useRef, useState } from "react";
import { useImageSize } from "react-image-size";

interface Coordinate {
  top: number;
  left: number;
}

interface ImageZoomProps {
  src: string;
  rectCoordinates: any;
  setRectCoordinates: any
}

const ImageZoomcomponent: React.FC<ImageZoomProps> = ({ src, rectCoordinates, setRectCoordinates }) => {
  const [dimensions] = useImageSize(src);
  const [isPanning, setPanning] = useState(false);
  const [image, setImage] = useState<{ width: number; height: number }>();
  const [rectStart, setRectStart] = useState<Coordinate | null>(null);
  const [rectEnd, setRectEnd] = useState<Coordinate | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [finalRect, setFinalRect] = useState<{
    start: Coordinate | null;
    end: Coordinate | null;
  } | null>(null);


  console.log(rectCoordinates);

  const nodes = {
    pan: true,
    dot: false,
    rectangleSelect: true,
  };

  const [clickCoordinates, setClickCoordinates] = useState<Coordinate[]>([]);

  const cursor = "default";

  const [position, setPosition] = useState({
    oldX: 0,
    oldY: 0,
    x: 0,
    y: 0,
    z: 1,
  });

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (nodes.dot) {
      const rect = imgRef.current!.getBoundingClientRect();
      const scaleX = image!.width / rect.width;
      const scaleY = image!.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;

      const top = (y / dimensions?.height!) * 100;
      const left = (x / dimensions?.width!) * 100;

      setClickCoordinates((prev) => [...prev, { top, left }]);
    }
  };

  const imgRef = useRef<HTMLImageElement>(null);
  const finalContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const onLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImage({
      width: e.currentTarget.naturalWidth,
      height: e.currentTarget.naturalHeight,
    });
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (nodes.rectangleSelect) {
      setFinalRect(null);
      const rect = imgRef.current!.getBoundingClientRect();
      const scaleX = image!.width / rect.width;
      const scaleY = image!.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      setRectCoordinates((prev: any) => ({ ...prev, topStart: x, topLeft: y }));

      const top = (y / dimensions?.height!) * 100;
      const left = (x / dimensions?.width!) * 100;
      setRectStart({ top, left });
      setIsDrawing(true);
    } else {
      setPanning(true);
      setPosition({
        ...position,
        oldX: e.clientX,
        oldY: e.clientY,
      });
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDrawing) return;
    const rect = imgRef.current!.getBoundingClientRect();
    const scaleX = image!.width / rect.width;
    const scaleY = image!.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    setRectCoordinates((prev: any) => ({
      ...prev,
      bottomEnd: x,
      bottomRight: y,
    }));

    const top = (y / dimensions?.height!) * 100;
    const left = (x / dimensions?.width!) * 100;
    setRectEnd({ top, left });
  };

  const onMouseUp = () => {
    console.log("mouseUp");
    setIsDrawing(false);
    setFinalRect({ start: rectStart, end: rectEnd });
  };

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDrawing(false);
      setFinalRect({ start: rectStart, end: rectEnd });
      setRectEnd(null);
      setRectStart(null);
    };

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [rectStart, rectEnd]);

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY) {
      const sign = Math.sign(e.deltaY) / 10;
      const scale = 1 - sign;
      const rect = containerRef.current!.getBoundingClientRect();
      setPosition({
        ...position,
        x: position.x * scale - (rect.width / 2 - e.clientX + rect.x) * sign,
        y:
          position.y * scale -
          ((image!.height * rect.width) / image!.width / 2 -
            e.clientY +
            rect.y) *
          sign,
        z: position.z * scale,
      });

      console.log("position", position);
    }
  };

  useEffect(() => {
    if (nodes.pan) {
      const mouseup = () => {
        setPanning(false);
      };

      const mousemove = (event: MouseEvent) => {
        if (isPanning) {
          setPosition({
            ...position,
            x: position.x + event.clientX - position.oldX,
            y: position.y + event.clientY - position.oldY,
            oldX: event.clientX,
            oldY: event.clientY,
          });
        }
      };

      window.addEventListener("mouseup", mouseup);
      window.addEventListener("mousemove", mousemove);

      return () => {
        window.removeEventListener("mouseup", mouseup);
        window.removeEventListener("mousemove", mousemove);
      };
    }
  });

  console.log(isDrawing);

  console.log("coordinates", rectCoordinates);

  return (
    <>
      {/* <div>
        <div>Dot Count {clickCoordinates.length}</div>
        <button onClick={() => setNodes((prev) => ({ ...prev, dot: true }))}>
          add dot
        </button>
        <button onClick={() => setNodes((prev) => ({ ...prev, dot: false }))}>
          stop dot
        </button>
      </div> */}
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onWheel={onWheel}
        style={{
          overflow: "hidden",
          height: "500px",
          width: "800px",
          position: "relative",
        }}
      >
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${position.z})`,
            position: "absolute",
          }}
        >
          <img
            ref={imgRef}
            alt="floorplan"
            src={src}
            onLoad={onLoad}
            style={{ width: "100%", height: "100%", cursor: cursor }}
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
          />
          {clickCoordinates.map((dot, ind) => {
            return (
              <div
                key={ind}
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  width: position.z > 1.5 ? "4px" : "8px",
                  height: position.z > 1.5 ? "4px" : "8px",
                  background: "red",
                  borderRadius: "50%",
                  left: `${dot.left}%`,
                  top: `${dot.top}%`,
                }}
              />
            );
          })}

          {isDrawing && rectStart && rectEnd && (
            <div
              style={{
                position: "absolute",
                left: `${Math.min(rectStart.left, rectEnd.left)}%`,
                top: `${Math.min(rectStart.top, rectEnd.top)}%`,
                width: `${Math.abs(rectStart.left - rectEnd.left)}%`,
                height: `${Math.abs(rectStart.top - rectEnd.top)}%`,
                border: `${position.z < 4 ? "2px" : "0.8px"} solid red`,
              }}
            />
          )}

          {finalRect && (
            <div
              ref={finalContainerRef}
              style={{
                position: "absolute",
                left: `${Math.min(
                  finalRect?.start!?.left,
                  finalRect?.end!?.left
                )}%`,
                top: `${Math.min(
                  finalRect?.start!?.top,
                  finalRect?.end!?.top
                )}%`,
                width: `${Math.abs(
                  finalRect?.start!?.left - finalRect?.end!?.left
                )}%`,
                height: `${Math.abs(
                  finalRect?.start!?.top - finalRect?.end!?.top
                )}%`,
                border: `${position.z < 4 ? "2px" : "0.8px"} dashed red`,
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ImageZoomcomponent;
