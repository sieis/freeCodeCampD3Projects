d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json")
.then((data)=>{
    console.log("this is data:", data.monthlyVariance[0])
    
    let variance = data.monthlyVariance
    console.log("this is monthlyVariances (an array of objects): ", variance)
    console.log("each entry has keyvalue pair of month, year and variance")
    
    let year = d3.timeParse("%Y")
    let month = d3.timeParse("%B")
    
    let minYear = year(d3.min(variance,(d)=>d.year))
    let maxYear = year(d3.max(variance,(d)=>d.year))

    let minMonth = (month("January"))
    let maxMonth = (month("December"))

    console.log("minmonth:", minMonth)
    // let minMonth = (d3.min(variance,(d)=>d.month))
    // let maxMonth = (d3.max(variance,(d)=>d.month))



    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    
    console.log("minYear: ", minYear,"\nmaxYear: ", maxYear)
    const width= 800
    const height = 500
    const padding = 20
    const yPadding=200
    
    let svg=d3.select(".heatMap")
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    
    // User Story #1: My heat map should have a title with a corresponding id="title".
    svg.append('text')
        .text("Heat Map!")
        .attr('id', 'title')
        .attr('x', 40+"%")
        .attr('y', 10+"%")
        .attr('class','fs-3')
    // User Story #2: My heat map should have a description with a corresponding id="description".
    svg.append('text')
        .attr('x', 30+"%")
        .attr('y', 15+"%")
        .text('monthly global land-surface temparatures')
        .attr('id', 'description')
        .attr('class', 'fs-5')

    // User Story #3: My heat map should have an x-axis with a corresponding id="x-axis".
    let scaleX = d3.scaleTime()
        .domain([minYear,maxYear])  
        .range([padding, width])
    let xAxis = d3.axisBottom(scaleX)
        // .tickFormat(d3.timeFormat("%Y"))
    
    svg.append('g')
        .call(xAxis)
        .attr("transform", "translate(0,"+(height-padding)+")")
        .attr('id', 'x-axis')
    // User Story #4: My heat map should have a y-axis with a corresponding id="y-axis".

    let scaleY = d3.scaleLinear()
        .domain([1,12])
        .range([(height-yPadding), padding])
    let yAxis = d3.axisLeft(scaleY)
        .ticks(12)
    svg.append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr("transform","translate("+padding+","+(yPadding-padding)+")")

    svg.selectAll(".cell")
        .data(variance)
        .enter()
        .append("rect")
        .attr("class", "cell")
        .attr('x',(d)=>d.year)
        .attr('y',(d)=>d.month)
        .attr('data-month',(d)=>d.month)

    })

// User Story #5: My heat map should have rect elements with a class="cell" that represent the data.
// User Story #6: There should be at least 4 different fill colors used for the cells.
// User Story #7: Each cell will have the properties data-month, data-year, data-temp containing their corresponding month, year, and temperature values.
// User Story #8: The data-month, data-year of each cell should be within the range of the data.
// User Story #9: My heat map should have cells that align with the corresponding month on the y-axis.
// User Story #10: My heat map should have cells that align with the corresponding year on the x-axis.
// User Story #11: My heat map should have multiple tick labels on the y-axis with the full month name.
// User Story #12: My heat map should have multiple tick labels on the x-axis with the years between 1754 and 2015.
// User Story #13: My heat map should have a legend with a corresponding id="legend".
// User Story #14: My legend should contain rect elements.
// User Story #15: The rect elements in the legend should use at least 4 different fill colors.
// User Story #16: I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.
// User Story #17: My tooltip should have a data-year property that corresponds to the data-year of the active area.