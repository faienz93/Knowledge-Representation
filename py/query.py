#!/usr/bin/python
# coding=utf-8

# This file contains the query for 
# - Insert Professor
# - Insert Discipline
# - Insert ClassRoom


from SPARQLWrapper import SPARQLWrapper
import rdflib

g = rdflib.Graph()
# Set the end-point and ask if it give me the result to JSON
sparql = SPARQLWrapper("http://localhost:3030/ds/update",returnFormat="json")

# ======================================================================
# Insert Professor
# @param
#   - id_professor, 
#   - name, 
#   - surname, 
#   - role
# ======================================================================
def insertProfessor(id_professor, name, surname, role):
    graph_professor = "http://www.rdcproject.com/graph/professor"
    
    # Create a new Query
    query = '''
            PREFIX uni: <http://www.rdfproject.com/>
            PREFIX un: <http://www.w3.org/2007/ont/unit#>
            INSERT DATA
            { 
            GRAPH <'''+graph_professor+'''>{
            uni:'''+id_professor+''' a uni:Teacher;
                                    uni:firstName "'''+name+'''"; 
                                    uni:lastName "'''+surname+'''";
                                    uni:idProfessor "'''+id_professor+'''";
                                    uni:role "'''+role+'''".
                }
            }
            '''
    
    # Run the query 
    sparql.setQuery(query)
    sparql.setMethod('POST') 
    print query
    sparql.query()



# ======================================================================
# Delete Professor
# @param
#   - id_professor
# ======================================================================
def cancelProfessor(id_professor):   
    print("ID PROFESSOR " + id_professor) 
    queryDelete = '''
                PREFIX uni: <http://www.rdfproject.com/>
                PREFIX un: <http://www.w3.org/2007/ont/unit#>
                DELETE WHERE { 
                GRAPH <http://www.rdcproject.com/graph/professor> {
                        ?object uni:idProfessor "'''+id_professor+'''";
                         ?property  ?value 
                }
                GRAPH <http://www.rdcproject.com/graph/disciplines> 
                {
                    ?objectData uni:isTaughtBy ?object. 
                }
                }
                '''

    sparql.setQuery(queryDelete)
    sparql.setMethod('POST') 
    print queryDelete
    sparql.query()












# ======================================================================
# Insert Discipline
# @param
#   - id_discipline
#   - discipline_name
#   - semester
#   - obligatory
#   - totalHours
#   - weeksHours
#   - cfu
#   - year
#   - course
#   - teacher
# ======================================================================
def insertDiscipline(id_discipline, discipline_name,semester,obligatory, totalHours, weeksHours, cfu, year, course, teacher):

    isTaughtBy = ""
    for t in teacher:          
        isTaughtBy += "uni:isTaughtBy uni:" + t + ";"

    
    graph_disciplines = "http://www.rdcproject.com/graph/disciplines"
    # Create a new Query
    query = '''
    PREFIX uni: <http://www.rdfproject.com/>
    PREFIX un: <http://www.w3.org/2007/ont/unit#>
    INSERT DATA
    { 
    GRAPH <'''+graph_disciplines+'''>{
    uni:'''+id_discipline +''' a uni:Discipline;
                            uni:disciplinename "'''+discipline_name+'''"; 
                            uni:semester "'''+semester+'''"; 
                            uni:obligatory "'''+obligatory+'''"; 
                            uni:totalhours "'''+totalHours+'''";
                            uni:weekhours "'''+weeksHours+'''";
                            uni:cfu "'''+cfu+'''";
                            uni:year "'''+year+'''";
                            uni:idDiscipline "'''+id_discipline+'''";
                            '''+isTaughtBy+'''
                            uni:hasCourseof uni:'''+course+'''.
                            
        }
    }
    '''
        
    # Run the query and print the result
    sparql.setQuery(query)
    sparql.setMethod('POST') 
    print query
    sparql.query()

# ======================================================================
# Insert ClassRoom
# @param
#   - id_room
#   - className
#   - address
#   - capacity
#   - wifi
#   - wired
# ======================================================================
def insertClassRoom(id_room,className, address, capacity, wifi, wired):
    graph_classrooms = "http://www.rdcproject.com/graph/classrooms" 

    # Create a new Query
    query = '''
            PREFIX uni: <http://www.rdfproject.com/>
            PREFIX un: <http://www.w3.org/2007/ont/unit#>
            INSERT DATA
            { 
            GRAPH <'''+graph_classrooms+'''>{
            uni:'''+id_room+''' a uni:Classroom;
                                    uni:classroomname "'''+className+'''"; 
                                    uni:address "'''+address+'''";
                                    uni:capacity "'''+capacity+'''";
                                    uni:wifi "'''+wifi+'''";
                                    uni:idRoom "'''+id_room+'''"; 
                                    uni:wired "'''+wired+'''".
                }
            }
            '''
    
    # Run the query 
    sparql.setQuery(query)
    sparql.setMethod('POST') 
    print query
    q = sparql.query()