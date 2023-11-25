import React from "react";
import Link from "next/link";

// Next UI Imports
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import {Accordion, AccordionItem} from "@nextui-org/react";

// Icons
import { BsTypeBold } from "react-icons/bs";

// Other Components
import PropertyControler from "./PropertyControler";
import FileUploader from "./FileUploader";
import PropertyAccordian from "./PropertyAccordian";

const ArtBoardControler = ({
  setDataObject,
  textElements,
  addText,
  handlePrint,
  handleTextPropertyChange,
}) => {

  return (
    <div className="artboard-controller p-4">
    <div>
      <h2 className="text-2xl font-bold">Artboard Controller</h2>
      <FileUploader setDataObject={setDataObject} />
      <div className="artboard-elements w-96">
        {textElements.map((textElement) => (
          <div className="my-2 w-full">
          <PropertyAccordian
            handleTextPropertyChange={handleTextPropertyChange}
            textElement={textElement}
          />
          </div>
        ))}
      </div>
      <button
        className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={addText}
      >
        Add Text
      </button>
      <Button onClick={handlePrint} variant="ghost">
        Print My Pdf
      </Button>
      </div>
    </div>
  );
};

export default ArtBoardControler;
