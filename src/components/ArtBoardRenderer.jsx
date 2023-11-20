import { RenderBoard } from "@/app/renderboard/page";
import React from "react";

const ArtBoardRenderer = ({
  handleMouseMove,
  handleMouseUp,
  textElements,
  handleMouseDown,
  handleTextBlur,
  componentRef,
  dataObject,
}) => {
  return (
    <div className="artboards flex justify-around">
      <div
        className="relative overflow-hidden border-2 border-black"
        id="artboard"
        style={{ width: "210mm", height: "297mm" }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {textElements.map((textElement) => (
          <div
            key={textElement.id}
            className="text-element absolute cursor-move whitespace-nowrap"
            style={{
              left: textElement.x,
              top: textElement.y,
              maxWidth: "210mm",
            }}
            onMouseDown={(e) => handleMouseDown(e, textElement)}
          >
            <p
              style={{ fontSize: textElement.fontSize + "px" }}
              className={textElement.isBold ? `font-bold` : ""}
              onBlur={() => handleTextBlur(textElement)}
            >
              {textElement.content}
            </p>
          </div>
        ))}
      </div>
      <div
        className="overflow-scroll"
        style={{ width: "210mm", height: "297mm" }}
      >
        <RenderBoard
          ref={componentRef}
          dataObject={dataObject}
          renderElements={textElements}
        />
      </div>
    </div>
  );
};

export default ArtBoardRenderer;
