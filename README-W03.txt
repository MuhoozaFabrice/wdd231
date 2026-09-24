# W03 Chamber Home Page

This package adds the W03 Chamber Home Page and keeps the W02 member directory structure.

## Important
The weather code uses the OpenWeatherMap Current Weather and 5 Day / 3 Hour Forecast APIs. Before testing or publishing, open:

`chamber/scripts/weather.js`

and replace:

`YOUR_OPENWEATHERMAP_API_KEY`

with your own OpenWeatherMap API key.

The weather uses Kampala coordinates:
- Latitude: 0.3476
- Longitude: 32.5825

## W03 requirements covered
- Responsive chamber home page
- Hero image using an `<img>` element
- CTA over hero image
- Current events section
- Current temperature and description from OpenWeatherMap
- Three-day forecast from OpenWeatherMap
- Member JSON loaded with fetch and async/await
- Only Gold/Silver members selected for spotlights
- Three spotlights randomly selected on each render
- Responsive navigation and wayfinding
- Dynamic copyright year and last-modified date
- Mobile/desktop layout changes
- Existing directory functionality included

## Files
`chamber/index.html` - W03 home page
`chamber/directory.html` - directory page
`chamber/data/members.json` - member data
`chamber/scripts/weather.js` - weather API
`chamber/scripts/spotlights.js` - random member spotlights
`chamber/scripts/directory.js` - directory rendering
`chamber/styles/small.css` and `larger.css` - responsive CSS
