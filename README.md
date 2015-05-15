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
* Since we'll ~always want county names - add to topojson
* Color palettes - add more, update
* Make legend position responsive - separate svg
* Tooltips - move to be where the pointer points (top left of poiner), style, adjust based on svg position so it switches sides if needed
* Set color for missing data (allow choice or bake in?)
* pym it, datatools wrapper it
* 2.0: allow single state mapping: separate jsons & aspect ratios needed for each state

##Things for the user to define
* data_url
* valuetomap
* colors (predefined or custom)
* breaks
* legend_breaks, legend_left
* formatter
* tooltip text
 * N/A text
* For page:
 * title
 * source note
 * embed button - optional
