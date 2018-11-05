import * as d3 from 'd3-3';

// Hacked from:
// http://bl.ocks.org/tgk/6068367

// Other Source: https://plnkr.co/edit/iadT0ikcpKELU0eaE9f6?p=preview
// Github, Plunker: designbyadrian

// var c = [
// ["id",	0, "type", "Ctxt","name", "Context","step",   0,  "branch",   0, "status",     "ToDo"],
// ["id",	1, "type", "Jar",	"name",	"Jar3L",	"volume",	3,	"content",	0,	"available",	3],
// ["id",	2, "type", "Jar",	"name",	"Jar5L",	"volume",	5,  "content",	0,	"available",	5],
// ["id",	3, "type", "Jar",	"name",	"Jar8L",	"volume",	8,	"content",	8,	"available",	0]];

  // graph: {
  //   "nodes":[
  //     {"id":0,"type":"Ctxt","name":"Context","colour":"#567e7b","connections":1,"step":0,  "branch":0, "status":"ToDo"},
  //     {"id":1,"type":"Jar",	"name":"Jar3L",	"colour":"#85ed67","connections":1,"volume":3,	"content":0,"available":3},
  //     {"id":2,"type":"Jar",	"name":"Jar5L",	"colour":"#85ed67","connections":1,"volume":5,	"content":0,"available":5},
  //     {"id":3,"type":"Jar",	"name":"Jar8L",	"colour":"#85ed67","connections":1,"volume":8,	"content":8,"available":0}],
  //   "links":[
  //     {"source":0,"target":1},
  //     {"source":0,"target":2},
  //     {"source":0,"target":3}]
  // }

  // from the nodes line in the force defintion
  //       .nodes([{ 0:"id", 1:0, 2:"type", 3:"Ctxt", 4:"name", 5:"Context", 6:"step", 7:0, 8:"branch", 9:0, 10:"status", 11:"ToDo"}])

// false = NO d3 visualization
declare var d3Switch;
// false = NO d3 visualization for Entity nodes
declare var d3Entity;

declare var width;
declare var height;

//  if (d3Switch == false) {
//    width = 30;
//    height = 30;
//    }

declare var fill;

 // initialize with a single node for initial context
declare var force;

declare var svg;

declare var nodes;
declare var links;
declare var node;
declare var link;
declare var label;

declare var cursor;

declare var typeIndex;    // typeIndex = 3; in d3Ini

function d3Ini() {

  // Initialize Global vars

  d3Switch = true;
  d3Entity = true;

  width = 50;
  height = 50;

  fill = d3.scale.category20();

  force = d3.layout.force()
    .size([width, height])
    .nodes([{"id":0,"type":"Ctxt","name":"Context","step":0,  "branch":0, "status":"ToDo"}])
    .linkDistance(30)
    .charge(-60)
    .on("tick", tick);

  svg = d3.select("#viz").append("svg")
    .attr("width", width)
    .attr("height", height)
    .on("mousemove", mousemove)
    .on("mousedown", mousedown);

  svg.append("rect")
    .attr("width", width)
    .attr("height", height);

  svg.append('defs').append('marker')
    .attr({'id':'arrowhead',
           'viewBox':'-0 -5 10 10',
           'refX':15,
           'refY':0,
           //'markerUnits':'strokeWidth',
           'orient':'auto',
           'markerWidth':10,
           'markerHeight':10,
           'xoverflow':'visible'})
    .append('svg:path')
        .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
        .attr('fill', '#999')
        .attr('stroke','#999');
        // These attribute colors are for the arrows heads to context nodes

  nodes = force.nodes();
  links = force.links();
  node = svg.selectAll(".node");
  link = svg.selectAll(".link");
  label = svg.selectAll(".label"); 

  console.log("Print data in the node of the initial context: ");
  console.log(nodes[0]);

  cursor = svg.append("circle")
    .attr("r", 30)
    .attr("transform", "translate(-100,-100)")
    .attr("class", "cursor");

  
  typeIndex = 3;

  restart();

  }

  //Function to choose what color circle we want for nodes
  //Let's return grey for context and green for entities
  function circleColour(d){
    // TODO - fix the format for the first node representing the initial context
    // for which i have to use now d.type == "Ctxt"
  	if(d[typeIndex] =="Ctxt" || d.type == "Ctxt"){
  		return "red";
  	} else {
  		return "green";
  	}
  }

  //Function to choose what radius we want for nodes
  //Let's return 5 for entities and have context a bit larger
  function circleRadius(d){
  	if(d[typeIndex] == "Ctxt" || d.type == "Ctxt"){
  		return 8;
  	} else {
  		return 5;
  	}
  }

  var idIndex = 1;
  // TODO - transform this in a setting that can be changed for each problem
  function circleLabel(d){
    if(d[typeIndex] == "Ctxt" || d.type == "Ctxt"){
      return d[idIndex];
    } else {
      // For the 3Jars problem contentIndex is 9
      return d[9];
    }
  }

  function mousemove() {
    cursor.attr("transform", "translate(" + d3.mouse(this) + ")");
  }

// TODO = Create separate functions for create nodes for Entities and create nodes for Contexts
// adding a relation type to the links structure beyond source and target e.g.: in, and Service/Change/Transformation
  function createNode(e, targetId, d3Switch) {

    if (d3Switch == true) {

      var node = Object.assign( {x: width/2, y: height/2}, e );
          // console.log("Print first the entity row form Cogito then the extended node in D3");
          // console.log(e);
          // console.log(node);

          nodes.push(node);

          // First push line works well for IN relations for Elements in Contexts but not for successor Contexts
         links.push({source: node, target: nodes[targetId]});
         // this push line works for successive Contexts but should disable adding the arrow attribute for entities into Context nodes
         // links.push({source: nodes[targetId], target: node});

          restart();

    }

  }

  function mousedown() {
    var point = d3.mouse(this),
        // node = {x: point[0], y: point[1]}, // at mouse position
        node = {x: width/2, y: height/2},  // from center frame
        // from top left corner
        // node = {x: 0, y: 0},
        n = nodes.push(node);

    // add links to any nearby nodes
    nodes.forEach(function(target) {
      var x = target.x - node.x,
          y = target.y - node.y;
      if (Math.sqrt(x * x + y * y) < 30) {
        links.push({source: node, target: target});
      }
    });

    restart();
  }

  function tick() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

    label.attr("x", function(d) { return d.x; })
         .attr("y", function(d) { return d.y; });
  }

  function restart() {
    link = link.data(links);

    link.enter().insert("line", ".node")
        .attr("class", "link")
        .attr("id",function(d,i) {return 'edge'+i})
        .attr('marker-end','url(#arrowhead)')
        .style("stroke","#999")
        .style("pointer-events", "none");

    node = node.data(nodes);

    node.enter().insert("circle")
        .attr("class", "node")
        .attr("r", circleRadius)
        .attr("fill", circleColour)
        .call(force.drag);

    label = label.data(nodes);
    label.enter().insert("text")
        .attr("class", "label")
        .attr("dx", 0)
        .attr("dy", 0)
        .text(circleLabel);

    // console.log(label);

    force.start();
  }

// } // END if d3Switch == true

export {d3Ini, createNode, d3Switch, d3Entity};
