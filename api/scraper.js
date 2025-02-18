const cheerio = require("cheerio")
const axios = require("axios")

async function scraper() {
    const url = "https://schema.mau.se/setup/jsp/Schema.jsp?startDatum=idag&intervallTyp=a&intervallAntal=1&sokMedAND=false&sprak=SV&resurser=p.NZNTC24h%2C";
    const result = [];
    await axios(url).then((response) => {
      const html_data = response.data;
      const $ = cheerio.load(html_data);

      const selectedElem = ".schemaTabell > tbody"
      
      $(selectedElem).each((parentIndex, parentElem) => {        
        let prevDate = ''
          $(parentElem)
          .children()
          .each((rowId, rowElem) => { 
            if (rowId >= 3) {
              const rowData = {};     
              $(rowElem).children().each((childId, childElem) => {
                // Date
                if (childId === 2) {
                  const value = $(childElem).text();
                  if (!value || value === "" || !value.match(/\w/)) {
                    rowData['date'] = prevDate
                  } else {
                    rowData['date'] = value
                    prevDate = value
                  }
                }
                // Time
                if (childId === 3) {
                  const value = $(childElem).text();
                  rowData['time'] = value
                }
  
                // Course
                if (childId === 4) {
                  const value = $(childElem).text();
                  rowData['course'] = value
                }
  
                // Place
                if (childId === 7) {
                  const value = $(childElem).text();
                  rowData['place'] = value
                }
  
                // Description
                if (childId === 9) {
                  const value = $(childElem).text();
                  rowData['description'] = value
                }
              })
              result.push(rowData)
            }
          });
      });
    });
    console.log(result)
  return result;
}

module.exports = scraper;