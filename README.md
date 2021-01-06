# Visualisation of Bloxberg-Network

Link: https://internet-sicherheit.github.io/visualisation_of_bloxberg_network/

This website will produce a force directed d3 graph, that will visualizise the Bloxberg Network by using the [Bloxberg RPC API](https://blockexplorer.bloxberg.org/api_docs) and the [Web3](https://web3js.readthedocs.io/en/v1.3.0/) framework for JavaScript.

### page
Page represents the page number to be used for pagination.

### offset
Offset represents the maximum number of records to return when paginating.

### depth
Depth represents how deep the http requests will search into to network.

## Software development
The UML diagrams below shows the processes for visualisation of Bloxberg-Network website.

### UseCase diagram
![UseCase diagram](https://github.com/internet-sicherheit/visualisation_of_bloxberg_network/blob/data_model/src/modules/docs/UseCaseBloxberg.png)

### Activity diagram
![Activity diagram](https://github.com/internet-sicherheit/visualisation_of_bloxberg_network/blob/data_model/src/modules/docs/ActivityBloxberg.png)

## Graph examples

### Graph exsample with page=2 offset=1 depth=5
![Graph example 1](https://github.com/internet-sicherheit/visualisation_of_bloxberg_network/blob/data_model/src/modules/docs/GraphSample1.PNG)

### Graph exsample with page=2 offset=1800 depth=0
![Graph example 2](https://github.com/internet-sicherheit/visualisation_of_bloxberg_network/blob/data_model/src/modules/docs/GraphSample2.PNG)