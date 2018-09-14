# RDF 
- RDF è un modello per la rappresentazione di dati.
- Basato su triple soggetto-predicato-oggetto dette statement. 

# GRAFO RDF 
Un Grafo RDF è un insieme di statement RDF
- Un file contenente statement RDF descrive un grafo RDF
- Gli stessi IRI contenuti in grafi RDF diversi si riferiscono alla stessa risorsa

# TURTLE
Turtle è un linguaggio non-XML sviluppato per diminuire la verbosità
di RDF/XML e rendere i vari statement di facile comprensione non
solo per le macchine ma anche per gli esseri umani
- Vantaggi: molto machine-accessible (è facilmente parserizzabile), abbastanza
comprensibile per gli esseri umani
- Svantaggi: non è chiaro quanto lo è un grafo, possibili più linearizzazioni

# OWL
OWL 2 è una Recommendation del W3C, originariamente pubblicato
nel 2009 per creare [ontologie](https://github.com/antoniofaienza93/Knowledge-Representation/blob/master/docs/ontology.md#ontologia) mediante l’uso di RDF
- Implementa una specifica logica descrittiva chiamata SROIQ – le logiche
descrittive sono una sorta di sottoinsieme delle logiche del primo
ordine, e sono un buon compromesso tra espressività e computabilità
- Particolari applicazioni (come i ragionatori) possono essere usati per
inferire nuove asserzioni (che sono statement RDF conformemente alla
nomenclatura usata da OWL) partendo da dati già esistenti

# SPARQL
[SPARQL](https://github.com/antoniofaienza93/Knowledge-Representation/blob/master/docs/sparql.md#sparql-command) è un linguaggio di interrogazione per dati rappresentati tramite il Resource Description Framework (RDF). Il framework di descrizione RDF è stato reso standard dal Data Access Working Group, un gruppo di lavoro del consorzio w3c, che lo ha reso raccomandazione ufficiale il 15 gennaio 2008.

SPARQL è uno degli elementi chiave delle tecnologie legate al paradigma noto come web semantico, e consente di estrarre informazioni dalle basi di conoscenza distribuite sul web. Il linguaggio RDF descrive i concetti e le relazioni su di essi attraverso l'introduzione di triple (soggetto-predicato-oggetto), e consente la costruzione di query basate su triple patterns, congiunzioni logiche, disgiunzioni logiche, e pattern opzionali.
