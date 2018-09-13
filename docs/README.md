# SPARQL Command
(**NOTA:** Eseguire la query come *SPARQL Query* mentre le operazioni sul grafo come *SPARQL Update*)
Qui di seguito alcuni comandi utili da utilizzare in SPARQL
## Come caricare un file in formato ttl su fuseki
- `fuseki-server --file=path/of/file.ttl /ds`
(NOTA: `/ds` indica il datasets)

## Esempio di query 
- Esempio per vedere se il file caricato è andato a buon fine: `SELECT * {?s ?p ?o}`
In generale per vedere come accedere ad un grafo si può consultare la [GUIDA](https://www.w3.org/TR/sparql11-query/#queryDataset)

## Creare un grafo
`CREATE GRAPH <NOME_GRAFO>`

## Eliminare un grafo
`DROP GRAPH <NOME_GRAFO>`

## Eliminare un grafo non sapendo se è stato esplicitamente creato o meno
`DROP SILENT GRAPH <NOME_GRAFO>`

## Vedere se un grafo esiste 
 `ASK WHERE { GRAPH <NOME_GRAFO> { ?s ?p ?o } }`


## Vedere tutti quelli che sono i grafi disponibili
```
SELECT ?g 
WHERE {   
    GRAPH ?g { } 
}
```

(**NOTA:** Ritornerà vuota se bob è stato inserito nessuna tripla   )