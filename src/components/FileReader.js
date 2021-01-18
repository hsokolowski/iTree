import React, { useState } from "react";
import ReactFileReader from "react-file-reader";
import { Button } from "@chakra-ui/react";
import { AddIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { readLocalFile } from "../utils/file-reader";
import parseCsv from "csv-parse/lib/sync";

function FileReader() {
  const [dataSet, setDataSet] = useState(null);
  const [parameters, setParameters] = useState(null);
  const [ignoreParameters, setignoreParameters] = useState(null);

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
        <Button leftIcon={<AddIcon />} size="md" colorScheme="teal" variant="outline" aria-label="Deploy set">
          Deploy
        </Button>
      </ReactFileReader>
    </div>
  );
}

export default FileReader;
