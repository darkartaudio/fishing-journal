# ![Fishing Journal](/public/images/android-chrome-192x192.png)
SEIRFX 221 WC Project 2: Fishing Journal

Log catches, along with river flow and weather conditions values.

To use online, visit: 

---

# HOW TO USE

* Create an account.
* Add journal entries for catches.
    * Species, techniques, and lures are pre-loaded into the database.
    * Create custom species, lures, and techniques to meet your needs.
* Review journal entries to draw conclusions about successful conditions and methods.

---

# SCREENSHOTS

### SPLASH SCREEN
![Splash Screen](screenshots/splash.png)

### JOURNAL ENTRIES
![Journal Entries](screenshots/entries.png)

### NEW ENTRY
![New Entry](screenshots/new-entry.png)

---

# ATTRIBUTION
* USGS Instantaneous Values Web Service: https://waterservices.usgs.gov/rest/IV-Service.html
* Open-Meteo Free Weather API: https://open-meteo.com/
* Background Image by Hunter Brumels: https://unsplash.com/@hbrumels
* Fish images from Wikipedia: https://en.wikipedia.org
* BulmaTemplates: https://github.com/BulmaTemplates/bulma-templates

---

# HOW TO INSTALL
* Requires `Node.js`, `Postgres`, and `Sequelize`
1. `Fork` and `Clone` this repository to your machine.
2. Run `npm install` to install dependencies.
3. Run `sequelize db:create`, `sequelize db:migrate:all`, and `sequelize db:seed:all` to setup database.
3. Run `npm run dev` to start server.
4. Open `http://localhost:3000` in a web browser to access app.

---

# HOW IT WORKS

* Fishing Journal uses the `USGS API` to pole waterflow data from the location of your chosing at the date and time of your catch.
* Using the latitude and longitude of the chosen watershed, Fishing Journal uses `Open-Meteo` to access the weather conditions at that time.
* This data, along with other details provided upon the creation of your journal entry, are stored in a database for future retrieval.


### API CALLS
The main work behind Fishing Journal was to interface HTML forms with 

```javascript
class Hydra extends Dragon {
    ...
    this.phase = 5; // the hydra must be "killed" 5 times to actually die
    ...
    // called when an attack "kills" the hydra
    die() {
        gameEvents.unshift({ text: '', class: 'invis' }); // add spacer line to the story
        
        // change the phase of the dragon and replenish health for phases 5-2
        // type of effective and resisted attacks change, as well as image
        switch (this.phase) {
            case 5:
                gameEvents.unshift({ text: this.headDown, class: 'emphasis' });
                this.effective = 'shock';
                this.resist = 'acid';
                this.img = hydraFour;
                this.health = 20;
                break;
            case 4:
                gameEvents.unshift({ text: this.headDown, class: 'emphasis' });
                this.effective = 'acid';
                this.resist = 'shock';
                this.img = hydraThree;
                this.health = 20;
                break;
    ...
            case 1: // for phase one, hydra actually dies
            super.die();
            return true;
            break;
        }
        this.render(); // redraw the hydra 
        this.phase--; // hydra phase number is decremented
    }
}
```

### THE MAP
Dragonaut uses an HTML `<canvas>` to draw out the game map.

The map is stored in a two-dimensional array.

```javascript
let map = [
//    0    1    2    3    4    5    6    7    8
    ['0', '0', '0', '0', '0', '0', '0', '0', '0'], // 00
    ['0', 'w', '0', '-', '-', '-', '0', 'g', '0'], // 01
    ['0', 'W', '0', '-', '-', '-', '0', 'R', '0'], // 02
    ['0', '-', '-', '-', '-', '-', '-', '-', '0'], // 03
    ['0', '-', '-', '0', '0', '0', '-', '-', '0'], // 04
    ['0', '-', '-', '0', 'G', '0', '-', '-', '0'], // 05
    ['0', '-', '-', '0', '-', '0', '-', '-', '0'], // 06
    ['0', '-', '-', '-', '-', '-', '-', '-', '0'], // 07
    ['0', '-', '-', '-', '-', '-', '-', '-', '0'], // 08
    ['0', 'Y', '0', '-', '-', '-', '0', '-', '0'], // 09
    ['0', 'r', '0', '-', '-', '-', '0', 'y', '0'], // 10
    ['0', '0', '0', '0', '-', '0', '0', '0', '0'], // 11
    ['0', '0', '0', '0', 'C', '0', '0', '0', '0']  // 12
];
```


