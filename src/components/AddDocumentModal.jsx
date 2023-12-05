import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Checkbox,
  Link,
} from "@nextui-org/react";
import { BsLock, BsMailbox } from "react-icons/bs";

const AddDocumentModal = ({
  isOpen,
  onOpenChange,
  singleDocument,
  handleSingleDocumentChange,
  addNewDocument
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Document
            </ModalHeader>
            <ModalBody>
              <Input
                //   autoFocus
                label="Your Document Name"
                name="documentName"
                placeholder=""
                variant="bordered"
                // onChange={(e)=>{handleSingleDocumentChange(e)}}
                onChange={handleSingleDocumentChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={(e)=>{
                addNewDocument(e);
                onClose();
              }} >
                Add
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddDocumentModal;
