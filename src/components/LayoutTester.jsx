import { Button } from "@nextui-org/react";
import React from "react";
import { BsTypeBold } from "react-icons/bs";
import { FaItalic } from "react-icons/fa";
import { MdFormatUnderlined } from "react-icons/md";

const LayoutTester = () => {
  return (
    <div className="text-properties">
    

    <div className="flex gap-2">
      <Button isIconOnly>
        <BsTypeBold size={"50%"} />
      </Button>
      <Button isIconOnly>
        <FaItalic size={"50%"} />
      </Button>
      <Button isIconOnly>
        <MdFormatUnderlined size={"60%"} />
      </Button>
    </div>

    </div>
  );
};

export default LayoutTester;