#### LEGEND
* G = green dragon, W = white dragon, R = red dragon, Y = yellow dragon
* g = green book, w = white book, r = red book, y = yellow book
* C = character
* 0 = wall tile
* \- = floor tile
* 0 values are used by renderMap function to create functional barriers
* other values are for easily visually laying out the map and have no functional effect

The game uses the array to render the visible portion of the map on the `<canvas>`.

```javascript
// draw the (viewRange * 2 + 1) by (viewRange * 2 + 1) map square around character
function renderMap() {

    // game map coordinates relative to character
    let startX = character.x - viewRange;
    let endX = character.x + viewRange;
    let startY = character.y - viewRange;
    let endY = character.y + viewRange;


    // we map each map square into a corresponding square on the HTML canvas
    // char and canvas variables initialized here
    let charX;
    let charY
    let canvasY;
    let canvasX;

    // iterate through both the character Y axis and canvas Y axis
    for (charY = startY, canvasY = 0; charY <= endY; charY++, canvasY++) {
        
        // iterate through the both the character X axis and canvas X axis
        for (charX = startX, canvasX = 0; charX <= endX; charX++, canvasX++) {

            // check if coordinates describe a square within the game map
            if (
                charX >= 0 // x coordinate is within left side of map
                && charX < map[0].length // x coordinate is within right side of map
                && charY >= 0 // y coordinate is within top of map
                && charY < map.length // y coordinate is within bottom of map
            ) {
                switch (map[charY][charX]) {
                    case '0': // wall, draw wall tile
                        ctx.drawImage(wallTile, canvasX * gridSize, canvasY * gridSize, gridSize, gridSize);
                        break;
                    default: // floor, draw floor tile
                        ctx.drawImage(floorTile, canvasX * gridSize, canvasY * gridSize, gridSize, gridSize);
                        break;
                }
            } else { // off the map, draw darkness
                ctx.drawImage(darkTile, canvasX * gridSize, canvasY * gridSize, gridSize, gridSize);
            }
        }
    }
}
```
### COLLISION DETECTION
Each character, enemy, or item fits exactly into a 32x32 square on the map, and is represented by `x` and `y` coordinates in the two-dimensional `map` array. This makes collision detection a relatively simple matter.

Snippet from `checkForCollisions()`

```javascript
dragons.forEach((d) => {
    // if player collides with a dragon, i.e. x and y coordinates are the same
    if(d.alive && d.x === character.x && d.y === character.y) {
        gameEvents.unshift({ text: '', class: 'invis' }); // add spacer line to the story
        gameEvents.unshift({ text: `${character.name} engages a ${d.name} in glorious combat!`, class: 'emphasis' });
        combat(d); // combat begins
    }
});
```

### IS VISIBLE
Similarly, we check if an item or enemy `isVisible` by determining if its `x` and `y` coordinates fall within the character's `viewRange`.

```javascript
// number of map squares in each direction that the character can see
const viewRange = 3;

...

function isVisible(obj) {
    // game map coordinates relative to character
    let startX = character.x - viewRange;
    let endX = character.x + viewRange;
    let startY = character.y - viewRange;
    let endY = character.y + viewRange;

    // if obj is within view, return true
    if (
        obj.x >= startX &&
        obj.x <= endX &&
        obj.y >= startY &&
        obj.y <= endY
    ) {
        return true;
    }

    // otherwise return false
    return false;
}
```

---

# INTO THE FUTURE

### REVAMP COMBAT
If I return to this project in the future, I'd like to revamp the `Combat` phase of the game, changing the display to a side-view with space between the character and enemy. This would create some real estate to use for attack animations.

### MORE COMPLEX LEVELS, EXTENDED GAMEPLAY
I'd like to use this game engine to build some longer, more complex levels, with new items and enemy types.

---

# WHITEBOARDS

### INITIAL BRAINSTORM SESSION
![Brainstorm](./whiteboards/proj1-brainstorm1-040323.png)

### INITIAL GRID LAYOUT
![Grid](./whiteboards/proj1-brainstorm2.png)

---

[![Netlify Status](https://api.netlify.com/api/v1/badges/4f7c989c-6745-4455-a2e9-fb50c005b212/deploy-status)](https://app.netlify.com/sites/dragonaut/deploys)

![CC0](./img/cc0.png)