import { Button, Input } from '@nextui-org/react'
import React,{useState} from 'react'
import PropertyControler from './PropertyControler'
import { IoIosArrowBack } from "react-icons/io";

const PropertyAccordian = ({handleTextPropertyChange,textElement}) => {
    const [show, setShow] = useState(false)
  return (
    <>
        <div className='flex justify-between items-center gap-2'>
        <Input
              type="text"
              className='my-2'
              value={textElement.content}
              onChange={(e) =>
                handleTextPropertyChange(e, textElement, "content")
              }
            />
            <span onClick={()=>{setShow(!show)}}><IoIosArrowBack className={`${show?"-rotate-90":""}`}/></span>
        </div>
        {show&& <PropertyControler 
              handleTextPropertyChange={handleTextPropertyChange}
              textElement={textElement}
            />}
    </>
  )
}

export default PropertyAccordian