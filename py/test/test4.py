#!/usr/bin/python
# coding=utf-8

# from support import load_graph
from SPARQLWrapper import SPARQLWrapper, JSON
import rdflib

# Carico il file contenente le triple da caricare sul triplestore
g = rdflib.Graph()
g.load("prova.owl")

# Il grafo del triplestore su cui voglio caricare le triple
tps_graph = "http://www.rdcproject.com/graph/professor" 

# Costruisco la query usando sia il grafo finale sia le triple da caricare
query = """INSERT DATA {
    GRAPH <%s> { %s }
    }""" % (tps_graph, g.serialize(format="nt"))


# NB: Usare 'DELETE' al posto di 'INSERT' per rimuovere
# i dati dal triplestore

# Preparo la richiesta di
# update e faccio la query
sparql = SPARQLWrapper("http://localhost:3030/ds/update")
sparql.setQuery(query)
sparql.setMethod('POST') 
q = sparql.query()