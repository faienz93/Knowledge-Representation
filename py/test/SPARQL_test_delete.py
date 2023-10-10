from SPARQLWrapper import SPARQLWrapper
import rdflib

g = rdflib.Graph()
# Set the end-point and ask if it give me the result to JSON
sparql = SPARQLWrapper("http://localhost:3030/ds/update",returnFormat="json")

# Set the graph names
graph_professor = "http://www.rdcproject.com/graph/professor" 
graph_disciplines = "http://www.rdcproject.com/graph/disciplines"
graph_classrooms = "http://www.rdcproject.com/graph/classrooms" 
graph_courses = "http://www.rdcproject.com/graph/course"

integrity_query=""
#delete in base al tipo di classe
classes="professor"
if(classes=="professor"):
    graph_name=graph_professor
    id_name="idProfessor"
    integrity_query='''
    GRAPH <http://www.rdcproject.com/graph/disciplines> 
      {
        ?objectData uni:isTaughtBy ?object. 
      }
      '''
elif(classes=="discipline"):
    graph_name=graph_disciplines
    id_name="idDiscipline"    
elif(classes=="classroom"):
    graph_name=graph_classrooms
    id_name="idRoom"
elif(classes=="course"):
    graph_name=graph_courses
    id_name="idCourse"
    integrity_query='''
    GRAPH <http://www.rdcproject.com/graph/disciplines> 
      {
        ?ObjectData uni:hasCourseof ?object. 
      }
      '''


#id dell'oggetto della classe scelta
id='000004'

queryDelete = '''
PREFIX uni: <http://www.rdfproject.com/>
PREFIX un: <http://www.w3.org/2007/ont/unit#>
DELETE WHERE { 
  GRAPH <'''+graph_name+'''>{
  ?object uni:'''+id_name+' "'+id+'"'''';
                         ?property      ?value 
  }
  '''+integrity_query+'''
  }
'''

sparql.setQuery(queryDelete)
sparql.setMethod('POST') 
print(query)Delete
q = sparql.query()

