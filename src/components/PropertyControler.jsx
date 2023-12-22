import { Button, Input } from "@nextui-org/react";
import React from "react";
import { BsTypeBold } from "react-icons/bs";
import { FaItalic } from "react-icons/fa";
import { TfiAlignCenter,TfiAlignLeft,TfiAlignRight  } from "react-icons/tfi";
import { MdDelete, MdFormatUnderlined } from "react-icons/md";
import { Select, SelectSection, SelectItem } from "@nextui-org/react";

const PropertyControler = ({
  handleTextPropertyChange,
  selectedElement,
  handleDeleteElement,
}) => {
  const textElement=selectedElement[0];
  // const handleFontFamilyChange=()=>{
  //   handleTextPropertyChange(e, textElement, "fontFamily")
  // }
  return (
    <>
  {textElement?
  <div className="text-properties w-full flex flex-col gap-2">
      <div className="font-properties flex gap-2 ">
        <Select
          label="Select Font"
          className="w-3/4"
          onChange={(e) =>
            handleTextPropertyChange(e, textElement, "fontFamily")
          }
        >
          <SelectItem
            key={"__Inter_Fallback_725fdb,'Inter', sans-serif"}
            value={"__Inter_Fallback_725fdb,'Inter', sans-serif"}
          >
            Inter
          </SelectItem>
          <SelectItem
            key={"'Times New Roman', Times, serif"}
            value={"'Times New Roman', Times, serif"}
          >
            Times New Roman
          </SelectItem>
          <SelectItem key={"'Lora', serif"} value={"'Lora', serif"}>
            Lora
          </SelectItem>
          <SelectItem
            key={"'Montserrat', sans-serif"}
            value={"'Montserrat', sans-serif"}
          >
            Montserrat
          </SelectItem>
          <SelectItem
            key={"'Open Sans', sans-serif"}
            value={"'Open Sans', sans-serif"}
          >
            Open Sans
          </SelectItem>
          <SelectItem key={"'Pacifico', cursive"} value={"'Pacifico', cursive"}>
            Pacifico
          </SelectItem>
        </Select>
        <Input
          type="number"
          className="w-1/4"
          value={textElement.fontSize}
          onChange={(e) => handleTextPropertyChange(e, textElement, "fontSize")}
        />
      </div>
      <div className="style-and-postion flex items-center">
        <div className="font-style-properties flex gap-2">
          <Button
            // Bold Button
            color={`${textElement.isBold ? "primary" : "default"}`}
            onClick={() => {
              if (textElement.isBold) {
                handleTextPropertyChange(
                  textElement.isBold,
                  textElement,
                  "isBold"
                );
              } else {
                handleTextPropertyChange(
                  textElement.isBold,
                  textElement,
                  "isBold"
                );
              }
            }}
            isIconOnly
          >
            <BsTypeBold size={"50%"} />
          </Button>
          <Button
            // Bold Button
            color={`${textElement.isItalic ? "primary" : "default"}`}
            onClick={() => {
              if (textElement.isBold) {
                handleTextPropertyChange(
                  textElement.isItalic,
                  textElement,
                  "isItalic"
                );
              } else {
                handleTextPropertyChange(
                  textElement.isItalic,
                  textElement,
                  "isItalic"
                );
              }
            }}
            isIconOnly
          >
            <FaItalic size={"50%"} />
          </Button>
          <Button
            // Bold Button
            color={`${textElement.isUnderline ? "primary" : "default"}`}
            onClick={() => {
              if (textElement.isBold) {
                handleTextPropertyChange(
                  textElement.isUnderline,
                  textElement,
                  "isUnderline"
                );
              } else {
                handleTextPropertyChange(
                  textElement.isUnderline,
                  textElement,
                  "isUnderline"
                );
              }
            }}
            isIconOnly
          >
            <MdFormatUnderlined size={"60%"} />
          </Button>
        </div>
        <div className="postion flex justify-end gap-2">
          <Input
            type="number"
            className="w-1/3"
            value={textElement.x}
            onChange={(e) => handleTextPropertyChange(e, textElement, "x")}
          />

          <Input
            type="number"
            className="w-1/3"
            value={textElement.y}
            onChange={(e) => handleTextPropertyChange(e, textElement, "y")}
          />
        </div>
      </div>

      <div className="flex gap-2 items-center">
      <Button
            // Bold Button
            color={`${textElement.alignment==="left" ? "primary" : "default"}`}
            onClick={() => {
                handleTextPropertyChange(
                  "left",
                  textElement,
                  "alignment"
                );
            }}
            isIconOnly
          >
            <TfiAlignLeft size={"50%"} />
          </Button>
          <Button
            // Bold Button
            color={`${textElement.isBold ? "primary" : "default"}`}
            onClick={() => {
                handleTextPropertyChange(
                  "left",
                  textElement,
                  "alignment"
                );
            }}
            isIconOnly
          >
            <TfiAlignCenter size={"50%"} />
          </Button>
          <Button
            // Bold Button
            color={`${textElement.alignment==="right"  ? "primary" : "default"}`}
            onClick={() => {
                handleTextPropertyChange(
                  "right",
                  textElement,
                  "alignment"
                );
            }}
            isIconOnly
          >
            <TfiAlignRight size={"50%"} />
          </Button>
      </div>

      <div className="flex justify-between items-center">
        <div className="color-input-group flex">
          <input 
            type="color" 
            name="" 
            id="" 
            value={textElement.color}
            onChange={(e) => handleTextPropertyChange(e, textElement, "color")}  
            />
            <p>{textElement.color}</p>
        </div>
        <Button 
          variant="ghost" 
          isIconOnly  
          onClick={()=>{
            handleDeleteElement(textElement.id)
          }}
        >
          <MdDelete size={"60%"} color="#8b0000" />
        </Button>
      </div>
    </div>:null}
    </>
  );
};

export default PropertyControler;