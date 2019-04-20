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
        // console.log('map elem', elem);
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
  const wb = new xl.Workbook();

  const ws = wb.addWorksheet('Sheet 1');

  const cellsToStyle = data.length + 1;

  Array.from(Array(cellsToStyle).keys(), n => n).forEach(item => ws.cell());

  data.forEach((item, idx) => {
    item.forEach((e, index) => {
      if (typeof e === 'string') {
        ws.cell(idx + 1, index + 1).string(e);
      }
      if (typeof e === 'number') {
        ws.cell(idx + 1, index + 1).number(e);
      }
      if (typeof e === 'object') {
        ws.cell(idx + 1, index + 1).date(moment(e).format());
      }
    });
  });

  return new Promise((resolve, reject) => {
    const fileRoute = `${process.cwd()}/reports/report-procesado.xlsx`;
    wb.write(`${fileRoute}`, (err, stats) => {
      if (err) {
        console.log('error:', err);
        return reject(err);
      }
      console.log('stats', stats);
      return resolve({ stats, fileRoute });
    });
  });
};

async function Reader(filePath) {
  let fileContents;
  try {
    fileContents = await readXLSFile(filePath);

    const filterCellsResults = await filterCells(fileContents);
    const generatedReport = await writeNewExcel(filterCellsResults);

    return { filteredData: filterCellsResults, reportCreated: generatedReport };
  } catch (err) {
    return { error: true, meta: err };
  }
}

module.exports = Reader;
