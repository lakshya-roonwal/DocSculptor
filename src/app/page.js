"use client";
import AddDocumentModal from "@/components/AddDocumentModal";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { MdAdd } from "react-icons/md";
import slugify from 'react-slugify';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [documents, setDocuments] = useState([]);
  const [singleDocument, setSingleDocument] = useState({
    documentName: "",
    documentSlug: "",
  });

  useState(()=>{
    // if the app is new and all documents don't exist
    const isKeyAvailable = localStorage.getItem("AllDocuments") !== null;
    if(!isKeyAvailable)
    {
      localStorage.setItem("AllDocuments",JSON.stringify([]))
    }
    setDocuments(JSON.parse(localStorage.getItem("AllDocuments")))
    
  },[])

  const handleSingleDocumentChange=(e)=>{
    const name=e.target.name;
    const value=e.target.value;

    // Created The Slug
    const slug = slugify(value);

    setSingleDocument((prevDocument) => ({
      ...prevDocument,
      [name]: value,
      documentSlug: slug,
    }));
  }

  const addNewDocument=()=>{
      const oldDocuemtns=JSON.parse(localStorage.getItem("AllDocuments"))
      oldDocuemtns.push(singleDocument);
      localStorage.setItem("AllDocuments",JSON.stringify(oldDocuemtns))
      localStorage.setItem(singleDocument.documentSlug,JSON.stringify([]))
      setDocuments(JSON.parse(localStorage.getItem("AllDocuments")))
  }

  console.log(documents)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16">
      <div className="container border-2">
        <div className="create-documents">
          <h2 className="text-2xl font-bold underline">Create Document</h2>
          <Button isIconOnly variant="solid" color="primary" onPress={onOpen}>
            <MdAdd />
          </Button>
        </div>
        <AddDocumentModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onOpen={onOpen}
          setSingleDocument={setSingleDocument}
          singleDocument={singleDocument}
          handleSingleDocumentChange={handleSingleDocumentChange}
          addNewDocument={addNewDocument}
        />
        <div className="documents">
          <h1 className="text-2xl font-bold">Your Documents</h1>
          {documents.length>0?documents.map((document)=>{
            return (
            <div className="document">
              <h2 className="text-2xl-font-bold">{document.documentName}</h2>
              <Link href={{pathname:`/editboard/`,query:{document:document.documentSlug}}}>
                <p>Go To Document</p>
              </Link>
            </div>
            )
          }):"No Documents to Present"}
        </div>
      </div>
    </main>
  );
}
