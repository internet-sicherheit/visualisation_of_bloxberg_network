import React from 'react';
import * as d3 from 'd3';
import './styles.css';
import DataCollector from './DataCollector';

class GraphCreator extends React.Component {

    responseObject = null;
    zoomEnable = true;

    constructor(props) {
        super(props);
        console.log("Consturctor:")
        console.log(props);
        this.responseObject = new DataCollector();
    }

    createGraph(promise) {
        console.log("Function - createGraph():");

        let graphBoxHeight = window.innerHeight - document.getElementById("address_information").offsetHeight;
        document.getElementById("graph_box").style.height = graphBoxHeight + "px";

        let height = graphBoxHeight;
        let width = window.innerWidth;

        console.log("PROMISE:");
        console.log(promise);

        let links = promise;

        console.log("LINKS:");
        console.log(links);

        // create empty nodes array
        let nodes = {};

        // compute nodes from links data
        links.forEach(function (link) {
            link.source = nodes[link.source] ||
                (nodes[link.source] = { nodeAddress: link.source, source: link.source, target: link.target, typeSource: link.sourceType, typeTarget: link.targetType });
            link.target = nodes[link.target] ||
                (nodes[link.target] = { nodeAddress: link.target, source: link.source, target: link.target, typeSource: link.sourceType, typeTarget: link.targetType });
        });

        console.log("NODES:");
        console.log(nodes);

        let svgWidth = document.getElementById("address_information").offsetWidth - 2;
        let svgHeight = height - 20;

        let zoom = d3.behavior.zoom().on("zoom", updateZoom);

        document.getElementById("container").innerHTML = "";
        // add a SVG to the body for our viz
        let svg = d3.select('#container').append('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight)
            .style("cursor", "move")
            .call(zoom)
            .append("g");


        // use the force
        let force = d3.layout.force() //build the layout
            .size([svgWidth, svgHeight]) //specified earlier
            .nodes(d3.values(nodes)) //add nodes
            .links(links) //add links
            .on("tick", tick) //what to do
            .linkDistance(300) //set for proper svg size
            .charge(function (d) {
                var charge = -200;
                if (d.index === 0) charge = 2.5 * charge;
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
            .style("cursor", "auto")
            .style("fill", function (d) {
                if (d.nodeAddress === d.source) {
                    if (d.typeSource === "Contract") {
                        return "orange";
                    }
                }
                if (d.nodeAddress === d.target) {
                    if (d.typeTarget === "Contract") {
                        return "orange";
                    }
                }
            })
            .attr('class', 'node')
            .attr('r', width * 0.005) //radius of circle
            .on("click", function (d) {
                console.log(d);
                if (d.nodeAddress === d.source) {

                    let type = d.typeSource;
                    if(type === "Contract") {
                        type = "verified Contract";
                    }

                    document.getElementById("address_information").innerHTML =
                            " <p class='labels'>Type:</p><p class='values'>" + type + "</p>"
                            + "<p class='labels'>Address:</p><p class='values'><a href='https://blockexplorer.bloxberg.org/address/" + d.source + "' target='_blank'>" + d.source + "</a></p>";
                }
                if(d.nodeAddress === d.target) {

                    let type = d.typeTarget;
                    if(type === "Contract") {
                        type = "verified Contract";
                    }

                    document.getElementById("address_information").innerHTML =
                            " <p class='labels'>Type:</p><p class='values'>" + type + "</p>"
                            + "<p class='labels'>Address:</p><p class='values'><a href='https://blockexplorer.bloxberg.org/address/" + d.target + "' target='_blank'>" + d.target + "</a></p>";
                }
            })
            .on("mousedown", function (d) {

                console.log("----- Node Information -----");
                console.log("nodeAddress: " + d.nodeAddress);
                console.log("source: " + d.source);
                console.log("target: " + d.target);
                console.log("typeSource:   " + d.typeSource);
                console.log("typeTarget:   " + d.typeTarget);

                this.zoomEnable = false;
                // console.log("ZoomEnabled? " + this.zoomEnable);
                d3.select('#container').select('svg').call(d3.behavior.zoom().on("zoom", null));
            })
            .on("mouseup", function () {
                this.zoomEnable = true;
                // console.log("ZoomEnabled? " + this.zoomEnable);
                d3.select('#container').select('svg').call(zoom);
            })
            .on("focus", function () {
                d3.select(this).style("border-color", "red"); // fehlerhaft
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

        function updateZoom() {
            svg.attr("transform",
                "translate(" + d3.event.translate + ")"
                + " scale(" + d3.event.scale + ")");
        }

        console.log("Graph drawed.");
    }

    timeStap() {
        return Math.floor(Date.now());
    }
    calculationTime(startTime, endTime) {
        console.log("Graph created in " + (endTime - startTime) / 1000 + " seconds.");
    }

    showLoader() {
        document.getElementById("address_information").innerHTML = "Select a node for node information.";
        document.getElementById("address_information").style.visibility = "hidden";
        document.getElementById("container").style.visibility = "hidden";
        document.getElementById("loader").style.visibility = "visible";
    }

    hideLoader() {
        document.getElementById("address_information").style.visibility = "visible";
        document.getElementById("container").style.visibility = "visible";
        document.getElementById("loader").style.visibility = "hidden";
        document.getElementById("progress").style.width = "0%";
        document.getElementById("progress").innerHTML = "0%";
    }

    scrollAnimation() {
        document.getElementById("address_information").scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });
    }

    widthResizeListener() {
        window.onresize = function () {
            document.getElementsByTagName("svg")[0].style.width = document.getElementById("address_information").offsetWidth - 2;
        };
    }
    componentWillMount() {
        console.log("Component will mount.");
    }

    componentDidMount() {
        console.log("Component did mount.");

        let startTime = this.timeStap();

        this.showLoader();
        this.responseObject.getData(this.props.page, this.props.offset, this.props.depth).then((promise) => {
            this.hideLoader();
            this.createGraph(promise);

            let endTime = this.timeStap();
            this.calculationTime(startTime, endTime);

            this.scrollAnimation();
            this.widthResizeListener();
        });
    }

    componentWillUpdate(nextProps) {
        console.log("Component will update.");

        let startTime = this.timeStap();

        this.showLoader();
        this.responseObject.getData(nextProps.page, nextProps.offset, nextProps.depth).then((promise) => {
            this.hideLoader();
            this.createGraph(promise);

            let endTime = this.timeStap();
            this.calculationTime(startTime, endTime);

            this.scrollAnimation();
            this.widthResizeListener();
        });
    }

    componentDidUpdate() {
        console.log("Component did update.");
    }

    render() {
        return (<div id="container"></div>);
    }
}

export default GraphCreator;