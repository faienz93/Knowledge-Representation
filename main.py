#!/usr/bin/python
# coding=utf-8


from flask import Flask, render_template, redirect, send_from_directory, request
from SPARQLWrapper import SPARQLWrapper
import rdflib
import os

g = rdflib.Graph()
# Set the end-point and ask if it give me the result to JSON
sparql = SPARQLWrapper("http://localhost:3030/ds/update",returnFormat="json")


template_dir = os.path.abspath('./')
app = Flask(__name__, template_folder=template_dir)

# If the second parameter is absent than teh index file are inside templates direcotry
# app = Flask(__name__, template_folder="template") 

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/temp')
def temp():
    return render_template("temp.html")


# ======================================================
# I indicate where load the static file (lib) instead static directory
# REF: https://stackoverflow.com/a/20648053/4700162
# ======================================================
@app.route('/lib/<path:path>')
def send_lib(path):
    return send_from_directory('lib', path)

# I indicate where load the static file (js) instead static directory
@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)


# Create RDF Professor Query
@app.route('/addProfessor', methods = ['POST', 'GET'])
def addProfessor():
    name = request.form['nameProfessorForm']
    surname = request.form['surnameProfessorForm']
    id_professor = request.form['idProfessorForm']
    role = request.form['roleProfessorForm']

    graph_professor = "http://www.rdcproject.com/graph/professor"

    # =====================================
    # Create a new Query
    # =====================================
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
    q = sparql.query()

    return redirect("/", code=302)


# Create RDF ClassRoom Query
@app.route('/addClassRoom', methods = ['POST', 'GET'])
def addClassRoom():
    
    className = request.form['className']
    capacity = request.form['capacity']    
    wired = request.form['wired']
    wifi = request.form['wifi']
    id_room = request.form['id_room']
    address = request.form['address']
    
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

    return redirect("/", code=302)


if __name__ == '__main__':
    app.run()
    # If debug = TRUE
    # app.run(debug = True)
    # Bind to PORT if defined, otherwise default to 5000.
    # port = int(os.environ.get('PORT', 5000))
    # app.run(host='0.0.0.0', port=port)