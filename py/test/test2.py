#!/usr/bin/python
# coding=utf-8

# Serfing an RDFGraph
import logging
import rdflib

# Import NameSpace RDF
from rdflib.namespace import RDF

# Import Namespace class for create new RDF Graph
from rdflib import Namespace

logging.basicConfig() 
rdf = rdflib.Graph()
rdf.load("data.owl")

# Create a new NameSpace
FOAF = Namespace("http://xmlns.com/foaf/0.1/")

# Print all triples that has as @predicate rdf.type and as object FOAF.Person
for s,p,o in rdf.triples((None, RDF.type, FOAF.Person)):
    print s + " is a person"