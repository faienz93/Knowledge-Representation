#!/usr/bin/python
# coding=utf-8

from flask import Flask, render_template, redirect, send_from_directory, request
from py.query import insertProfessor, insertDiscipline, insertClassRoom, cancelProfessor, cancelDiscipline, cancelClassRoom, getAllProfessors, modifyProfessor, modifyDiscipline, modifyClassRoom
import os

template_dir = os.path.abspath('./')
app = Flask(__name__, template_folder=template_dir)

# If the second parameter is absent than teh index file are inside templates direcotry
# app = Flask(__name__, template_folder="template")

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/test')
def test():
    return render_template("test.html")

# @app.route('/ciao')
# def ciao():
#     return render_template("index.html")


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

# I indicate where load the static file (css) instead static directory
@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('css', path)

# Indicate the path of image
@app.route('/assets/<path:path>')
def send_img(path):
    return send_from_directory('assets', path)



# =====================================
# Add Professor
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
# Add Discipline
# =====================================
@app.route('/addDiscipline', methods = ['POST', 'GET'])
def addDiscipline():
    discipline_abb = request.form['discipline_abb']
    discipline_name = request.form['discipline_name']
    obligatory = request.form['obligatory']
    cfu = request.form['cfu']
    id_discipline = request.form['id_discipline']

    course = request.form['degreeCourse']
    year = request.form['yearCourse']
    curriculum = request.form['curriculumCourse']

    semester = request.form['semester']
    totalHours = request.form['totalHours']
    weeksHours = request.form['weeksHours']
    students = request.form['numberStudents']
    teacher = request.form.getlist('teacher')
    print teacher

    insertDiscipline(id_discipline, discipline_abb, discipline_name,semester,obligatory, totalHours, weeksHours, cfu, year, curriculum, course, students, teacher)


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
# Update Discipline
# =====================================
@app.route('/updateDiscipline', methods = ['POST', 'GET'])
def updateDiscipline():
    discipline_abb = request.form['discipline_abbUpdate'].strip()
    discipline_name = request.form['discipline_nameUpdate'].strip()
    obligatory = request.form['obligatoryUpdate']

    cfu = request.form['cfuUpdate'].strip()
    id_discipline = request.form['id_disciplineUpdate'].strip()

    course = request.form['degreeCourse']
    year = request.form['yearCourse']
    curriculum = request.form['curriculumCourseUpdate']

    semester = request.form['semesterUpdate'].strip()
    totalHours = request.form['totalHoursUpdate'].strip()
    weeksHours = request.form['weeksHoursUpdate'].strip()
    students = request.form['numberStudents']
    teacher = request.form.getlist('teacherUpdate')

    modifyDiscipline(id_discipline,discipline_abb,discipline_name,semester,obligatory, totalHours, weeksHours, cfu, year, curriculum, course, students, teacher)
    return redirect("/", code=302)




# =====================================
# Add Classroom
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
# Update ClassRoom
# =====================================
@app.route('/updateClassRoom', methods = ['POST', 'GET'])
def updateClassRoom():

    id_room = request.form['id_roomUpdate'].strip()
    name_room = request.form['classNameUpdate'].strip()
    capacity_room = request.form['capacityUpdate'].strip()
    wired_room = request.form['wiredUpdate'].strip()
    wifi_room = request.form['wifiUpdate'].strip()
    address_room = request.form['addressUpdate'].strip()

    modifyClassRoom(id_room, name_room, capacity_room, wired_room, wifi_room, address_room)
    return redirect("/", code=302)



if __name__ == '__main__':
    # app.run()
    # If debug = TRUE
    app.run(debug = True)
    # Bind to PORT if defined, otherwise default to 5000.
    # port = int(os.environ.get('PORT', 6000))
    # app.run(host='0.0.0.0', port=port)
