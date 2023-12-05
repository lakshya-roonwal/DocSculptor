import { RenderBoard } from "@/app/renderboard/page";
import React from "react";
import {Tabs, Tab} from "@nextui-org/react";
import ArtBoard from "./ArtBoard";

const ArtBoardRenderer = ({
  handleMouseMove,
  handleMouseUp,
  textElements,
  handleMouseDown,
  handleTextBlur,
  componentRef,
  dataObject,
  handlePrint
}) => {
  return (
    <div className="artboards flex flex-col">
    <Tabs>
    <Tab key="singleboard" title="Edit Doc">
      <ArtBoard
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          textElements={textElements}
          handleMouseDown={handleMouseDown}
          handleTextBlur={handleTextBlur}
          isRendingBoard={false}
      />
      </Tab>
      <Tab key="multipageboard" title="Your Pdf">
      <div
        className="overflow-y-scroll "
        style={{ height: "297mm"}}
      >
        <RenderBoard
          handlePrint={handlePrint}
          ref={componentRef}
          dataObject={dataObject}
          renderElements={textElements}
        />
      </div>
      </Tab>
      </Tabs>
    </div>
  );
};

export default ArtBoardRenderer;
