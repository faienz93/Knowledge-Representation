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





# update professor
id='934619'
newfirstName='Alfonso'
newlastName='Ribeiro'
newRole='contratto'

queryUpdateProfessor = '''
PREFIX uni: <http://www.rdfproject.com/>
PREFIX un: <http://www.w3.org/2007/ont/unit#>
WITH <http://www.rdcproject.com/graph/professor>
DELETE { 
   ?object uni:firstName ?oldfirstName .
   ?object uni:lastName ?oldlastName .
   ?object uni:role ?oldrole .
 }
INSERT {  
   ?object uni:firstName "'''+newfirstName+''' " .
   ?object uni:lastName "'''+newlastName+''' " .
   ?object uni:role "'''+newRole+''' ".
}
WHERE { 
   ?object uni:idProfessor "'''+id+'''" .
OPTIONAL {
      ?object uni:firstName ?oldfirstName .
      ?object uni:lastName ?oldlastName .
      ?object uni:role ?oldrole .
   }
}
'''

# update discipline
id='77804'
newdisciplinename='Informatica DELLE MERENDINE'
newcfu='80'
newsemester='2'
newobligatory='true'
newtotalhours='50'
newweekhours='10'
newyear='2'
newhasCourseof='8028'
newisTaughtBy='000006'

queryUpdateDiscipline = '''
PREFIX uni: <http://www.rdfproject.com/>
PREFIX un: <http://www.w3.org/2007/ont/unit#>
WITH <http://www.rdcproject.com/graph/disciplines>
DELETE { 
   ?object uni:disciplinename ?olddisciplinename .
   ?object uni:cfu ?oldlastName .
   ?object uni:obligatory ?oldobligatory .
   ?object uni:semester ?oldsemester .
   ?object uni:totalhours ?oldtotalhours .
   ?object uni:weekhours ?oldweekhours .
   ?object uni:year ?oldyear .
   ?object uni:hasCourseof ?oldhasCourseof .
   ?object uni:isTaughtBy ?oldisTaughtBy .
 }
 
INSERT {  
   ?object uni:disciplinename "'''+newdisciplinename+'''" .
   ?object uni:cfu "'''+newcfu+'''" .
   ?object uni:obligatory "'''+newobligatory+'''" .
   ?object uni:semester "'''+newsemester+'''" .
   ?object uni:totalhours "'''+newtotalhours+'''" .
   ?object uni:weekhours "'''+newweekhours+'''" .
   ?object uni:year "'''+newyear+'''" .
   ?object uni:hasCourseof "'''+newhasCourseof+'''" .
   ?object uni:isTaughtBy "'''+newisTaughtBy+'''" .
}
WHERE { 
   ?object uni:idDiscipline "'''+id+'''" .
OPTIONAL {
   ?object uni:disciplinename ?olddisciplinename .
   ?object uni:cfu ?oldlastName .
   ?object uni:obligatory ?oldobligatory .
   ?object uni:semester ?oldsemester .
   ?object uni:totalhours ?oldtotalhours .
   ?object uni:weekhours ?oldweekhours .
   ?object uni:year ?oldyear .
   ?object uni:hasCourseof ?oldhasCourseof .
   ?object uni:isTaughtBy ?oldisTaughtBy .
   }
}
'''


# update classroom
id='44981'
newclassroomname='laboratorio di stocazzo'
newcapacity='50'
newaddress='via dalle palle'
newwifi='false'
newwired='true'

queryUpdateRoom = '''
PREFIX uni: <http://www.rdfproject.com/>
PREFIX un: <http://www.w3.org/2007/ont/unit#>
WITH <http://www.rdcproject.com/graph/classrooms>
DELETE { 
   ?object uni:classroomname ?oldclassroomname .
   ?object uni:capacity ?oldcapacity .
   ?object uni:address ?oldaddress .
   ?object uni:wifi ?oldwifi .
   ?object uni:wired ?oldwired .
 }
INSERT {  
   ?object uni:classroomname "'''+newclassroomname+''' " .
   ?object uni:capacity "'''+newcapacity+''' " .
   ?object uni:address "'''+newaddress+''' " .
   ?object uni:wifi "'''+newwifi+''' ".
   ?object uni:wired "'''+newwired+''' ".
}
WHERE { 
   ?object uni:idRoom "'''+id+'''" .
OPTIONAL {
   ?object uni:classroomname ?oldclassroomname .
   ?object uni:capacity ?oldcapacity .
   ?object uni:address ?oldaddress .
   ?object uni:wifi ?oldwifi .
   ?object uni:wired ?oldwired .
   }
}
'''


# update course
id='8028'
newcourseName='INFORMATICA PER INTERISTI'

queryUpdateCourse = '''
PREFIX uni: <http://www.rdfproject.com/>
PREFIX un: <http://www.w3.org/2007/ont/unit#>
WITH <http://www.rdcproject.com/graph/course>
DELETE { 
   ?object uni:courseName ?oldcourseName .
    }
INSERT {  
   ?object uni:courseName "'''+newcourseName+''' " .
}
WHERE { 
   ?object uni:idCourse "'''+id+'''" .
OPTIONAL {
   ?object uni:courseName ?oldcourseName .
   }
}
'''
#scelta della query in base alla classe
classes="discipline"

if(classes=="professor"):
    graph_name=graph_professor
    id_name="idProfessor"
    query=queryUpdateProfessor
elif(classes=="discipline"):
    graph_name=graph_disciplines
    id_name="idDiscipline"
    query=queryUpdateDiscipline
elif(classes=="classroom"):
    graph_name=graph_classrooms
    id_name="idRoom"
    query=queryUpdateRoom
elif(classes=="course"):
    graph_name=graph_course
    id_name="idCourse"
    query=queryUpdateCourse

sparql.setQuery(query)
sparql.setMethod('POST') 
print(query)
q = sparql.query()

