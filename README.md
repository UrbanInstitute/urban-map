#Urban Institute reusable map template
d3 template for county and state level maps using Urban's style
* Building on Ben's version
* Responsive using [pym.js](https://github.com/nprapps/pym.js)
* Use Urban's [datatools embed](https://github.com/UrbanInstitute/datatools-embed) for wrapper

##Features to add
* Title
* Tooltips - move to be where the pointer points (top left of poiner)
* Legend
* Predefined color ramps
* Source info
* (Eventually) optional embed button
* Roll over legend to highlight bin in map
* A feature that would be good to have is a "redacted" or "ignored flag" --> basically a way of saying "if Column X in the csv meets some condition, add a class to the path and grey it out, plus allow for a custom tooltip"

##To do
* Stop state paths from hover highlighting
* Set no data color (allow choice or bake in?)