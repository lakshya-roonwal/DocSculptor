import React, { useState } from "react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import { GoKebabHorizontal } from "react-icons/go";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

const DocumentCard = ({ document }) => {
  const [documentShower, setDocumentShower] = useState(
    JSON.parse(localStorage.getItem(document.documentSlug))
  );

  return (
    <Card className="max-w-[400px] p-2">
      <CardBody>
        <div className="document flex items-center justify-between">
          <Link
            href={{
              pathname: `/editboard/`,
              query: { document: document.documentSlug },
            }}
          >
            <h2 className="text-md">{document.documentName}</h2>
          </Link>

          <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly>
                <GoKebabHorizontal size={"50%"} />
            </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Document Actions">
              <DropdownItem key="duplicate">Duplicate</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                Delete Document
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

        </div>
      </CardBody>
    </Card>
  );
};

export default DocumentCard;
