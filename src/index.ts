// index.ts

import puppeteer from 'puppeteer';

export async function scrapeZillow(searchString: string) {
    let allListings: any[] = [];
    try {
        // Launch a headless browser
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();

        // Navigate to Google homepage
        await page.goto('https://www.google.com');

        // Enter the search query into the search bar
        //const searchQuery = 'top home listing websites';
        await page.type('textarea[name="q"]', searchString);

        // Press the "Enter" key to perform the search
        await page.keyboard.press('Enter');

        // Wait for the search results page to load
        await page.waitForNavigation();

       // Go to Zillow website
       await page.goto('https://www.zillow.com/ne/?searchQueryState=%7B%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22north%22%3A43.001707%2C%22south%22%3A39.999932%2C%22east%22%3A-95.30829%2C%22west%22%3A-104.053514%7D%2C%22mapZoom%22%3A6%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A38%2C%22regionType%22%3A2%7D%5D%2C%22usersSearchTerm%22%3A%22Nebraska%22%2C%22schoolId%22%3Anull%7D');

      // Wait for the selector containing home listings
      await page.waitForSelector('.gTOWtl');

     

     // Extract data from the listings
     while (true) {
     const listings: any[] = await page.evaluate(() => {
        const listingsData: any[] = [];
        const listingsElements = document.querySelectorAll('.gTOWtl');

        listingsElements.forEach((listingElement) => {
            const price = listingElement.querySelector('[data-test="property-card-price"]')?.textContent ?? 'N/A';
            const ulElement = listingElement.querySelector('.StyledPropertyCardHomeDetailsList-c11n-8-84-3__sc-1xvdaej-0');
            if (ulElement) {
                const bedroomElement = ulElement.querySelector('li:nth-child(1) b');
                const bathroomElement = ulElement.querySelector('li:nth-child(2) b');
                const squareFootageElement = ulElement.querySelector('li:nth-child(3) b');
            
                const bedrooms = bedroomElement?.textContent ?? 'N/A';
                const bathrooms = bathroomElement?.textContent ?? 'N/A';
                const squareFootage = squareFootageElement?.textContent ?? 'N/A';
            
                console.log('Bedrooms:', bedrooms);
                console.log('Bathrooms:', bathrooms);
                console.log('Square Footage:', squareFootage);
                listingsData.push({
                    price,
                    bedrooms,
                    bathrooms,
                    squareFootage,
                });
            }
           

         
        });

        return listingsData;
    });

     // Add listings from the current page to the list of all listings
     allListings = allListings.concat(listings);

     // Check if there's a next page
// Select the "Next page" button
    const nextPageButton = await page.$('a[rel="next"]');
    
     if (!nextPageButton) {
        await browser.close();
         // If there's no next page button, break the loop
         return allListings;
     }
else{
     // Click the next page button
     await nextPageButton.click();

     // Wait for the next page to load
     await page.waitForNavigation();
}
}

     
    } catch (error) {
        return allListings;
    }
}
