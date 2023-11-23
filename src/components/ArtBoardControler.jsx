import React from "react";
import FileUploader from "./FileUploader";
import Link from "next/link";

// Next UI Imports
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useCheckbox, Chip, VisuallyHidden, tv } from "@nextui-org/react";

// Icons
import { BsTypeBold } from "react-icons/bs";

const checkbox = tv({
  slots: {
    base: "border-default hover:bg-default-200",
    content: "text-default-500",
  },
  variants: {
    isSelected: {
      true: {
        base: "border-primary bg-primary hover:bg-primary-500 hover:border-primary-500",
        content: "text-primary-foreground pl-1",
      },
    },
    isFocusVisible: {
      true: {
        base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
      },
    },
  },
});

const ArtBoardControler = ({
  setDataObject,
  textElements,
  addText,
  handlePrint,
  handleTextPropertyChange,
}) => {
  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    defaultSelected: true,
  });

  return (
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
              onChange={(e) =>
                handleTextPropertyChange(e, textElement, "content")
              }
            />
            <div className="text-properties">
              <div className="text-position my-2">
                <label htmlFor="">x : </label>
                <input
                  type="number"
                  className="border"
                  value={textElement.x}
                  onChange={(e) =>
                    handleTextPropertyChange(e, textElement, "x")
                  }
                />
                <label htmlFor="">y : </label>
                <input
                  type="number"
                  className="border"
                  value={textElement.y}
                  onChange={(e) =>
                    handleTextPropertyChange(e, textElement, "y")
                  }
                />
              </div>
              <div className="text-styling">
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
                <Input
                  type="number"
                  label="Font Size"
                  value={textElement.fontSize}
                  onChange={(e) =>
                    handleTextPropertyChange(e, textElement, "fontSize")
                  }
                  placeholder="0.00"
                  labelPlacement="outside"
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
        href={{
          pathname: "/renderboard",
          query: {
            message: "Hello World",
          },
        }}
      >
        Render
      </Link>
      <Button onClick={handlePrint} variant="ghost">
        Print My Pdf
      </Button>
    </div>
  );
};

export default ArtBoardControler;
