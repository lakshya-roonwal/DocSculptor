"use client";
import FileUploader from "@/components/FileUploader";
import Link from "next/link";
import React, { useState } from "react";

const Artboard = () => {
  const [textElements, setTextElements] = useState([
    {
      id: 1699983425221,
      x: 184,
      y: 82,
      fontSize: "25",
      isBold: true,
      content: "Invitation to Lakshya's Party",
    },
    {
      id: 1699983464560,
      x: 16,
      y: 201,
      fontSize: 16,
      isBold: false,
      content:
        "Hello dear , {{Name}} this is to inform you that there will be a small party  at lakshy's house ",
    },
    {
      id: 1699983540034,
      x: 16,
      y: 245,
      fontSize: 16,
      isBold: false,
      content: "on : {{Date}} at : {{Time}}",
    },
    {
      id: 1699983590265,
      x: 295,
      y: 501,
      fontSize: "23",
      isBold: true,
      content: "Please Come",
    },
    {
      id: 1699983685279,
      x: 273,
      y: 974,
      fontSize: 16,
      isBold: false,
      content: "A request from my self",
    },
  ]);
  const [dataObject, setDataObject] = useState([]);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [editableText, setEditableText] = useState(""); // State to store editable text

  const addText = () => {
    const newText = {
      id: Date.now(),
      x: 10,
      y: 10,
      fontSize: 16,
      isBold: false,
      content: "Lorem Ipsum",
    };
    setTextElements([...textElements, newText]);
  };

  const handleMouseDown = (e, textElement) => {
    setIsDragging(true);
    setSelectedElement(textElement);
    setOffsetX(e.clientX - textElement.x);
    setOffsetY(e.clientY - textElement.y);
  };

  const handleMouseMove = (e) => {
    if (isDragging && selectedElement) {
      const updatedElement = {
        ...selectedElement,
        x: e.clientX - offsetX,
        y: e.clientY - offsetY,
      };
      setTextElements((prevElements) =>
        prevElements.map((element) =>
          element.id === selectedElement.id ? updatedElement : element
        )
      );
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setSelectedElement(null);
  };

  const handleTextChange = (event, textElement) => {
    console.log(event.target.value);
    const newText = event.target.value;
    setTextElements((prevElements) =>
      prevElements.map((element) =>
        element.id === textElement.id
          ? { ...element, content: newText }
          : element
      )
    );
    console.log(textElements);
  };

  const handleTextFontChange = (event, textElement) => {
    console.log(event.target.value);
    const newFontSize = event.target.value;
    setTextElements((prevElements) =>
      prevElements.map((element) =>
        element.id === textElement.id
          ? { ...element, fontSize: newFontSize }
          : element
      )
    );
    console.log(textElements);
  };

  const handleTextBoldChange = (event, textElement) => {
    console.log(event.target.value);
    let newIsBold = JSON.parse(event.target.value);
    if (newIsBold) {
      newIsBold = false;
    } else {
      newIsBold = true;
    }
    setTextElements((prevElements) =>
      prevElements.map((element) =>
        element.id === textElement.id
          ? { ...element, isBold: newIsBold }
          : element
      )
    );
    console.log(textElements);
  };

  const handleTextBlur = (textElement) => {
    // Update the text content in the state
    setTextElements((prevElements) =>
      prevElements.map((element) =>
        element.id === textElement.id
          ? { ...element, text: editableText }
          : element
      )
    );
  };

  return (
    <>
      <div className="artboard-controller p-4">
        <h2 className="text-2xl font-bold">Artboard Controller</h2>
        <FileUploader setDataObject={setDataObject} />
        <div className="artboard-elements">
          {textElements.map((textElement) => (
            <div key={textElement.id}>
              <textarea
                type="text"
                className="my-2 bg-gray-50 border- border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block p-2.5"
                value={textElement.content}
                onChange={(e) => handleTextChange(e, textElement)}
              />
              <div className="text-properties">
                <div className="text-position my-2">
                  <label htmlFor="">x : </label>
                  <input type="text" className="border" value={textElement.x} />
                  <label htmlFor="">y : </label>
                  <input type="text" className="border" value={textElement.y} />
                </div>
                <div className="text-styling">
                  <span>Bold</span>
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    value={textElement.isBold}
                    onChange={(e) => handleTextBoldChange(e, textElement)}
                  />

                  <span>Font Size</span>
                  <input
                    type="number"
                    value={textElement.fontSize}
                    onChange={(e) => handleTextFontChange(e, textElement)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={addText}
        >
          Add Text
        </button>
        <Link
          className="mx-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          href={
            { pathname: "/renderboard", 
            query: { 
              message:"Hello World"
              } }
            }
        >
          Render
        </Link>
      </div>
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
    </>
  );
};

export default Artboard;
