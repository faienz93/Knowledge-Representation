#!/usr/bin/python
# coding=utf-8

# ==================================================================
# This file read from csv and insert value into dabatabase SPARQL
# ==================================================================


import csv
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

# Create a query Informatica Triennale 
queryInformaticaTriennale = '''
PREFIX uni: <http://www.rdfproject.com/>
PREFIX un: <http://www.w3.org/2007/ont/unit#>
INSERT DATA
{ 
   GRAPH <'''+graph_courses+'''>{
                        uni:8009 a uni:Course;
                        uni:idCourse "8009"; 
  						uni:courseName "Informatica Triennale".
    }
}
'''


sparql.setQuery(queryInformaticaTriennale)
sparql.setMethod('POST') 
q = sparql.query()

# Create a query Informatica Per Il Management
queryInformaticaPerIlManagement = '''
PREFIX uni: <http://www.rdfproject.com/>
PREFIX un: <http://www.w3.org/2007/ont/unit#>
INSERT DATA
{ 
   GRAPH <'''+graph_courses+'''>{
                        uni:8014 a uni:Course;
                        uni:idCourse "8014"; 
  						uni:courseName "Informatica per il Management".
    }
}
'''


sparql.setQuery(queryInformaticaPerIlManagement)
sparql.setMethod('POST') 
q = sparql.query()

# Create a query Informatica Magistrale
queryInformaticaMagistrale = '''
PREFIX uni: <http://www.rdfproject.com/>
PREFIX un: <http://www.w3.org/2007/ont/unit#>
INSERT DATA
{ 
   GRAPH <'''+graph_courses+'''>{
                        uni:8028 a uni:Course;
                        uni:idCourse "8028"; 
  						uni:courseName "Informatica Magistrale".
    }
}
'''

#
sparql.setQuery(queryInformaticaMagistrale)
sparql.setMethod('POST') 
q = sparql.query()


# ---------------------------------------------------------------------------
# Create a query Informatica Magistrale CURRICULUM A, B, C

queryCurrA = '''
PREFIX uni: <http://www.rdfproject.com/>
PREFIX un: <http://www.w3.org/2007/ont/unit#>
INSERT DATA
{ 
   GRAPH <'''+graph_courses+'''>{
                        uni:8028A a uni:8028;
                        uni:idCourse "8028A"; 
  						uni:courseName "Informatica Magistrale - CURRICULUM A: TECNICHE DEL SOFTWARE".
    }
}
'''


sparql.setQuery(queryCurrA)
sparql.setMethod('POST') 
q = sparql.query()

queryCurrB = '''
PREFIX uni: <http://www.rdfproject.com/>
PREFIX un: <http://www.w3.org/2007/ont/unit#>
INSERT DATA
{ 
   GRAPH <'''+graph_courses+'''>{
                        uni:8028B a uni:8028;
                        uni:idCourse "8028B"; 
  						uni:courseName "Informatica Magistrale - CURRICULUM B: INFORMATICA PER IL MANAGEMENT".
    }
}
'''


sparql.setQuery(queryCurrB)
sparql.setMethod('POST') 
q = sparql.query()

queryCurrC = '''
PREFIX uni: <http://www.rdfproject.com/>
PREFIX un: <http://www.w3.org/2007/ont/unit#>
INSERT DATA
{ 
   GRAPH <'''+graph_courses+'''>{
                        uni:8028C a uni:8028;
                        uni:idCourse "8028C"; 
  						uni:courseName "Informatica Magistrale - CURRICULUM C: SISTEMI E RETI".
    }
}
'''


sparql.setQuery(queryCurrC)
sparql.setMethod('POST') 
q = sparql.query()

# Insert into graph professor the professor written inside csv file "professors.csv"
with open('../assets/professors.csv', 'rb') as csvfile:
    testReader = csv.reader(csvfile, skipinitialspace=False, delimiter=',')
    t = list(testReader)
   
    for row in t[1:]:
        name = row[0]
        surname = row[1]
        id_professor = row[2]
        role = row[3]
        
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
        # Run the query and print the result
        sparql.setQuery(query)
        sparql.setMethod('POST') 
        # print query
        q = sparql.query()


# Insert into graph classrooms the class written inside csv file "classrooms.csv"
with open('../assets/classrooms.csv', 'rb') as csvfile:
    testReader = csv.reader(csvfile, skipinitialspace=False, delimiter=',')
    t = list(testReader)
    
    for row in t[1:]:
        id_room = row[0]
        className = row[1]
        address = row[2]
        capacity = row[3]
        wifi = row[4]
        wired = row[5]

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
        # Run the query and print the result
        sparql.setQuery(query)
        sparql.setMethod('POST') 
        # print query
        q = sparql.query()

# Insert into graph disciplines the subjects written inside csv file "disciplines.csv"
with open('../assets/disciplines.csv', 'rb') as csvfile:
    testReader = csv.reader(csvfile, skipinitialspace=False, delimiter=',')
    t = list(testReader)
   
    for row in t[1:]:
        id_discipline = row[0]
        discipline_name = row[1]
        semester = row[2]
        obligatory = row[3]
        totalHours = row[4]
        weeksHours = row[5]
        cfu = row[6]
        year = row[7]
        course = row[8]

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
                                uni:hasCourseof uni:'''+course+'''
                                
            }
        }
        '''
        # uni:hasCourseof 
        # Run the query and print the result
        sparql.setQuery(query)
        sparql.setMethod('POST') 
        print query
        q = sparql.query()









