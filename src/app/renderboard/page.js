"use client";
import React from "react";
import { useRouter } from 'next/navigation';
import { Button, Tooltip } from "@nextui-org/react";
import { MdLocalPrintshop } from "react-icons/md";
import ArtBoard from "@/components/ArtBoard";

export const RenderBoard = React.forwardRef(({dataObject,renderElements,handlePrint}, ref) =>   {

  function findIndices(str, substring) {
    let indices = [];
    let index = str.indexOf(substring);
    while (index !== -1) {
        indices.push(index);
        index = str.indexOf(substring, index + 1);
    }
    return indices;
}


  const convertToRendringText = (text, dataObject) => {
    let openIndices = findIndices(text, "{{");
    let closeIndices = findIndices(text, "}}");
    if (openIndices.length!==closeIndices.length) {
      return "Error in Formatting"
    }
    // Iterate over the keys of myObject
    for (let key in dataObject) {
      if (dataObject.hasOwnProperty(key)) {
        // Create a regular expression to match the placeholder {{key}}
        let placeholder = new RegExp("{{" + key + "}}", "g");

        // Replace the placeholder with the corresponding value
        text = text.replace(placeholder, dataObject[key]);
      }
    }
    return text;
  };

  return (
    <div style={{width:"210mm"}} className="border-1">
    <div className="w-full bg-gray-200 flex justify-end p-2">
    <Tooltip content="Print Your Pdf">
      <Button isIconOnly onClick={handlePrint} color="success" variant="shadow">
          <MdLocalPrintshop size={"50%"}/>
        </Button>
    </Tooltip>
    </div>
    <div ref={ref}>
      <div className="render-div">
      {dataObject.length>0?dataObject.map((fileData)=>{
        return (
          <ArtBoard
          textElements={renderElements}
          fileData={fileData}
          convertToRendringText={convertToRendringText}
          isRendingBoard={true}
        />
        )
      }):<h2 className="text-center py-10 text-2xl font-bold text-green-600">Add Excel Data</h2>}
      </div>
    </div>
    </div>
  );
});
