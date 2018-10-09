#!/usr/bin/python
# coding=utf-8

from flask import Flask, render_template, redirect, send_from_directory, request
from py.query import insertProfessor, insertDiscipline, insertClassRoom, cancelProfessor, searchProfessor, modifyProfessor, cancelDiscipline, cancelClassRoom, searchClassRoom
import os

template_dir = os.path.abspath('./')
app = Flask(__name__, template_folder=template_dir)

# If the second parameter is absent than teh index file are inside templates direcotry
# app = Flask(__name__, template_folder="template")

@app.route('/')
def index():
    return render_template("indexVincoli.html")

@app.route('/test')
def test():
    return render_template("test.html")


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

# I indicate where load the static file (js) instead static directory
@app.route('/node_modules/<path:path>')
def send_node(path):
    return send_from_directory('node_modules', path)

# I indicate where load the static file (css) instead static directory
@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('css', path)

# Indicate the path of image
@app.route('/assets/<path:path>')
def send_img(path):
    return send_from_directory('assets', path)



# =====================================
# Create RDF Professor Query
# =====================================
@app.route('/addProfessor', methods = ['POST', 'GET'])
def addProfessor():
    name = request.form['nameProfessorForm']
    surname = request.form['surnameProfessorForm']
    id_professor = request.form['idProfessorForm']
    role = request.form['roleProfessorForm']

    insertProfessor(id_professor, name, surname, role)

    return redirect("/", code=302)

# =====================================
# Delete Professor
# =====================================
@app.route('/deleteProfessor', methods = ['POST', 'GET'])
def deleteProfessor():
    teacher = request.form['deleteTeacher']
    cancelProfessor(teacher)
    return redirect("/", code=302)

# =====================================
# Update Professor
# =====================================
@app.route('/updateProfessor', methods = ['POST', 'GET'])
def updateProfessor():

    id_professor = request.form['idProfessorUpdate'].strip()
    name = request.form['nameProfessorUpdate'].strip()
    surname = request.form['surnameProfessorUpdate'].strip()
    role = request.form['roleProfessorUpdate'].strip()

    modifyProfessor(id_professor, name, surname, role)
    return redirect("/", code=302)

# =====================================
# Find Professor
# =====================================
@app.route('/findProfessor', methods = ['POST', 'GET'])
def findProfessor():
    teacher = request.form['updateTeacher'].strip()
    result = searchProfessor(teacher)

    prof ={}
    for entry in result['results']['bindings']:
        for key in entry:
            prof[key] = str(entry[key]['value']).strip()
            #print prof[key] + " count: " + str(len(prof[key]))

    return render_template("index.html", professor = prof)



# =====================================
# Create RDF Discipline Query
# =====================================
@app.route('/addDiscipline', methods = ['POST', 'GET'])
def addDiscipline():
    discipline_name = request.form['discipline_name']
    obligatory = request.form['obligatory']
    cfu = request.form['cfu']
    id_discipline = request.form['id_discipline']

    degree = request.form['degree'].split()
    course = degree[0]
    year = degree[1]

    semester = request.form['semester']
    totalHours = request.form['totalHours']
    weeksHours = request.form['weeksHours']
    teacher = request.form.getlist('teacher')
    print teacher

    insertDiscipline(id_discipline, discipline_name,semester,obligatory, totalHours, weeksHours, cfu, year, course, teacher)


    return redirect("/", code=302)

# =====================================
# Delete Discipline
# =====================================
@app.route('/deleteDiscipline', methods = ['POST', 'GET'])
def deleteDiscipline():
    discipline = request.form['deleteDiscipline']
    cancelDiscipline(discipline)
    return redirect("/", code=302)



# =====================================
# Create RDF ClassRoom Query
# =====================================
@app.route('/addClassRoom', methods = ['POST', 'GET'])
def addClassRoom():

    className = request.form['className']
    capacity = request.form['capacity']
    wired = request.form['wired']
    wifi = request.form['wifi']
    id_room = request.form['id_room']
    address = request.form['address']

    insertClassRoom(id_room,className, address, capacity, wifi, wired)

    return redirect("/updateProfessor", code=302)

# =====================================
# Delete ClassRoom
# =====================================
@app.route('/deleteClassRoom', methods = ['POST', 'GET'])
def deleteClassRoom():
    classroom = request.form['deleteClassRoom']
    cancelClassRoom(classroom)
    return redirect("/", code=302)

# =====================================
# Find ClassRoom
# =====================================
@app.route('/findClassRoom', methods = ['POST', 'GET'])
def findClassRoom():
    classRoom = request.form['updateClassRoom'].strip()
    result = searchClassRoom(classRoom)

    room ={}
    for entry in result['results']['bindings']:
        for key in entry:
            room[key] = str(entry[key]['value']).strip()
            print room[key] + " count: " + str(len(room[key]))

    return render_template("index.html", classRoom = room)



if __name__ == '__main__':
    # app.run()
    # If debug = TRUE
    app.run(debug = True)
    # Bind to PORT if defined, otherwise default to 5000.
    # port = int(os.environ.get('PORT', 6000))
    # app.run(host='0.0.0.0', port=port)
