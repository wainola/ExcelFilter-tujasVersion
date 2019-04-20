const readXLSFile = require('read-excel-file/node');
const xl = require('excel4node');
const moment = require('moment');

/**
 * FILTERT CONTENT:
 * POSITIONS: 0,1,2,13,14,15,16,17,18,19,21,22,23,24,25,26,27,31,33,34,37,38,39,40,41
 * @param {Array} data
 */
const filterCells = async data => {
  const positions = [
    0,
    1,
    2,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    31,
    33,
    34,
    37,
    38,
    39,
    40,
    41
  ];

  //   console.log(positions.length);

  const filterCellsData = data.reduce((acc, item, idx1) => {
    const elem = item
      .filter((e, idx2, self) => {
        const index = positions.indexOf(idx2);

        if (index !== -1) {
          return self[idx2] !== null ? self[idx2] : 'Sin información';
        }
      })
      .map(elem => {
        if (elem === null) {
          return 'Campo sin llenar';
        }
        return elem;
      });

    acc[idx1] = elem;
    return acc;
  }, []);

  return filterCellsData;
};

const writeNewExcel = async data => {
  console.log('writingreport', data.length);

  const wb = new xl.Workbook();

  const ws = wb.addWorksheet('Sheet 1');

  // const cellsToStyle = data.length + 1;

  // Array.from(Array(cellsToStyle).keys(), n => n).forEach(item => ws.cell())

  data.forEach((item, idx) => {
    console.log('item', item);
    item.forEach((e, index) => {
      console.log('element::', e);
      if (typeof e === 'string') {
        console.log('string');
        ws.cell(idx + 1, index + 1).string(e);
      }
      if (typeof e === 'number') {
        console.log('number');
        ws.cell(idx + 1, index + 1).number(e);
      }
      if (typeof e === 'object') {
        console.log('object');
        ws.cell(idx + 1, index + 1).date(moment(e).format());
      }
    });
  });

  wb.write(`${process.cwd()}/reports/report-procesado.xlsx`, (err, stats) => {
    if (err) {
      console.log(err);
      return {};
    }
    console.log(stats);
    return {};
  });
};

async function Reader(filePath) {
  let fileContents;
  try {
    fileContents = await readXLSFile(filePath);

    const filterCellsResults = await filterCells(fileContents);
    const report = await writeNewExcel(filterCellsResults);

    console.log('writing report', report);

    return filterCellsResults;
  } catch (err) {
    return { error: true, meta: err };
  }
}

module.exports = Reader;
