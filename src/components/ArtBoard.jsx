import React from 'react'

const ArtBoard = ({
    handleMouseMove,
    handleMouseUp,
    textElements,
    handleMouseDown,
    handleTextBlur,
    isRendingBoard
}) => {
  return (
    <div
    className="relative overflow-hidden border-2 border-black"
    id="artboard"
    style={{ width: "210mm", height: "297mm" }}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
  >
    {textElements.length>0?textElements.map((textElement) => (
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
          style={{ fontSize: textElement.fontSize + "px",fontFamily:textElement.fontFamily,color:textElement.color }}
          className={`
            ${textElement.isBold ? `font-bold` : ""}
            ${textElement.isItalic ? `italic` : ""}
            ${textElement.isUnderline ? `underline` : ""}
            `}
          onBlur={() => handleTextBlur(textElement)}
        >
          {textElement.content}
        </p>
      </div>
    )):<h2 className="text-center py-10 text-2xl font-bold text-green-600">Add Some Elements</h2>}

  </div>
  )
}

export default ArtBoard