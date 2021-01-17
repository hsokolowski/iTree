import React, { useState } from "react";
import ReactFileReader from "react-file-reader";
//import { IconButton, Button,Stack } from "@chakra-ui/react";
import { readLocalFile } from "../utils/file-reader";
import parseCsv from "csv-parse/lib/sync";

function FileReader() {
  const [dataSet, setDataSet] = useState(null);
  const [parameters, setParameters] = useState(null);
  const [ignoreParameters, setignoreParameters] = useState(null);

  // const handleFiles = files => {
  //   console.log(files)
  //   let reader = new FileReader();
  //   reader.onload = () => {
  //     // Use reader.result
  //     console.log(reader.result);
  //     //getting attribute parameters decison tree
  //     // let firstLine = reader.result.split('\n').shift();
  //     // console.log(firstLine);
  //     // let clearVars = firstLine.replace(/['"]+/g, '');
  //     // console.log(clearVars);
  //     // let params = clearVars.split(',');
  //     // ////console.log(params);
  //     // let ignore = params.slice();
  //     // ignore.unshift("-EMPTY-");
  //     // ignore[ignore.length-1]=ignore[ignore.length-1].substring(0, ignore[ignore.length-1].length - 1);

  //     // let jsonObj = csv.toObjects(reader.result);
  //     // console.log(jsonObj);

  //     // setDataSet(jsonObj)
  //     // setParameters(params)
  //     // setignoreParameters(ignore)

  //   }
  //   reader.readAsText(files[0]);
  //   // console.log(parameters,ignoreParameters);
  //   // console.log(dataSet);
  // };
  const handleFiles = async (files) => {
    const file = await readLocalFile(files[0]);
    console.log(file);
    const clean = file
      .split("\n")
      .map((line) => {
        return line.replace(/(^"|"$)/g, "");
      })
      .join("\n");
    const data = parseCsv(clean, {
      columns: (h) => {
        //console.log(h);
        return h.map((v, i) => v || `attr${i}`);
      },
      comment: "#",
      skipEmptyLines: true,
      delimiter: [",", "\t"],
    });
    //const data = parseCsv(file,{columns: true, comment: "#",skipEmptyLines: true,})
    console.log(data);
  };

  return (
    <div>
      <ReactFileReader
        multipleFiles={false}
        fileTypes={[".csv"]}
        handleFiles={handleFiles}
      >
        <div className="btn" id="uploadBtn">
          <i className="icon-upload-1"></i>Deploy
        </div>
      </ReactFileReader>
    </div>
  );
}

export default FileReader;
