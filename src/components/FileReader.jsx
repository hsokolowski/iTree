import React, { useState } from 'react';
import ReactFileReader from 'react-file-reader';
import { Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { readLocalFile } from '../utils/file-reader';
import parseCsv from 'csv-parse/lib/sync';

function FileReader(props) {
  const [parameters, setParameters] = useState(null);

  const handleFiles = async files => {
    const file = await readLocalFile(files[0]);
    //console.log(file);
    const clean = file
      .split('\n')
      .map(line => {
        return line.replace(/(^"|"$)/g, '');
      })
      .join('\n');
    let allAttributes = [];
    const data = parseCsv(clean, {
      columns: h => {
        // let header = h.map((v, i) => v || `attr${i}`);
        // allAttributes.push(header);
        // return header;
        if (props.isHeaders) return h.map((v, i) => v);
        else return h.map((v, i) => `attr${i}`);
      },
      comment: '#',
      skipEmptyLines: true,
      delimiter: [',', '\t'],
    });
    //const data = parseCsv(file,{columns: true, comment: "#",skipEmptyLines: true,})
    console.log(data);
    allAttributes = Object.keys(data[0]);
    props.onChange({ allAttributes, data });
    allAttributes = [];
  };

  return (
    <div>
      <ReactFileReader multipleFiles={false} fileTypes={['.csv']} handleFiles={handleFiles}>
        <Button
          leftIcon={<AddIcon />}
          //size={buttonSize}
          colorScheme="teal"
          variant="outline"
          aria-label="Deploy set"
          w="100%"
          h={10}
        >
          Deploy
        </Button>
      </ReactFileReader>
    </div>
  );
}

export default FileReader;
