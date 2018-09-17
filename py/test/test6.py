#!/usr/bin/python
# coding=utf-8


# Import the class that i want use
from SPARQLWrapper import SPARQLWrapper
import rdflib

g = rdflib.Graph()
# Set the end-point and ask if it give me the result to JSON
# sparql = SPARQLWrapper("http://localhost:3030/ds/update",returnFormat="json")
tps_graph = "http://www.rdcproject.com/graph/professor" 
# Create a new Query
sparql.setQuery("""
PREFIX uni: <http://www.rdfproject.com/>
PREFIX un: <http://www.w3.org/2007/ont/unit#>
INSERT DATA
{ 
   GRAPH <%s>
  <http://example/Luca> a uni:Teacher ;
                        uni:firstName "Fabio"; 
  						uni:lastName "Vitali".
}
"""% (tps_graph, g.serialize(format="nt")))


# Run the query and print the result
sparql = SPARQLWrapper("http://localhost:3030/ds/update" ,returnFormat="json")
sparql.setQuery(query)
sparql.setMethod('POST') 
q = sparql.query()
print q.convert()