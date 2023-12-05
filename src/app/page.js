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
import DocumentCard from "@/components/DocumentCard";

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
      <div className="container">
        <div className="create-documents flex flex-col items-start gap-2 my-2">
          <h2 className="text-base ">Start a new document</h2>
          <div className="flex flex-col items-center">
          <Button isIconOnly variant="ghost" color="primary" className="w-36 h-52" onPress={onOpen}>
            <MdAdd size={"50%"}/>
          </Button>
            <p className="font-semibold">Blank Document</p>
          </div>
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
        <div className="documents p-2">
          <h1 className="text-base font-bold my-2">Recent Documents</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {documents.length>0?documents.map((document)=>{
            return (
            <DocumentCard document={document}/>
            )
          }):"No Documents to Present"}
          </div>
        </div>
      </div>
    </main>
  );
}
