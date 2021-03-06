// Calling TMDb API
function getFinancialInfo(imdbID, side) {
  // API url #1. Takes imdbID.
  var TMDbUrl =
    'https://api.themoviedb.org/3/find/' +
    imdbID +
    '?api_key=d38648803859bebf97aabe61377bba3c&language=en-US&external_source=imdb_id';

  const TMDbFetch = fetch(TMDbUrl); // Returns object with TMDb id
  TMDbFetch.then((response) => {
    return response.json();
  }).then((TMDbData) => {
    var TMDbID = TMDbData.movie_results[0].id;
    console.log(TMDbData);
    var TMDbUrl2 = // Second API URL. Takes the TMDb URL found above.
      'https://api.themoviedb.org/3/movie/' +
      TMDbID +
      '?api_key=d38648803859bebf97aabe61377bba3c&language=en-US';

    const TMDbFetch2 = fetch(TMDbUrl2); // Returns object containing revenue, budget and overview (among other things).
    TMDbFetch2.then((response) => {
      return response.json();
    }).then((TMDbData2) => {
      console.log(TMDbData2);
      var originalBudget = TMDbData2.budget;

      var originalRevenue = TMDbData2.revenue;

      var releaseDate = TMDbData2.release_date;

      var overview = TMDbData2.overview;
      // DH added this to pass through to straming
      var imdbID = TMDbData2.imdb_id;
      var originalFinancials = {
        overviewProperty: overview,
        originalRevenueProperty: originalRevenue,
        originalBudgetProperty: originalBudget,
        yearProperty: releaseDate,
      }; // Creating an object containing financial info

      var yearReleased = releaseDate.substring(0, 4); // Only need year (not month or day), so using substring to take first four values. This will work until the year 10 000AD.

      let CPIObject = {
        // AN object containing all the Consumer price indices for each year starting with 1913.
        2021: 263.158, // Taken from https://inflationdata.com/Inflation/Consumer_Price_Index/HistoricalCPI.aspx?reloaded=true
        2020: 258.811, //Average CPI from each year.
        2019: 255.657,
        2018: 251.107, // To get Price of budget in todays dollars;
        2017: 245.12, // Budget*(CPI2021/CPIyearReleased)
        2016: 240.008, // ex. Casablanca (1942)
        2015: 237.017, // $878000(263.158/16.3) = $14 174 432
        2014: 236.736,
        2013: 232.957,
        2012: 229.594,
        2011: 224.939,
        2010: 218.056,
        2009: 214.537,
        2008: 215.303,
        2007: 207.342,
        2006: 201.6,
        2005: 195.3,
        2004: 188.9,
        2003: 183.96,
        2002: 179.88,
        2001: 177.1,
        2000: 172.2,
        1999: 166.6,
        1998: 163.0,
        1997: 160.5,
        1996: 156.9,
        1995: 152.4,
        1994: 148.2,
        1993: 144.5,
        1992: 140.3,
        1991: 136.2,
        1990: 130.7,
        1989: 124.0,
        1988: 118.3,
        1987: 113.6,
        1986: 109.6,
        1985: 107.6,
        1984: 103.9,
        1983: 99.6,
        1982: 96.5,
        1981: 90.9,
        1980: 82.4,
        1979: 72.6,
        1978: 65.2,
        1977: 60.6,
        1976: 56.9,
        1975: 53.8,
        1974: 49.3,
        1973: 44.4,
        1972: 41.8,
        1971: 40.5,
        1970: 38.8,
        1969: 36.7,
        1968: 34.8,
        1967: 33.4,
        1966: 32.4,
        1965: 31.5,
        1964: 31.0,
        1963: 30.6,
        1962: 30.2,
        1961: 29.9,
        1960: 29.6,
        1959: 29.1,
        1958: 28.9,
        1957: 28.1,
        1956: 27.2,
        1955: 26.8,
        1954: 26.9,
        1953: 26.7,
        1952: 26.5,
        1951: 26.0,
        1950: 24.1,
        1949: 23.8,
        1948: 24.1,
        1947: 22.3,
        1946: 19.5,
        1945: 18.0,
        1944: 17.6,
        1943: 17.3,
        1942: 16.3,
        1941: 14.7,
        1940: 14.0,
        1939: 13.9,
        1938: 14.1,
        1937: 14.4,
        1936: 13.9,
        1935: 13.7,
        1934: 13.4,
        1933: 13.0,
        1932: 13.7,
        1931: 15.2,
        1930: 16.7,
        1929: 17.1,
        1928: 17.1,
        1927: 17.4,
        1926: 17.7,
        1925: 17.5,
        1924: 17.1,
        1923: 17.1,
        1922: 16.8,
        1921: 17.9,
        1920: 20.0,
        1919: 17.3,
        1918: 15.1,
        1917: 12.8,
        1916: 10.9,
        1915: 10.1,
        1914: 10.0,
        1913: 9.9,
      };

      const releaseDateCpiMultiplier =
        yearReleased > 2021
          ? (yearReleased - 2021) * 3.5 + 263.158
          : CPIObject[yearReleased];

      const currentYearCpiMultiplier =
        (new Date().getFullYear() - 2021) * 3.5 + 263.158;

      var adjustedRevenue =
        (currentYearCpiMultiplier / releaseDateCpiMultiplier) * originalRevenue;

      var adjustedBudget =
        (currentYearCpiMultiplier / releaseDateCpiMultiplier) * originalBudget;

      var adjustedFinancials = {
        // DH passed this through for streaming
        imdbID: imdbID,
        yearProperty: yearReleased,
        overviewProperty: overview,
        adjustedRevenueProperty: adjustedRevenue,
        adjustedBudgetProperty: adjustedBudget,
        originalRevenueProperty: originalRevenue,
        originalBudgetProperty: originalBudget,
      };
      console.log(adjustedFinancials);
      buildFinanceElement(adjustedFinancials, side);
    });
  });
}

