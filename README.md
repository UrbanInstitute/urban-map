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
* Color palettes - add more, update
* Make legend position responsive - separate svg
* Tooltips:
 * Move to be where the pointer points (top left of pointer)
 * Adjust based on svg position so it switches sides if needed
 * Make a function for user to enter tooltip text
* pym it, datatools wrapper it
* 2.0: allow single state mapping: separate jsons & aspect ratios needed for each state
* Southeastern Alaska issue - make sure json & names have latest counties

##Things for the user to define
* Necessary:
 * data_url
 * valuetomap
 * countyid (column in their data w/ fips code)
* Can go with the defaults or overwrite:
 * colors (default: palette.blue5)
 * breaks, legend_breaks, legend_left (default: 0-100% by 20%
 * formatter for numbers (default: %)
 * tooltip text (County | % )
 * N/A text (County | No data)
* For page:
 * title
 * source note
 * embed button - optional
