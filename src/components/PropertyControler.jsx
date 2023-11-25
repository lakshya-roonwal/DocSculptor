import { Button, Input } from "@nextui-org/react";
import React from "react";
import { BsTypeBold } from "react-icons/bs";
import { FaItalic } from "react-icons/fa";
import { MdFormatUnderlined } from "react-icons/md";
import {Select, SelectSection, SelectItem} from "@nextui-org/react";

const PropertyControler = ({handleTextPropertyChange,textElement}) => {
  // const handleFontFamilyChange=()=>{
  //   handleTextPropertyChange(e, textElement, "fontFamily")
  // }
  return (
    <div className="text-properties w-full flex flex-col gap-2">
    <div className="font-properties flex gap-2 ">
    <Select 
        label="Select Font" 
        className="w-3/4"
        onChange={(e) =>
        handleTextPropertyChange(e, textElement, "fontFamily")
        }
      >
        <SelectItem key={"__Inter_Fallback_725fdb,'Inter', sans-serif"} value={"__Inter_Fallback_725fdb,'Inter', sans-serif"}>Inter</SelectItem>
        <SelectItem key={"'Times New Roman', Times, serif"} value={"'Times New Roman', Times, serif"}>Times New Roman</SelectItem>
        <SelectItem key={"'Lora', serif"} value={"'Lora', serif"}>Lora</SelectItem>
        <SelectItem key={"'Montserrat', sans-serif"} value={"'Montserrat', sans-serif"}>Montserrat</SelectItem>
        <SelectItem key={"'Open Sans', sans-serif"} value={"'Open Sans', sans-serif"}>Open Sans</SelectItem>
        <SelectItem key={"'Pacifico', cursive"} value={"'Pacifico', cursive"}>Pacifico</SelectItem>
      </Select>
      <Input 
      type="number" 
      className="w-1/4"
      value={textElement.fontSize}
      onChange={(e) =>
        handleTextPropertyChange(e, textElement, "fontSize")
      }
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
      onChange={(e) =>
      handleTextPropertyChange(e, textElement, "x")
      }/>

      <Input 
      type="number" 
      className="w-1/3" 
      value={textElement.y}
      onChange={(e) =>
      handleTextPropertyChange(e, textElement, "y")
      }/>
      </div>
    </div>

    </div>
  );
};

export default PropertyControler;
