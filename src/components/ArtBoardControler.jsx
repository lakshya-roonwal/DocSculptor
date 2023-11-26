import React from "react";
import Link from "next/link";

// Next UI Imports
import { Button, Tooltip } from "@nextui-org/react";
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
      <Tooltip content="Add Text To Document">
      <Button
        className="my-2"
        color="primary"
        onClick={addText}
      >
        Add Text
      </Button>
      </Tooltip>
      </div>
    </div>
  );
};

export default ArtBoardControler;
