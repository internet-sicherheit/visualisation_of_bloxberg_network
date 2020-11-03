import React from 'react';
import * as d3 from 'd3';
import './styles.css';
import DataCollector from './DataCollector';

class GraphCreator extends React.Component {
    constructor(props) {
        super(props);
        console.log("Consturctor.")
        console.log(props);
        //this.data = new DataCollector().getData(props.page, props.offset); // new DataCollector().getData("0x0d81b4b37EddC9C262198A82B51470aa1eBa14C4");  // 0x4945d63B509e137b0293Bd958cf97B61996c0fB9       // 0xC91a26a4351c6b351Cc2231e9c7bE7dd7D4a7036
    }

    createGraph() {
        if (this.data !== null) {

            this.data.then((promise) => {

                console.log(promise);

                let height = 800,
                    width = 800;

                let links = promise;

                // create empty nodes array
                let nodes = {};

                // compute nodes from links data
                links.forEach(function (link) {
                   // console.log("link: " + link.source);
                    link.source = nodes[link.source] ||
                        (nodes[link.source] = { source: link.source });
                    link.target = nodes[link.target] ||
                        (nodes[link.target] = { target: link.target });/*
            link.count = nodes[link.count] || 
                (nodes[link.count] = { count: link.count });
            link.type = nodes[link.type] || 
                (nodes[link.type] = { type: link.type });*/
                });

                document.getElementById("container").innerHTML = "";
                // add a SVG to the body for our viz
                let svg = d3.select('#container').append('svg')
                    .attr('width', width)
                    .attr('height', height);


                // use the force
                let force = d3.layout.force() //build the layout
                    .size([width, height]) //specified earlier
                    .nodes(d3.values(nodes)) //add nodes
                    .links(links) //add links
                    .on("tick", tick) //what to do
                    .linkDistance(200) //set for proper svg size
                    .charge(function (d) {
                        var charge = -500;
                        if (d.index === 0) charge = 10 * charge;
                        return charge;
                    })
                    .start(); //kick the party off!

                // add the links
                let link = svg.selectAll('.link')
                    .data(links)
                    .enter().append('line')
                    .attr('class', 'link');

                // add the nodes
                let node = svg.selectAll('.node')
                    .data(force.nodes()) //add
                    .enter().append('circle')
                    .style("fill", function (d) {
                        if (d.type === "contract") {
                            return "orange";
                        }
                    })
                    .attr('class', 'node')
                    .attr('r', width * 0.02) //radius of circle
                    .on("click", function (d) {
                        console.log(d.source);
                        document.getElementById("info").innerHTML = d.source;
                    });

                function tick(e) {

                    node.attr('cx', function (d) { return d.x; })
                        .attr('cy', function (d) { return d.y; })
                        .call(force.drag);

                    link.attr('x1', function (d) { return d.source.x; })
                        .attr('y1', function (d) { return d.source.y; })
                        .attr('x2', function (d) { return d.target.x; })
                        .attr('y2', function (d) { return d.target.y; });

                }

            }).catch((err) => {
                alert(err);
                console.error(err);
            });
        } 
    }

    componentDidMount() {
        console.log("Component did mount.");
        //this.createGraph();
    }

    componentWillUpdate(nextProps) {
        console.log("Component will update.");
        console.log(nextProps);
        //this.data = new DataCollector().getData(nextProps.page, nextProps.offset);
        //this.createGraph();
    }

    render() {
        return (<div>
            <div id="info"></div>
            <div id="container"></div>
        </div>
        );
    }
}

export default GraphCreator;