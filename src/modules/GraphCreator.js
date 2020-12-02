import React from 'react';
import * as d3 from 'd3';
import './styles.css';
import DataCollector from './DataCollector';

class GraphCreator extends React.Component {

    responseObject = null;
    zoomEnable = true;

    constructor(props) {
        super(props);
        console.log("Consturctor.")
        console.log(props);
        this.responseObject = new DataCollector();
    }

    createGraph(promise) {
        console.log("create graph:");

        let graphBoxHeight = window.innerHeight - document.getElementById("address_information").offsetHeight;
        document.getElementById("graph_box").style.height = graphBoxHeight + "px";

        let height = graphBoxHeight;
        let width = window.innerWidth ;

        let links = promise;

        console.log("links");
        console.log(links);


        let testNodes = [
            { source: "0x2030bed7b300cef3d4455c8f665d58a4be4e82f5", target: "", type: "Contract" },
            { source: "0xd7bcafc640fc76def22fd2c64e3f53936a3047ca", target: "0xad1ae4665bb880a96faae3576c49bf01040e74e6", type: "Contract" },
            { source: "0xab59a1ea1ac9af9f77518b9b4ad80942ade35088", target: "0x0215627f70f416c1f9ea89085ac956c00c657447", type: "Contract" },
            { source: "0xab59a1ea1ac9af9f77518b9b4ad80942ade35088", target: "0x9ba3558b9d6289d8a5fbd76bfa78423174aac7bf", type: "Contract" },
            { source: "0xd748bf41264b906093460923169643f45bdbc32e", target: "0xa63cdbc37e9434b11350087279e9c11a4b4ba8fe", type: "Contract" },
            { source: "0xd748bf41264b906093460923169643f45bdbc32e", target: "0x97a9f79875087c6e78c446a725aab43c4555acbf", type: "Contract" }

            /*{source: "0x2030bed7b300cef3d4455c8f665d58a4be4e82f5", target: ""},
            {source: "0xd7bcafc640fc76def22fd2c64e3f53936a3047ca", target: "0xad1ae4665bb880a96faae3576c49bf01040e74e6"},
            {source: "0xab59a1ea1ac9af9f77518b9b4ad80942ade35088", target: "0x0215627f70f416c1f9ea89085ac956c00c657447"},
            {source: "0xab59a1ea1ac9af9f77518b9b4ad80942ade35088", target: "0x9ba3558b9d6289d8a5fbd76bfa78423174aac7bf"},
            {source: "0xd748bf41264b906093460923169643f45bdbc32e", target: "0xa63cdbc37e9434b11350087279e9c11a4b4ba8fe"},
            {source: "0xd748bf41264b906093460923169643f45bdbc32e", target: "0x97a9f79875087c6e78c446a725aab43c4555acbf"} */


        ]

        // links = testNodes;

        // create empty nodes array
        let nodes = {};

        // compute nodes from links data
        links.forEach(function (link) {
            link.source = nodes[link.source] ||
                (nodes[link.source] = { source: link.source });
            link.target = nodes[link.target] ||
                (nodes[link.target] = { target: link.target, type: link.type });
        });

        console.log(nodes);

        let svgWidth = document.getElementById("address_information").offsetWidth - 2;
        let svgHeight = height - 20;

        let zoom = d3.behavior.zoom().on("zoom", updateZoom);

        document.getElementById("container").innerHTML = "";
        // add a SVG to the body for our viz
        let svg = d3.select('#container').append('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight)
            .style("cursor","move")
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
            .style("cursor","auto")
            .style("fill", function (d) {
                if (d.type === "Contract") {
                    return "orange";
                }
            })
            .attr('class', 'node')
            .attr('r', width * 0.005) //radius of circle
            .on("click", function (d) {
                if (typeof d.source === "undefined") {
                    document.getElementById("address_information").innerHTML = 
                      " <p class='labels'>Type:</p><p class='values'>" + d.type + "</p>"
                    + "<p class='labels'>Address:</p><p class='values'><a href='https://blockexplorer.bloxberg.org/address/" + d.target + "' target='_blank'>" + d.target + "</a></p>"
                } else {
                    document.getElementById("address_information").innerHTML = 
                      " <p class='labels'>Type:</p><p class='values'>" + "Account</p>"
                    + "<p class='labels'>Address:</p><p class='values'><a href='https://blockexplorer.bloxberg.org/address/" + d.source + "' target='_blank'>" + d.source + "</a></p>";
                }
            })
            .on("mousedown", function() {
                d3Attributes();
                this.zoomEnable = false;
                console.log("ZoomEnabled? " + this.zoomEnable);
                d3.select('#container').select('svg').call(d3.behavior.zoom().on("zoom", null));
            })
            .on("mouseup", function() {
                this.zoomEnable = true;
                console.log("ZoomEnabled? " + this.zoomEnable);
                d3.select('#container').select('svg').call(zoom);
            })
            .on("focus", function() {
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

        function d3Attributes() {
            console.log(document.getElementsByTagName("g")[0].getAttribute("transform"));
        }
    
        console.log("graph drawed.");
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
        this.showLoader();
        this.responseObject.getData(this.props.page, this.props.offset, this.props.stage).then((promise) => {
            this.hideLoader();
            this.createGraph(promise);

            this.scrollAnimation();
            this.widthResizeListener();
        });
    }

    componentWillUpdate(nextProps) {
        console.log("Component will update.");
        this.showLoader();
        this.responseObject.getData(nextProps.page, nextProps.offset, nextProps.stage).then((promise) => {
            this.hideLoader();
            this.createGraph(promise);

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