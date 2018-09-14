# Knowledge-Representation

## Ontologia
Per la definizione della nostra ontologia si è 
- Scaricato e installato [Pròtegé](https://protegewiki.stanford.edu/wiki/Protege4GettingStarted#Download)
- Dalla [Protegé Ontology Library](https://protegewiki.stanford.edu/wiki/Protege_Ontology_Library) si è selezionato [Institutional Ontology](http://www.isibang.ac.in/~bisu/ontology/instOntology.owl). 

## Tecnologie Usate
- Bootstrap v4.1
- Apache Jena Fuseki v3.8.0
- RDFlib 
- Pròtegé

## Come lanciare il progetto
- Installare RDFlib `pip install rdflib --user`

- Andare nella cartella contentente il server Fuseki e dare il comando: ```./fuseki-server --update --mem /ds```

- Andare sulla pagina `http://localhost:3030/ds/`
