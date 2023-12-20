import React from "react";
import Link from "next/link";

// Next UI Imports
import { Button, Tooltip } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import {Accordion, AccordionItem} from "@nextui-org/react";

// Icons
import { BsTypeBold } from "react-icons/bs";

// Other Components
import FileUploader from "./FileUploader";
import PropertyAccordian from "./PropertyAccordian";
import PropertyControler from "./PropertyControler";

const ArtBoardControler = ({
  setDataObject,
  textElements,
  addText,
  handleDeleteElement,
  selectedElement,
  handleTextPropertyChange,
}) => {

  return (
    <div className="artboard-controller min-h-screen p-4 shadow-lg w-96">
      <h2 className="text-2xl font-bold">Artboard Controller</h2>
      <FileUploader setDataObject={setDataObject} />
      <Tooltip content="Add Text To Document">
      <Button
        className="my-2"
        color="primary"
        onClick={addText}
      >
        Add Text
      </Button>
      </Tooltip>
      <div className="artboard-elements h-[32rem] overflow-scroll">
      <PropertyControler
        handleTextPropertyChange={handleTextPropertyChange}
        textElements={textElements}
        textElement={selectedElement}
        handleDeleteElement={handleDeleteElement}
      />
        {/* {textElements.map((textElement) => (
          <div className="my-2 w-full">
          <PropertyAccordian
          handleDeleteElement={handleDeleteElement}
            handleTextPropertyChange={handleTextPropertyChange}
            textElement={textElement}
          />
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default ArtBoardControler;
