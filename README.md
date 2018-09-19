# Knowledge-Representation

## Tecnologie Usate
- Bootstrap v4.1
- Apache Jena Fuseki v3.8.0
- RDFlib 
- Protégé
- Rule-reactor

## Requisiti
- Verificare che [XAMPP/LAMPP](boh) sia abilitato all'utilizzo di Python
- Installare RDFlib `pip install rdflib --user`
- Installare rule-reactor `npm install rule-reactor`
- Installare flask `pip install flask`
- Installare [Protégé](https://github.com/antoniofaienza93/Knowledge-Representation/blob/master/docs/ontology.md#definizione-di-unontologia)

- Installare SPARQLWrapper `pip install sparqlwrapper --user`

## Come lanciare il progetto




- Andare nella cartella contentente il server Fuseki e dare il comando: ```./fuseki-server --update --mem /ds```

- Andare sulla pagina `http://localhost:3030/ds/`