var imdbID1 = 'tt0034583'; // Testing above function with a few imdb ID's
//var imdbID2 = 'tt0120338';
//var imdbID3 = 'tt0169547';

//getFinancialInfo(imdbID1);
//getFinancialInfo(imdbID2);
//getFinancialInfo(imdbID3);

//Function to build finance footer element

function buildFinanceElement(objectIn, side) {
  let imdbID = objectIn.imdbID;
  let stageSide = side;
  let targetElement = '';
  if (stageSide === 'left') {
    targetElement = document.querySelector('#inner-card-left');
  } else {
    targetElement = document.querySelector('#inner-card-right');
  }

  let financeObject = objectIn;
  //Rounding
  let roundedAdjustedBudget = Math.round(financeObject.adjustedBudgetProperty);
  let roundedAdjustedRevenue = Math.round(
    financeObject.adjustedRevenueProperty
  );

  // Profit = Revenue-Budget
  let profit = roundedAdjustedRevenue - roundedAdjustedBudget;
  // ROI
  // DH - Changed below from profit to roundedAdjustedRevenue. This was causing funny numbers
  let ROI = roundedAdjustedRevenue / roundedAdjustedBudget;
  let roundedROI = ROI.toFixed(2);

  let finalAdjustedBudget = roundedAdjustedBudget.toLocaleString('en-US');
  let finalAdjustedRevenue = roundedAdjustedRevenue.toLocaleString('en-US');
  let finalProfit = profit.toLocaleString('en-US');
  let finalOriginalRevenue =
    financeObject.originalRevenueProperty.toLocaleString('en-US');
  let finalOriginalBudget =
    financeObject.originalBudgetProperty.toLocaleString('en-US');

  console.log(financeObject);
  // let cardFooterDiv = document.createElement('div');
  // cardFooterDiv.classList.add('card-footer');
  targetElement.innerHTML += `
  <div class="card-footer">

    <p class="card-footer-item">
      <span>
        <b>Budget (${financeObject.yearProperty}): </b>
        $${finalOriginalBudget}
      </span>
    </p>

    <p class="card-footer-item">
      <span><b>Budget (${new Date().getFullYear()}): </b>
      $${finalAdjustedBudget}
      </span>
    </p>
  </div>

  <div class="card-footer">

    <p class="card-footer-item">
    <span>
      <b>Revenue (${financeObject.yearProperty}): </b>
      $${finalOriginalRevenue}
    </span>
  </p>
    <p class="card-footer-item">
      <span> <b>Revenue (${new Date().getFullYear()}): </b>
      $${finalAdjustedRevenue}
      </span>
    </p>

  </div>

  <div class="card-footer">
    <p class="card-footer-item">
      <span><b>Profit Multiplier: </b>
     ${roundedROI}x</span>
    </p>
    <p class="card-footer-item">
      <span><b>Profit (${new Date().getFullYear()}): </b>
      $${finalProfit}
      </span>
    </p>

  </div>

  `;
  getStreamingInfo(imdbID, stageSide);
  // targetElement.appendChild(cardFooterDiv);
}
