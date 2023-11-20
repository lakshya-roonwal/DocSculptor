"use client";
import Link from "next/link";
import React, { useState,useRef  } from "react";
import { useReactToPrint } from 'react-to-print';
import ArtBoardControler from "@/components/ArtBoardControler";
import ArtBoardRenderer from "@/components/ArtBoardRenderer";


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

  const handleTextPropertyChange=(event,textElement,property)=>{
    let newTextProperty;
    if(property==="isBold")
    {
      newTextProperty = JSON.parse(event.target.value);
      if (newTextProperty) {
        newTextProperty = false;
      } else {
        newTextProperty = true;
      }
    }
    else if(property==="x"||property==="y")
    {
      newTextProperty = JSON.parse(event.target.value);
    }
    else
    {
      newTextProperty = event.target.value;
    }
    console.log("Text Property:"+newTextProperty);
    console.log(typeof newTextProperty)
    setTextElements((prevElements) =>
      prevElements.map((element) =>
        element.id === textElement.id
          ? { ...element, [property]: newTextProperty }
          : element
      )
    );
    console.log(textElements);
  }

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

  const handleTextFontSizeChange = (event, textElement) => {
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

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <ArtBoardControler
        textElements={textElements}
        setDataObject={setDataObject}
        addText={addText}
        handlePrint={handlePrint}
        handleTextFontSizeChange={handleTextFontSizeChange}
        handleTextBoldChange={handleTextBoldChange}
        handleTextChange={handleTextChange}
        handleTextPropertyChange={handleTextPropertyChange}
      />
      <ArtBoardRenderer
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          textElements={textElements}
          handleMouseDown={handleMouseDown}
          handleTextBlur={handleTextBlur}
          componentRef={componentRef}
          dataObject={dataObject}
      />
    </>
  );
};

export default Artboard;
