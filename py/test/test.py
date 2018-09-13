#!/usr/bin/python
# coding=utf-8

# Load an RDF Graph

import rdflib

my_graph = rdflib.Graph()
my_graph.load("data.owl")

# Iterate on all triples
# for s, p, o in my_graph: 
#     print s, p, o


# Serialize
print my_graph.serialize(format="nt")