import React from 'react';
import * as d3 from 'd3';
import './styles.css';
import DataCollector from './DataCollector';

class GraphCreator extends React.Component {
    constructor(props) {
        super(props);
        console.log("Consturctor.")
        console.log(props);
        this.data = null; // new DataCollector().getData("0x0d81b4b37EddC9C262198A82B51470aa1eBa14C4");  // 0x4945d63B509e137b0293Bd958cf97B61996c0fB9       // 0xC91a26a4351c6b351Cc2231e9c7bE7dd7D4a7036

        console.log("data");
        console.log(this.data);
    }

    createGraph() {
        console.log("create graph:");

        if (this.data !== null) {

            this.data.then((promise) => {

                //console.log(promise);

                let height = 1080,
                    width = 1920;

                let links = promise;

                console.log("links");
                console.log(links);


                let dings = [
                    { source: "0x2e8eb0126f6ca909520c394677d22196bfc82741", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0x63fb9aab8bcd1837d8d1a5318b73b1d4adc4fc6a", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0x94813130274f6c85ed658ccd653e892744127898", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0x65dc5ce59b15250b8acdd90c3c171e2e7f05d9b7", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0xee4308865d6b23afd70b7108a35dea8d6481bbc2", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0xeaee062f5658e052deda22188757436762271c7f", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0x1a94115fe5edf5f2027b1e2d7b9fc1b3d3a7ed22", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0x9ca00a5b1b61157d5d75f0c41cddb157dd050d71", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0x2eaea0039c54f63cc344c3eaacfe69421c7ee785", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0x37d1b7a3eec870e593c32d790e52b89908ca90f1", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0xaa4870919390f1026c17651b4f8f29cbc50fd789", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0x6e7215893131bf41af6256b5cf0bd61bd631b796", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0xc3e8a903c73089979465b8ed0db6bc17dd610021", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0x60b038a423272609807afb59bfd4ededd8938f48", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0x8823a9e567bac419c394c646e1d2f0929d2039ee", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0x738e6e88d4415e2e5075e15cc24fd9416f1c89c3", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0x841c25a1b2ba723591c14636dc13e4deeb65a79b", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0xeafe556569895f555755815131d21d49afdb2efe", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0x2fa6f57ff56a1da41fb7c6a176f630641e20cd53", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0x93da5507a26090448a03fc1f77e1c7da20a24292", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0x9583259d41d3409a11e73addadc399f391e7957d", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0xc463396d13c115a443c1989b883823fa538371e5", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0xf0f659e9ec6b4358a8d7fba6a0ca79baade10552", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0x8de281f47b137979e55b6cea598179737574c774", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0xdddcb89201f5a24891610b033351a5408a081f98", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0xe659bc6a60ba2091c08f7df623ba6057349b6980", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0x1ef319db1930e3420fcff90c376d9cf515b34876", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0xaa84378fa41da83a9b6523ba46e45a664fbebfc8", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0xd748bf41264b906093460923169643f45bdbc32e", target: "0xf2cde379d6818db4a8992ed132345e18e99689e9" },
                    { source: "0xd7bcafc640fc76def22fd2c64e3f53936a3047ca", target: "0x00e82774398bb9a0d74603ea4d44820eb7ba7e10" },
                    { source: "0x06f6af52eaac6d0bb8714b6d37d0ecba5945bfae", target: "0x00e82774398bb9a0d74603ea4d44820eb7ba7e10" },
                    { source: "0xf362ba399f95c8b3c38266683c6ba5c5d8eb4c0a", target: "0x00e82774398bb9a0d74603ea4d44820eb7ba7e10" },
                    { source: "0x7ef2775798476ef2247219493e3d16c899572efa", target: "0x00e82774398bb9a0d74603ea4d44820eb7ba7e10" },
                    { source: "0x3932b46589156654b2acb07772ede2a87c41eb3d", target: "0x00e82774398bb9a0d74603ea4d44820eb7ba7e10" },
                    { source: "0x3ab1fec667c89cfc35c2949f48142793a4daa9f7", target: "0x00e82774398bb9a0d74603ea4d44820eb7ba7e10" },
                    { source: "0x9cf00b5a52bc9bb830d98863df56b99a44a71feb", target: "0x00e82774398bb9a0d74603ea4d44820eb7ba7e10" },
                    { source: "0x841c25a1b2ba723591c14636dc13e4deeb65a79b", target: "0x19e51afd3efa98a6e4b82d3834de174d7a33f9b5" },
                    { source: "0xaa84378fa41da83a9b6523ba46e45a664fbebfc8", target: "0x19e51afd3efa98a6e4b82d3834de174d7a33f9b5" },
                    { source: "0x63fb9aab8bcd1837d8d1a5318b73b1d4adc4fc6a", target: "0x19e51afd3efa98a6e4b82d3834de174d7a33f9b5" },
                    { source: "0xdddcb89201f5a24891610b033351a5408a081f98", target: "0x19e51afd3efa98a6e4b82d3834de174d7a33f9b5" },
                    { source: "0x60b038a423272609807afb59bfd4ededd8938f48", target: "0x19e51afd3efa98a6e4b82d3834de174d7a33f9b5" },
                    { source: "0x8de281f47b137979e55b6cea598179737574c774", target: "0x19e51afd3efa98a6e4b82d3834de174d7a33f9b5" },
                    { source: "0x2eaea0039c54f63cc344c3eaacfe69421c7ee785", target: "0x19e51afd3efa98a6e4b82d3834de174d7a33f9b5" },
                    { source: "0x9583259d41d3409a11e73addadc399f391e7957d", target: "0x19e51afd3efa98a6e4b82d3834de174d7a33f9b5" },
                    { source: "0xf0f659e9ec6b4358a8d7fba6a0ca79baade10552", target: "0x19e51afd3efa98a6e4b82d3834de174d7a33f9b5" },
                    { source: "0x93da5507a26090448a03fc1f77e1c7da20a24292", target: "0x19e51afd3efa98a6e4b82d3834de174d7a33f9b5" },
                    { source: "0xe659bc6a60ba2091c08f7df623ba6057349b6980", target: "0x19e51afd3efa98a6e4b82d3834de174d7a33f9b5" },
                    { source: "0xc463396d13c115a443c1989b883823fa538371e5", target: "0x19e51afd3efa98a6e4b82d3834de174d7a33f9b5" },
                    { source: "0xee4308865d6b23afd70b7108a35dea8d6481bbc2", target: "0x19e51afd3efa98a6e4b82d3834de174d7a33f9b5" },
                    { source: "0x37d1b7a3eec870e593c32d790e52b89908ca90f1", target: "0x19e51afd3efa98a6e4b82d3834de174d7a33f9b5" },
                    { source: "0x6e7215893131bf41af6256b5cf0bd61bd631b796", target: "0x19e51afd3efa98a6e4b82d3834de174d7a33f9b5" },
                    { source: "0x1ef319db1930e3420fcff90c376d9cf515b34876", target: "0x19e51afd3efa98a6e4b82d3834de174d7a33f9b5" },
                    { source: "0x9ca00a5b1b61157d5d75f0c41cddb157dd050d71", target: "0x19e51afd3efa98a6e4b82d3834de174d7a33f9b5" },
                    { source: "0x2e8eb0126f6ca909520c394677d22196bfc82741", target: "0x19e51afd3efa98a6e4b82d3834de174d7a33f9b5" },
                    { source: "0x738e6e88d4415e2e5075e15cc24fd9416f1c89c3", target: "0x19e51afd3efa98a6e4b82d3834de174d7a33f9b5" },
                    { source: "0xaa4870919390f1026c17651b4f8f29cbc50fd789", target: "0x19e51afd3efa98a6e4b82d3834de174d7a33f9b5" },
                    { source: "0x2fa6f57ff56a1da41fb7c6a176f630641e20cd53", target: "0x19e51afd3efa98a6e4b82d3834de174d7a33f9b5" },
                    { source: "0xeafe556569895f555755815131d21d49afdb2efe", target: "0x19e51afd3efa98a6e4b82d3834de174d7a33f9b5" },
                    { source: "0x3a4d08d39bc461ee7f8f88147469da51c9b6472f", target: "0x020cbb75cc9dc48052dfd10964c445128b787b77" },
                    { source: "0xa9e3da16b0205ab3ee00d1fceedddfafe7b1b32b", target: "0x020cbb75cc9dc48052dfd10964c445128b787b77" },
                    { source: "0x3a4d08d39bc461ee7f8f88147469da51c9b6472f", target: "0x7ce815a19c01d61700fea183fe8d3f114e0ccb2f" },
                    { source: "0xa9e3da16b0205ab3ee00d1fceedddfafe7b1b32b", target: "0x7ce815a19c01d61700fea183fe8d3f114e0ccb2f" }
                ]

                //console.log(dings);

                //links = dings;

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

                console.log("graph drawed.");

            }).catch((err) => {
                alert(err);
                console.error(err);
            });
        }
    }

    componentWillMount() {
        console.log("Component will mount.");
        this.data = new DataCollector().getData(this.props.page, this.props.offset, this.props.stage);
    }

    componentDidMount() {
        console.log("Component did mount.");
        this.createGraph();
    }

    componentWillUpdate(nextProps) {
        console.log("Component will update.");
        //this.data = new DataCollector().getData(nextProps.page, nextProps.offset, nextProps.stage);
        this.createGraph();
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