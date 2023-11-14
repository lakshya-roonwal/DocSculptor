"use client";
import React from "react";
const RenderBoard = () => {
  const myTestTextElements = [
    {
      id: 1699943825517,
      x: 664,
      y: 125,
      fontSize: 16,
      isBold: false,
      content: "Happy Birthday ",
    },
    {
      id: 1699943826497,
      x: 12,
      y: 126,
      fontSize: 16,
      isBold: false,
      content: "Your are {{Data}}",
    },
    {
      id: 1699943827661,
      x: 305,
      y: 11,
      fontSize: "20",
      isBold: true,
      content: "My Name is {{Name}}",
    },
  ];

  const myTestObject = [
    {
      "S.No.": "1",
      Name: "Krishna",
      Data: "Nothing",
    },
    {
      "S.No.": "2",
      Name: "Ramesh",
      Data: "Anything",
    },
    {
      "S.No.": "3",
      Name: "Suresh",
      Data: "Everything",
    },
    {
      "S.No.": "4",
      Name: "Kailash",
      Data: "Something",
    },
    {
      "S.No.": "5",
      Name: "Neha",
      Data: "A Few Thing",
    },
    {
      "S.No.": "6",
      Name: "Ramika",
      Data: "No data",
    },
  ];

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
    <div>
      <div className="render-div">
      {myTestObject.map((testData)=>{
        return (
        <div
          className="document-render"
          style={{ width: "210mm", height: "297mm", position: "relative" }}
        >
          {myTestTextElements.map((textElement) => (
            <div
              key={textElement.id}
              className="text-element"
              style={{
                left: textElement.x,
                top: textElement.y,
                position: "absolute",
              }}
            >
              <p
                style={{ fontSize: textElement.fontSize + "px" }}
                className={textElement.isBold ? `font-bold` : ""}
              >
                {convertToRendringText(textElement.content,testData)}
              </p>
            </div>
          ))}
        </div>
        )
      })}
      </div>
    </div>
  );
};

export default RenderBoard;
