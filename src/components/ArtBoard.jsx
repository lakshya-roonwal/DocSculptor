import React, { useState } from "react";

const ArtBoard = ({
  handleMouseMove,
  handleMouseUp,
  textElements,
  handleMouseDown,
  handleTextBlur,
  isRendingBoard,
  convertToRendringText,
  fileData,
  setTextElements,
  editableTextElements,
  handleDoubleClick,
  handleTextInputChange,
  handleTextElementBlur,
  handleSingleClick
}) => {
  return (
    <div
      className="relative overflow-hidden"
      id="artboard"
      style={{ width: "210mm", height: "297mm" }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {textElements.length > 0 ? (
        textElements.map((textElement) => (
          <div
            key={textElement.id}
            className={`text-element absolute cursor-move whitespace-nowrap ${!isRendingBoard?textElement.isSelected?'outline-dashed outline-2 outline-offset-4 outline-blue-700':"":null}`}
            style={{
              transform:`translate(${textElement.alignment === "center"?"-50%":""})`,
              left: textElement.alignment === "left"||textElement.alignment === "center" ? textElement.x : null,
              right: textElement.alignment === "right" ? textElement.x : null,
              top: textElement.y,
              maxWidth: "210mm",
            }}
            focusout={() => handleTextElementBlur(textElement)}
            onMouseDown={(e) =>
              !isRendingBoard ? handleMouseDown(e, textElement) : null
            }
          >
            {(isRendingBoard?false:editableTextElements[textElement.id]) ? (
              <input
                type="text"
                style={{
                  fontSize: textElement.fontSize + "px",
                  fontFamily: textElement.fontFamily,
                  color: textElement.color,
                }}
                className={`
                  w-auto
                  ${textElement.isBold ? "font-bold" : ""}
                  ${textElement.isItalic ? "italic" : ""}
                  ${textElement.isUnderline ? "underline" : ""}
                `}
                value={textElement.content}
                onBlur={()=>{
                  handleTextElementBlur(textElement)
                }}
                onChange={(e) => handleTextInputChange(e, textElement)}
              />
            ) : (
              <p
                style={{
                  fontSize: textElement.fontSize + "px",
                  fontFamily: textElement.fontFamily,
                  color: textElement.color,
                }}
                className={`
                  ${textElement.isBold ? "font-bold" : ""}
                  ${textElement.isItalic ? "italic" : ""}
                  ${textElement.isUnderline ? "underline" : ""}
                `}
                onDoubleClick={() =>
                  !isRendingBoard
                    ? handleDoubleClick(textElement)
                    : console.log("Not Worked")
                }
                onClick={() =>
                  !isRendingBoard
                    ? handleSingleClick(textElement)
                    : console.log("Not Worked")
                }
              >
                {isRendingBoard
                  ? convertToRendringText(textElement.content, fileData)
                  : textElement.content}
              </p>
            )}
          </div>
        ))
      ) : (
        <h2 className="text-center py-10 text-2xl font-bold text-green-600">
          Add Some Elements
        </h2>
      )}
    </div>
  );
};

export default ArtBoard;
