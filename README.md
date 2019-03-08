Leage of Legends Stat tracker app

Coding challenge for Battlefy, details found here: https://gist.github.com/jbueza/490d3aa4a096498d4642a0f602ce6968

Progress over the 4 hour set time period for the challenge:

1. Built a basic server back-end with Node.js and express. Features a few RESTful endpoints for client queries to send params to Riot's server, and some common libraries to support (Axios, Bodyparser, Cors controls for headers etc).

2. Hooked into the Riot API, storing my API key in process.ENV. This was with the help of the Kayn library to make life a bit easier - and while that was the case intitially, I wish I had spent more time reading the docs for Kayn a I found it to be pretty slow with simple match data queries (which is likely user error on my part, but I didn't have the time to look into this in detail).

3. Built a very basic front end with the help or create-react-app to get the boiler plate up and running. This is definitely not the most efficient way to build an app, especially for scale, however after a fair bit of time dealing with some Node issues and having to re-set up my Dev environment, I thought it was a more efficient use of my time to focus on the core build and deal with a leaner webpack and build later on if time permitted (hint: it didn't). Some minor styling here using CSS and Semantic-UI for React (which is a library I really love and use a lot to make something look sharp). Didn't end up getting a very polished product because I'm still trying to map all of the data tidily and efficiently!

4. Spent a fair bit of time trying to stay true to the MCV approach I interpreted from Battlefy's wireframe schematis. Turns out trying to refine all of the data in the back-end before sending as a clean JSON to the client proved to be quite tricky without a state manager (something I know I take for granted using React as my primary coding framework).

5. After a fair bit of frustration and trying out a few different approaches to cleaning the data in the back-end, I decided that in the interests of time it was simply not happening - and migrated some of the controller functions to the App. Had some success here, and discovered other challenges - mainly thought challenges around how to effectively map the data from the Riot API (finding a simple way to trim out the unnecessary data that I though may be causing the app to run incredibly slowly). Big learning for me here is I need to brush up on my OOP and object generation.

6. All through this I was conscious that the app seemed to be performing incredibly slowly, sometimes taking upwards of 6-7 seconds to get all the match details for the 5 most recent games of a summoner. While it did work, I'm sure this is not the intention of Kayn, and you can see from their own code comments here (https://github.com/cnguy/kayn/blob/master/examples/async.await/v4/get-last-10-ranked-matches-efficiently.js) they expect it to perform the same tasks in a little over 1 second, so something isn't right and I need to do more digging to understand what I'm not doing right. I think I saw this package defaulting to a spread strategy, which would make more sense with high volumes of requests - I need to play around with the burst strategy I think in the embedded riot-rate-limiter, and ideally combine both to optimise efficiency and resources for the app.

After all this, I was able to retireve a LOT of data, and within that I believe I have access to all the necessary info for this challenge - I unfortunately ran out of time to map it correctly to the front end. Between console logs and JSX outputs, you should be able to see stats on:

- Win outcome, 
- Game Duration
- Summoner Name
- ChampionId, 
- Champion level, 
- KDA, 
- Spells 
- Items bought
- Creepscore (including neutrals, totals, enemy and allied jungle kills)
- CS/min
- LOTS more about the Summoner games,  because I didn't manage to clean the data before sending to Client so very easy to add more in here.

Other thoughts for Production:
- Finish the App, obviously.
- Optimise the rate-limiter for speed in low volume and balanced calls in high volume
- Rework webpack so it's not bloated with other unnecesary service providers
- Get a registered API key so you don't need to refresh it every 24h
- Spend some time on the front end making it look pretty, and optimise for Mobile.

Usage:
Clone repository > npm install
Set up a .env file with your own riot API key.

Front-end
npm start

Back-end
/src/server nodemon server.js

Once reviewed, I'll tidy up the app to a point I'm satisfied with it, and then probably repeat the exercise for Dota2 (so the app is actually beneficial)!! :)
