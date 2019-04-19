const readXLSFile = require('read-excel-file/node');

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

async function Reader(filePath) {
  let fileContents;
  try {
    fileContents = await readXLSFile(filePath);

    const filterCellsResults = await filterCells(fileContents);

    return filterCellsResults;
  } catch (err) {
    return { error: true, meta: err };
  }
}

module.exports = Reader;
