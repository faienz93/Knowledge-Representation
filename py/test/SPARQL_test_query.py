#!/usr/bin/python
# coding=utf-8


# ==================================
# TEST for create a query and display in console
# ==================================


# Import the class that i want use
from SPARQLWrapper import SPARQLWrapper
import json
# Set the end-point and ask if it give me the result to JSON
sparql = SPARQLWrapper("http://localhost:3030/ds/query",returnFormat="json")

# Query che elenca le discipline con il prof che le insegnano
query1 = """
PREFIX uni: <http://www.rdfproject.com/>
PREFIX un: <http://www.w3.org/2007/ont/unit#>

SELECT ?materia ?idMateria ?idProf ?nomeProf ?cognomeProf
FROM <http://www.rdcproject.com/graph/disciplines>
FROM <http://www.rdcproject.com/graph/professor>
WHERE{
 ?x  a uni:Discipline;
     uni:disciplinename ?materia;
     uni:idDiscipline ?idMateria;
     uni:isTaughtBy ?idProf. 
  ?idProf uni:firstName ?nomeProf;
          uni:lastName ?cognomeProf.
}ORDER BY ?materia
"""


#query che restituisce l'elenco dei professori che hanno più di un insegnamento
query2 = """
PREFIX uni: <http://www.rdfproject.com/>
PREFIX un: <http://www.w3.org/2007/ont/unit#>

SELECT ?idProf ?cognomeProf ?nomeProf (COUNT (?idMateria)AS ?count)
FROM <http://www.rdcproject.com/graph/disciplines>
FROM <http://www.rdcproject.com/graph/professor>
WHERE{
 ?x  a uni:Discipline;
      uni:idDiscipline ?idMateria;      
      uni:isTaughtBy ?idProf.  
    ?idProf uni:firstName ?nomeProf;
          uni:lastName ?cognomeProf.
}GROUP BY ?idProf ?cognomeProf ?nomeProf 
HAVING (?count>1)
"""


#query che restituisce l'elenco dei professori che hanno più di un insegnamento ed elenco materie separate da |
query3 = """
PREFIX uni: <http://www.rdfproject.com/>
PREFIX un: <http://www.w3.org/2007/ont/unit#>

SELECT ?idProf ?cognomeProf ?nomeProf (COUNT (?idMateria)AS ?count) (group_concat(?nomeMateria ; separator=" | ") AS ?discipline)
FROM <http://www.rdcproject.com/graph/disciplines>
FROM <http://www.rdcproject.com/graph/professor>
WHERE{
 ?x  a uni:Discipline;
      uni:idDiscipline ?idMateria;
      uni:disciplinename ?nomeMateria;
      uni:isTaughtBy ?idProf.  
    ?idProf uni:firstName ?nomeProf;
          uni:lastName ?cognomeProf.
}GROUP BY ?idProf ?cognomeProf ?nomeProf 
HAVING (?count>1)
"""

#query dei corsi di un determinato tipo (8028 ossia i curricula della magistrale)
query4 = """
PREFIX uni: <http://www.rdfproject.com/>
PREFIX un: <http://www.w3.org/2007/ont/unit#>

SELECT ?nomecorso ?idcorso 
FROM <http://www.rdcproject.com/graph/course>
WHERE{
 ?x  a uni:8028;
     uni:courseName ?nomecorso;
     uni:idCourse ?idcorso.
}ORDER BY ?nomecorso
"""

#query che restituisce l'elenco delle materie obbligatorie per corso
query5 = """
PREFIX uni: <http://www.rdfproject.com/>
PREFIX un: <http://www.w3.org/2007/ont/unit#>

SELECT  ?idCorso (group_concat(?idDiscipline) AS ?idMaterie)
FROM <http://www.rdcproject.com/graph/disciplines>
WHERE{
 ?x  a uni:Discipline;
       uni:idDiscipline ?idDiscipline;
       uni:obligatory 'true';
       uni:hasCourseof ?idCorso.
}GROUP BY ?idCorso
"""


#query che restituisce l'elenco dei datatypes properties di una classe
query6 = """
PREFIX uni: <http://www.rdfproject.com/>
PREFIX un: <http://www.w3.org/2007/ont/unit#>

SELECT DISTINCT ?y (datatype(?z) AS ?data)
  FROM <http://www.rdcproject.com/graph/disciplines>
  WHERE{
  ?x a <http://www.rdfproject.com/Discipline>.
  ?x ?y ?z.  
  filter (datatype(?z) != '')
  
}
"""



# Run the query and print the result
sparql.setQuery(query6)
sparql.setMethod('POST') 
# try:
#     result = sparql.query().convert()
# except :
#     print "Badformed query!"


result = sparql.query().convert()



#print result.values()[1]#risultati query
print "La query è andata a buon fine e ha prodotto ", len(result['results']['bindings']), ' risultati'

for entry in result['results']['bindings']:
    print '_______________________________________________________________________'
    for key in entry:
        print key,' -> ',entry[key]['value']
    
    
    
    
    
    