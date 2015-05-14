#Urban Institute reusable map template - WIP
d3 template for county and state level maps using Urban's style, fully responsive and IE compatible
* Building on Ben's version
* Responsive using [pym.js](https://github.com/nprapps/pym.js)
* Use Urban's [datatools embed](https://github.com/UrbanInstitute/datatools-embed) for wrapper

##Features needed
* Title
* Legend
* Predefined color ramps
* Source info
* (Eventually) optional embed button
* Roll over legend to highlight bin in map
* A feature that would be good to have is a "redacted" or "ignored flag" --> basically a way of saying "if Column X in the csv meets some condition, add a class to the path and grey it out, plus allow for a custom tooltip"

##To do
* pym it
* Make legend position responsive
* Tooltips - move to be where the pointer points (top left of poiner), style
* Stop state paths from hover highlighting
* Set no color for missing data (allow choice or bake in?)