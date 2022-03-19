d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json")
    .then((data) => {
        console.log("this is data:", data.monthlyVariance[0])
        let base = data.baseTemperature
        let variance = data.monthlyVariance
        console.log("this is monthlyVariances (an array of objects): ", variance)
        console.log("each entry has keyvalue pair of month, year and variance")

        let year = d3.timeParse("%Y")
        let month = d3.timeParse("%B")
        console.log("min/max variance:, ", d3.min(variance,(d)=>d.variance), d3.max(variance,(d)=>d.variance))


        // groups?? from https://www.d3-graph-gallery.com/graph/heatmap_style.html

        let myGroups = d3.map(variance, (d) => d.group).keys()
        let myVars = d3.map(variance, (d) => d.variable).keys()
        console.log("groups: ", myGroups)
        console.log("variables: ", myVars)

        let minYear = year(d3.min(variance, (d) => d.year))
        let maxYear = year(d3.max(variance, (d) => d.year))

        let minMonth = month("January")
        let maxMonth = month("December")

        let key = [-4,-1,0,1,4]
        let colors = d3.scaleOrdinal()
            .domain(key)
            // color scheme from https://observablehq.com/@d3/color-schemes
            .range(["#ffffcc","#a1dab4","#41b6c4","#2c7fb8","#253494"])

            let toolTip = d3.select(".chart")
            .append("div")
            .style("position", "absolute")
            .attr("id", "tooltip")
            .style("background-color", "white")
            .style("opacity", 0)
            .style("border-radius", "5px")
            .style("padding", "5px")
            
        // ++++++++++++ NEED TO UPDATE THIS STILL ++++++++++++++++++++++
        let mouseover=(d,i)=>{
            let pos = d3.pointer(mouseover);
            toolTip.html(d.year+" - "+d.month)
            .style("opacity", 0.8)
            .attr("data-year",(i["Year"]))
            .style("left", event.pageX+20+"px")
            .style("top", event.pageY-50+"px")
            
            }


        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        console.log("minYear: ", minYear, "\nmaxYear: ", maxYear)
        const width = 800
        const height = 500
        const padding = 40
        const yPadding = 200

        let svg = d3.select(".heatMap")
            .append('svg')
            .attr('width', width)
            .attr('height', height)

        // User Story #1: My heat map should have a title with a corresponding id="title".
        svg.append('text')
        .text("Heat Map!")
        .attr('id', 'title')
        .attr('x', 40 + "%")
        .attr('y', 10 + "%")
        .attr('class', 'fs-3')
        // User Story #2: My heat map should have a description with a corresponding id="description".
        svg.append('text')
        .attr('x', 30 + "%")
        .attr('y', 15 + "%")
        .text('monthly global land-surface temparatures')
        .attr('id', 'description')
        .attr('class', 'fs-5')
        
        // User Story #3: My heat map should have an x-axis with a corresponding id="x-axis".
        let scaleX = d3.scaleTime()
        .domain([minYear, maxYear])
        .range([padding, width])
        let xAxis = d3.axisBottom(scaleX)
        // .tickFormat(d3.timeFormat("%Y"))
        
        // User Story #12: My heat map should have multiple tick labels on the x-axis with the years between 1754 and 2015.
        svg.append('g')
            .call(xAxis)
            .attr("transform", "translate(0," + (height - padding) + ")")
            .attr('id', 'x-axis')
        // User Story #4: My heat map should have a y-axis with a corresponding id="y-axis".
        let scaleY = d3.scaleTime()
        // need to use newDate to get months in here as domain...ended up doing that with timeParsing declarations at the top
            .domain([minMonth, maxMonth])
            .range([(height - yPadding), padding])
        let yAxis = d3.axisLeft(scaleY)
            // User Story #11: My heat map should have multiple tick labels on the y-axis with the full month name.
            .tickFormat(d3.timeFormat("%B"))
        svg.append('g')
            .call(yAxis)
            .attr('id', 'y-axis')
            .attr("transform", "translate(" + padding + "," + (yPadding - padding) + ")")
        // User Story #5: My heat map should have rect elements with a class="cell" that represent the data.
        svg.selectAll(".cell")
            .data(variance)
            .enter()
            .append("rect")
            .attr("class", "cell")
            .attr('x', (d) => scaleX(d.year))
            .attr('y', (d) => scaleY(d.month-1))
            .attr('width', 200)
            .attr('height', 40)
            // User Story #6: There should be at least 4 different fill colors used for the cells.
            .style('fill',(d)=>colors(d.variance))
            // User Story #7: Each cell will have the properties data-month, data-year, data-temp containing their corresponding month, year, and temperature values.
            // User Story #8: The data-month, data-year of each cell should be within the range of the data.
            .attr('data-month',(d)=>d.month-1)
            .attr('data-year',(d)=>d.year)
            .attr('data-temp',(d)=>(base+d.variance))

            // User Story #13: My heat map should have a legend with a corresponding id="legend".
            // User Story #14: My legend should contain rect elements.
            // User Story #15: The rect elements in the legend should use at least 4 different fill colors.
        let legend = svg

        legend.append("g")
            .attr("id", "legend")
            .attr("x", 20)
            .attr("y", 100)
            .selectAll("legendrects")
            .data(key)
            .enter()
            .append("rect")
                .attr("x",(d,i)=>padding*i*.5).attr("y",120).attr("width",20).attr("height",20).style("fill",(d)=>colors(d))

        .on("mouseover", mouseover)
        .on("mouseleave",()=>{return toolTip.style("opacity",0)})

    })
    


// User Story #9: My heat map should have cells that align with the corresponding month on the y-axis.
// User Story #10: My heat map should have cells that align with the corresponding year on the x-axis.
// User Story #16: I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.
// User Story #17: My tooltip should have a data-year property that corresponds to the data-year of the active area.