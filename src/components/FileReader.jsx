import React, { useState } from 'react';
import ReactFileReader from 'react-file-reader';
import { Button, Box } from '@chakra-ui/react';
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
        return line.replace(/(^"|"$)|(")/g, '');
        //return line.replace(/(^"|"$)/g, '');
      })
      .join('\n');
    let allAttributes = [];
    //console.log(clean);
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
    //console.log(data);
    allAttributes = Object.keys(data[0]);
    props.onChange({ allAttributes, data });
    allAttributes = [];
  };

  const handleFilesJson = async files => {
    const file = await readLocalFile(files[0]);
    //console.log(file);
    var data = JSON.parse(file);

    //console.log(data);

    //const data = parseCsv(file,{columns: true, comment: "#",skipEmptyLines: true,})
    //console.log(data);
    //allAttributes = Object.keys(data[0]);
    //props.isJson = true;
    //props.onChange({ allAttributes, data });
    //allAttributes = [];
  };

  return (
    <div>
      <Box display={'flex'} direction={'row'}>
        <ReactFileReader multipleFiles={false} fileTypes={['.csv']} handleFiles={handleFiles}>
          <Button
            leftIcon={<AddIcon />}
            size="sm"
            colorScheme="blue"
            variant="outline"
            aria-label="Deploy set"
            w={90}
          >
            CSV
          </Button>
        </ReactFileReader>

        <ReactFileReader multipleFiles={false} fileTypes={['.json']} handleFiles={handleFilesJson}>
          <Button
            ml={1}
            leftIcon={<AddIcon />}
            size="sm"
            colorScheme="blue"
            variant="outline"
            aria-label="Deploy set"
            w={90}
          >
            JSON
          </Button>
        </ReactFileReader>
      </Box>
    </div>
  );
}

export default FileReader;
