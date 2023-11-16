function convertCSVArrayToObject(csvArray) {
    const headers = csvArray[0];
    const data = csvArray.slice(1);
  
    const result = data.map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });
  
    return result;
  }  
  
const csvArray = [
    ["Serial", "Name", "Date", "Time"],
    ["1", "Krishna", "7 Nov", "7:00 Pm"],
    ["2", "Ramesh", "9 Nov", "9:00 Am"],
    ["3", "Suresh", "16 Dec", "7:00 Pm"],
    ["4", "Kailash", "17 Dec", "8:00 Am"],
    ["5", "Neha", "18 Nov", "7:00 Pm"],
    ["6", "Ramika", "19 Nov", "9:00 Am"]
  ];
console.log(convertCSVArrayToObject(csvArray))