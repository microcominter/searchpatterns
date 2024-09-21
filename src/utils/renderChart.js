import * as d3 from "d3";
import { setLoading } from "../slices/search.js";
import { setPrompt } from "../slices/query.js";

export function renderChart(chartData, chartRef, query,navigate,dispatch) {
  const formattedData = {
    name: query,
    children: Object.keys(chartData).map(key => ({
      name: key,
      children: chartData[key].map(item => ({ name: item }))
    }))
  };

  d3.select(chartRef.current).selectAll("*").remove();

  const width = 700;
  const height = width;
  const radius = Math.min(width, height) / 2 - 30;

  const tree = d3.tree()
    .size([2 * Math.PI, radius])
    .separation((a, b) => (a.parent === b.parent ? 1 : 3) / a.depth); // Increase separation factor

  const root = tree(d3.hierarchy(formattedData)
    .sort((a, b) => d3.ascending(a.data.name, b.data.name)));

  const svg = d3.select(chartRef.current)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-775, -550.50, 1500, 1300])
    .attr("style", "width: 100%; height: auto; font: 15px sans-serif;");

  svg.append("g")
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-opacity", 1)
    .attr("stroke-width", 0.5)
    .selectAll("path")
    .data(root.links())
    .join("path")
    .attr("d", d3.linkRadial()
      .angle(d => d.x)
      .radius(d => d.y));

      svg.transition()
      .duration(1000) // Adjust duration as desired (in milliseconds)
      .style("opacity", 1);

  // const circles = svg.append("g")
  //   .selectAll("circle")
  //   .data(root.descendants())
  //   .join("circle")
  //   .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y}, 0)`)
  //   .attr("fill", d => d.children ? "orangered" : "orangered")
  //   .attr("r", 3.5);
    const circles = svg.append("g")
    .selectAll("circle")
    .data(root.descendants())
    .join("circle")
    .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y}, 0)`)
    .attr("fill", d => d.children ? "orangered" : "orangered")
    .attr("r", 3.5)
    .style("opacity", 0);

    circles.transition()
     .duration(2000)  // Adjust duration as desired (in milliseconds)
     .style("opacity", 1); 
  circles.on("click", (event, d) => {
    if (d.data.name) {
      dispatch(setPrompt(d.data.name));
      setTimeout(()=>{
        navigate(`/searchAi/q=${encodeURIComponent(d.data.name)}`);
      },1000)

    }
  });
 
  const texts = svg.append("g")
    .attr("stroke-linejoin", "round")
    .attr("stroke-width", 3)
    .selectAll("text")
    .data(root.descendants())
    .join("text")
    .attr("font-family", "gilroy")
    .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y}, 0) rotate(${d.x >= Math.PI ? 180 : 0})`)
    .attr("dy", "0.31em")
    .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
    .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
    .attr("fill", "White")
    .attr("cursor", "pointer")
    .attr("opacity", 0)  // Start with opacity 0
    .text(d => d.data.name)
    .on('click', (event, d) => {
      if (d.data.name) {
        dispatch(setPrompt(d.data.name));
        setTimeout(()=>{
          navigate(`/searchAi/q=${encodeURIComponent(d.data.name)}`);
        },1000)
  
      }
    })
    texts.transition()
     .duration(2000)  // Adjust duration as desired (in milliseconds)
     .style("opacity", 1);
     texts
     .on("mouseover", function (event, d) {
      console.log("jiiii");
      d3.selectAll("text").classed("text-blurred", true);
      d3.select(this).classed("text-hovered", true).classed("text-blurred", false);
    })
    .on("mouseout", function () {
      d3.selectAll("text").classed("text-hovered", false).classed("text-blurred", false);
    });
};

export const scrollToChart = (ref) => {
  window.scrollTo({
    top: ref.current.offsetTop,
    behavior: 'smooth',
  });
};
