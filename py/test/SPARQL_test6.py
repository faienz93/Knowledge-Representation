#!/usr/bin/python
# coding=utf-8


# =========================================
# TEST for Insert a single triple from code
# =========================================


# Import the class that i want use
from SPARQLWrapper import SPARQLWrapper
import rdflib

g = rdflib.Graph()
# Set the end-point and ask if it give me the result to JSON
sparql = SPARQLWrapper("http://localhost:3030/ds/update",returnFormat="json")
sparql.setReturnFormat("json")
tps_graph = "http://www.rdcproject.com/graph/professor" 
name = "Fabio";
surname = "Vitali"
id_professor = "150348"
role = "ordinario"
# Create a new Query
query = '''
PREFIX uni: <http://www.rdfproject.com/>
PREFIX un: <http://www.w3.org/2007/ont/unit#>
INSERT DATA
{ 
   GRAPH <'''+tps_graph+'''>{
   uni:150348 a uni:Teacher;
                        uni:firstName "'''+name+'''"; 
  						uni:lastName "'''+surname+'''";
      					uni:id_professor "'''+id_professor+'''";
      					uni:role "'''+role+'''".
    }
}
'''



# Run the query and print the result
sparql.setQuery(query)
sparql.setMethod('POST') 
q = sparql.query()

# print q.info()["content-type"]
# print q.convert()