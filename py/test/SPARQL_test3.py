#!/usr/bin/python
# coding=utf-8

import logging
import itertools
import rdflib

# Import NameSpace RDF
from rdflib.namespace import RDF

from rdflib import Literal
# Import Namespace class for create new RDF Graph
from rdflib import Namespace

logging.basicConfig() 
rdf = rdflib.Graph()
rdf.load("data.owl")

FOAF = Namespace("http://xmlns.com/foaf/0.1/")
DATA = Namespace("http://www.essepuntato.it/2013/citalo/test/data/")

person5 = DATA.person5
rdf.add((person5, RDF.type, FOAF.Person)) 

rdf.add((person5, FOAF.name, Literal("Pippo")))
rdf.add((person5, FOAF.age, Literal(30)))

# Create a new list. For every element of triples that has a specif requirement, I add this elemt to a list
people = [] 
for s,p,o in rdf.triples((None, RDF.type, FOAF.Person)):
    people += [s] 

# Calculate all combinations
pairs = itertools.combinations(people,2) 

# For every pairs add a new Statement
for pair in pairs:
    person1 = pair[0]
    person2 = pair[1] 
    rdf.add((person1, FOAF.knows, person2))

# Save the new Graph in RDF/XML format
rdf.serialize("data-updated2.owl",format="pretty-xml")