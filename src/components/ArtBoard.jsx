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
}) => {
  const [editableTextElements, setEditableTextElements] = useState({});

  // Function to handle double-click on a text element
  const handleDoubleClick = (textElement) => {
    setEditableTextElements((prevEditableTextElements) => ({
      ...prevEditableTextElements,
      [textElement.id]: true,
    }));
  };

  // Function to handle text input changes
  const handleTextInputChange = (e, textElement) => {
    const newText = e.target.value;
    setTextElements((prevElements) =>
      prevElements.map((element) =>
        element.id === textElement.id
          ? { ...element, content: newText }
          : element
      )
    );
  };

  // Function to handle text input blur and update the state
  const handleTextElementBlur = (textElement) => {
    setEditableTextElements((prevEditableTextElements) => ({
      ...prevEditableTextElements,
      [textElement.id]: false,
    }));
  };

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
            className="text-element absolute cursor-move whitespace-nowrap border-1"
            style={{
              left: textElement.x,
              top: textElement.y,
              maxWidth: "210mm",
            }}
            onMouseDown={(e) =>
              !isRendingBoard ? handleMouseDown(e, textElement) : null
            }
          >
            {editableTextElements[textElement.id] ? (
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
                onChange={(e) => handleTextInputChange(e, textElement)}
                onBlur={() => handleTextElementBlur(textElement)}
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
