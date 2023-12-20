"use client";
import Link from "next/link";
import {NextUIProvider} from "@nextui-org/react";
import React, { useState,useRef,useEffect  } from "react";
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useReactToPrint } from 'react-to-print';
import ArtBoardControler from "@/components/ArtBoardControler";
import ArtBoardRenderer from "@/components/ArtBoardRenderer";
import SecondaryControler from "@/components/SecondaryControler";

const Artboard = () => {

  // Getting Router
  const router = useRouter()

  // Getting the Query Parameter
  const searchParams = useSearchParams()
  const document = searchParams.get('document')
  // Checking Weather The search Params is available as a localstorage key
  const isKeyAvailable = localStorage.getItem(document) !== null;

  // For Getting the Data
    useEffect(()=>{
      // Getting Query
      console.log(document)
    
      if (isKeyAvailable) {
        setTextElements(JSON.parse(localStorage.getItem(document)))
      } else {
        router.push('/404');
        localStorage.removeItem(document)
      }
      },[])
    


  // States of The App
  const [textElements, setTextElements] = useState(isKeyAvailable?JSON.parse(localStorage.getItem(document)):router.push('/404'));
  const [dataObject, setDataObject] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedDragElement, setSelectedDragElement] = useState(null);
  const [selectedElement, setSelectedElement] = useState({id:""});
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [editableTextElements, setEditableTextElements] = useState({});

    // For Saving The Data
  useEffect(() => {
    localStorage.setItem(document,JSON.stringify(textElements))
  }, [textElements])
  


  // Add Text To the Text Elements Array
  const addText = () => {
    const newText = {
      id: Date.now(),
      x: 10,
      y: 10,
      fontSize: 16,
      color:"#000",
      isBold: false,
      isItalic:false,
      isUnderline:false,
      fontFamily:"__Inter_Fallback_725fdb,'Inter', sans-serif",
      content: "Lorem Ipsum",
    };
    setTextElements([...textElements, newText]);
  };

  // Element Movement Functions
  const handleMouseDown = (e, textElement) => {
    setIsDragging(true);
    setSelectedDragElement(textElement);
    setOffsetX(e.clientX - textElement.x);
    setOffsetY(e.clientY - textElement.y);
  };
  const handleMouseMove = (e) => {
    if (isDragging && selectedDragElement) {
      const updatedElement = {
        ...selectedDragElement,
        x: Math.max(e.clientX - offsetX,0),
        y: Math.max(e.clientY - offsetY,0),
      };
      setTextElements((prevElements) =>
        prevElements.map((element) =>
          element.id === selectedDragElement.id ? updatedElement : element
        )
      );
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
    setSelectedDragElement(null);
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

  // Text Property Change : Passed to PropertyContorler 
  const handleTextPropertyChange=(event,textElement,property)=>{
    let newTextProperty;
    if(property==="isBold"||property==="isItalic"||property==="isUnderline")
    {
      newTextProperty = event; //this is not event in the case of isBold the value is directy passed
      if (newTextProperty) {
        newTextProperty = false;
      } else {
        newTextProperty = true;
      }
    }
    else if(property==="x"||property==="y")
    {
      newTextProperty = Number(event.target.value);
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

  // Delete Text Element
  const handleDeleteElement=(id)=>{
    console.log(id);
    const newTextElements = textElements.filter(obj => obj.id !== id);

    // Update the state with the new array
    setTextElements(newTextElements);
  }

  // Function to handle double-click on a text element
  const handleDoubleClick = (textElement) => {
    setEditableTextElements((prevEditableTextElements) => ({
      ...prevEditableTextElements,
      [textElement.id]: true,
    }));
  };

  const handleSingleClick=(textElement)=>{
    setSelectedElement(textElement);
  }

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
    console.log(selectedElement);
    setSelectedElement(null);
    console.log(selectedElement);
  };


  // Component Ref For Print Component
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
    <NextUIProvider>
    <div className="flex justify-between">
      <ArtBoardControler
        textElements={textElements}
        setDataObject={setDataObject}
        addText={addText}
        selectedElement={selectedElement}
        handlePrint={handlePrint}
        handleDeleteElement={handleDeleteElement}
        handleTextPropertyChange={handleTextPropertyChange}
      />
      <ArtBoardRenderer
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          setTextElements={setTextElements}
          textElements={textElements}
          handleMouseDown={handleMouseDown}
          handleTextBlur={handleTextBlur}
          componentRef={componentRef}
          handlePrint={handlePrint}
          dataObject={dataObject}
          editableTextElements={editableTextElements}
          handleDoubleClick={handleDoubleClick}
          handleTextInputChange={handleTextInputChange}
          handleTextElementBlur={handleTextElementBlur}
          selectedElement={selectedElement}
          handleSingleClick={handleSingleClick}
      />
      <SecondaryControler/>
    </div>
    </NextUIProvider>
    </>
  );
};

export default Artboard;
