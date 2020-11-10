import React from 'react';
import * as d3 from 'd3';
import './styles.css';
import DataCollector from './DataCollector';

class GraphCreator extends React.Component {

    responseObject = null;

    constructor(props) {
        super(props);
        console.log("Consturctor.")
        console.log(props);
        this.responseObject = new DataCollector(); // new DataCollector().getData("0x0d81b4b37EddC9C262198A82B51470aa1eBa14C4");  // 0x4945d63B509e137b0293Bd958cf97B61996c0fB9       // 0xC91a26a4351c6b351Cc2231e9c7bE7dd7D4a7036
    }

    createGraph(promise) {
        console.log("create graph:");
        let height = 1080,
            width = 1920;

        let links = promise;

        console.log("links");
        console.log(links);


        let testNodes = [
            { source: "0x2030bed7b300cef3d4455c8f665d58a4be4e82f5", target: "", type: "contract" },
            { source: "0xd7bcafc640fc76def22fd2c64e3f53936a3047ca", target: "0xad1ae4665bb880a96faae3576c49bf01040e74e6", type: "contract" },
            { source: "0xab59a1ea1ac9af9f77518b9b4ad80942ade35088", target: "0x0215627f70f416c1f9ea89085ac956c00c657447", type: "contract" },
            { source: "0xab59a1ea1ac9af9f77518b9b4ad80942ade35088", target: "0x9ba3558b9d6289d8a5fbd76bfa78423174aac7bf", type: "contract" },
            { source: "0xd748bf41264b906093460923169643f45bdbc32e", target: "0xa63cdbc37e9434b11350087279e9c11a4b4ba8fe", type: "contract" },
            { source: "0xd748bf41264b906093460923169643f45bdbc32e", target: "0x97a9f79875087c6e78c446a725aab43c4555acbf", type: "contract" }

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
            .style("fill", function (d) {
                if (d.type === "contract") {
                    return "orange";
                }
            })
            .attr('class', 'node')
            .attr('r', width * 0.005) //radius of circle
            .on("click", function (d) {
                if (typeof d.source === "undefined") {
                    document.getElementById("info").innerHTML = d.target;
                } else {
                    document.getElementById("info").innerHTML = d.source;
                }

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

        console.log("graph drawed.");
    }

    componentWillMount() {
        console.log("Component will mount.");
    }

    componentDidMount() {
        console.log("Component did mount.");
        this.responseObject.getData(this.props.page, this.props.offset, this.props.stage).then((promise) => {
            this.createGraph(promise);
        });
    }

    componentWillUpdate(nextProps) {
        console.log("Component will update.");
        this.responseObject.getData(nextProps.page, nextProps.offset, nextProps.stage).then((promise) => {
            this.createGraph(promise);
        });
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