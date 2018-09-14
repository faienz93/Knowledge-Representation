# Knowledge-Representation

## Tecnologie Usate
- Bootstrap v4.1
- Apache Jena Fuseki v3.8.0
- RDFlib 
- Protégé

## Come lanciare il progetto
- Installare RDFlib `pip install rdflib --user`

- Installare [Protégé](https://github.com/antoniofaienza93/Knowledge-Representation/blob/master/docs/ontology.md#definizione-di-unontologia)

- Installare SPARQLWrapper `pip install git+https://github.com/rdflib/sparqlwrapper#egg=sparqlwrapper --user`

- Andare nella cartella contentente il server Fuseki e dare il comando: ```./fuseki-server --update --mem /ds```

- Andare sulla pagina `http://localhost:3030/ds/`
