// d3-force visuzlization
// https://www.npmjs.com/package/d3-force
// https://bl.ocks.org/mbostock/95aa92e2f4e8345aaa55a4a94d41ce37

import * as d3 from "d3";

function d3Force(d3Nodes, width, height) {


  var color = d3.scaleOrdinal(d3.schemeCategory10);
  // The only param we pass to the D3 Force is a context or a list of contexts including or not entities
  // Plus width and height of canvas
  var nodes = d3Nodes;
  // console.log('-- D3 Force nodes - Context Ini:');
  // console.log(nodes);

  var links = d3.range(nodes.length - 1).map(function (i) {
    return {
      source: Math.floor(Math.sqrt(i)),
      target: i + 1
    };
  });
  // console.log('-- D3 Force links - Context Ini:');
  // console.log(links);

  var simulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody())
    .force("link", d3.forceLink(links).distance(20).strength(1))
    .force("x", d3.forceX())
    .force("y", d3.forceY())
    .on("tick", ticked);

  var canvas = document.querySelector("canvas");
  var context = canvas.getContext("2d");

  // width = this.canvas.width;
  // height = this.canvas.height;

  d3.select(this.canvas)
    .call(d3.drag()
      .container(this.canvas)
      .subject(dragsubject)
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  function ticked() {
    context.clearRect(0, 0, width, height);
    context.save();
    context.translate(width / 2, height / 2);

    context.beginPath();
    links.forEach(drawLink);
    context.strokeStyle = "#aaa";
    context.stroke();

    context.beginPath();
    nodes.forEach(drawNode);
    context.fill();
    context.strokeStyle = "#fff";
    context.stroke();

    context.restore();
  }

  function dragsubject() {
    return simulation.find(d3.event.x - width / 2, d3.event.y - height / 2);
  }

  function dragstarted() {
    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
    d3.event.subject.fx = d3.event.subject.x;
    d3.event.subject.fy = d3.event.subject.y;
  }

  function dragged() {
    d3.event.subject.fx = d3.event.x;
    d3.event.subject.fy = d3.event.y;
  }

  function dragended() {
    if (!d3.event.active) simulation.alphaTarget(0);
    d3.event.subject.fx = null;
    d3.event.subject.fy = null;
  }

  function drawLink(d) {
    context.moveTo(d.source.x, d.source.y);
    context.font = "10px Arial";
    context.fillStyle = "darkgreen";
    context.fillText("tx ", 5 + (d.source.x + d.target.x)/2, 5 + (d.source.y + d.target.y)/2); 
    context.lineTo(d.target.x, d.target.y);
  }

  function drawNode(d) {
    context.moveTo(d.x + 3, d.y);
    context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
    context.font = "10px Arial";
    context.fillStyle = "gray";
    context.fillText("s " + d.id , d.x + 5, d.y + 5); 
  }
}   // END Function d3Force

export { d3Force }

