# Knowledge-Representation

### RDF 
- RDF è un modello per la rappresentazione di dati.
- Basato su triple soggetto-predicato-oggetto dette statement. 

### GRAFO RDF 
Un Grafo RDF è un insieme di statement RDF
- Un file contenente statement RDF descrive un grafo RDF
- Gli stessi IRI contenuti in grafi RDF diversi si riferiscono alla stessa risorsa

### TURTLE
Turtle è un linguaggio non-XML sviluppato per diminuire la verbosità
di RDF/XML e rendere i vari statement di facile comprensione non
solo per le macchine ma anche per gli esseri umani
- Vantaggi: molto machine-accessible (è facilmente parserizzabile), abbastanza
comprensibile per gli esseri umani
- Svantaggi: non è chiaro quanto lo è un grafo, possibili più linearizzazioni

### OWL
OWL 2 è una Recommendation del W3C, originariamente pubblicato
nel 2009 per creare ontologie mediante l’uso di RDF
- Implementa una specifica logica descrittiva chiamata SROIQ – le logiche
descrittive sono una sorta di sottoinsieme delle logiche del primo
ordine, e sono un buon compromesso tra espressività e computabilità
- Particolari applicazioni (come i ragionatori) possono essere usati per
inferire nuove asserzioni (che sono statement RDF conformemente alla
nomenclatura usata da OWL) partendo da dati già esistenti

## Tecnologie Usate
- Bootstrap v4.1
- Apache Jena Fuseki v3.8.0
- RDFlib 

## Come lanciare il progetto
- Installare RDFlib `pip install rdflib --user`

- Andare nella cartella contentente il server Fuseki e dare il comando: ```./fuseki-server --update --mem /ds```

- Andare sulla pagina `http://localhost:3030/ds/`
