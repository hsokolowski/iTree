import React, { useState } from 'react';
import ReactFileReader from 'react-file-reader';
import { Button } from '@chakra-ui/react';
import { GrDocumentUpload } from 'react-icons/gr';

import { readLocalFile } from '../utils/file-reader';
import parseCsv from 'csv-parse/lib/sync';

function TestSetFileReader(props) {
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
    console.log(data);

    props.onChange({ data });
  };

  return (
    <div>
      <ReactFileReader multipleFiles={false} fileTypes={['.csv']} handleFiles={handleFiles}>
        <Button leftIcon={<GrDocumentUpload />} size="sm">
          Upload test set
        </Button>
      </ReactFileReader>
    </div>
  );
}

export default TestSetFileReader;
