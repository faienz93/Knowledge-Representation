/*
 * ===========================================================================
 * File: Const.js 
 * Author: Antonio Faienza
 * Desc: This file contains global variable
 * ===========================================================================
 */
;
function TimetableArray() {
    this.tt = [];
}

// start lessons
var START_LESSONS = 9;

var DURATION_LESSON = 6;

// end lessons
var END_LESSONS = 18;

// Global calendar
var calendar;

// Momentjs calendar
moment.locale('en');
var now = moment();

// Events of calendar
var events = [];

// var classrooms = ['Aula Ercolani 1', 'Aula Ercolani 2', 'Aula Ercolani 3', 'Lab Ercolani', 'Ranzani', 'Vitali'];
// var classrooms = ['Aula Ercolani 1', 'Aula Ercolani 2'];
var classrooms = [];
classrooms.push(new Classroom(12347, "E1", "Ercolani", 40, true, true));
classrooms.push(new Classroom(12348, "E2", "Ercolani", 40, true, true));
classrooms.push(new Classroom(12349, "E3", "Ercolani", 30, true, true));
classrooms.push(new Classroom(51200, "Enriquez", "Matematica", 30, false, false));
classrooms.push(new Classroom(51201, "Pincherle", "Matematica", 30, false, false));
classrooms.push(new Classroom(51202, "Cremona", "Matematica", 30, false, false));
classrooms.push(new Classroom(51203, "Tonelli", "Matematica", 30, true, false));
classrooms.push(new Classroom(51204, "Sem8", "Matematica", 30, true, false));
classrooms.push(new Classroom(44981, "C1 Ranzani", "Ranzani", 30, false, false));
classrooms.push(new Classroom(44982, "Lab Ranzani", "Ranzani", 30, true, true));



var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];


// var nomiMaterie = ['RDC', 'SM', 'IOT', 'MSC', 'MAT', 'COM', 'UUX'];
// var nomiMaterie = ['RDC', 'SM', 'IOT', 'MAT'];
// var nomiMaterie = ['RDC', 'SM', 'IOT'];

// // var nomiMaterieInfoMan = ['DI', 'EA', 'AM', 'PI'];
// var nomiMaterieInfoMan = ['DI', 'EA', 'AM'];

// var nomiMaterieInfoTriennale = ['P', 'O', 'CN'];



// id, name
var infoman = new Course(8014, "Informatica per il Management");
var info = new Course(8009, "Informatica Triennale");
var infolm = new Course(8028, "Informatica Magistrale");
var currA = new Curriculum("A", "Tecniche del Software");
var currB = new Curriculum("B", "Informatica per il Management");
var currC = new Curriculum("C", "Sistemi e Reti");

var courses=[infoman,info,infolm];

// Discipline(id, abbreviation ,name, semester, obligatory, totalHours, weeksHours, cfu, year) {
var cbd = new Discipline("28796", "CBD", "COMPLEMENTI DI BASI DI DATI", "1", true, 60, 5, 6, 1, 29);
var uux = new Discipline("81670", "UUX", "USABILITA E USER EXPERIENCE", "1", true, 60, 6, 6, 1, 29);
var gmb = new Discipline("81960", "TG", "GIOCHI E MODELLI BOOLEANI", "1", true, 60, 6, 6, 1, 29);
var ap = new Discipline("81668", "AA", "ALGORITMI PARALLELI", "1", true, 60, 6, 6, 1, 29);
var isos = new Discipline("77803", "ISOS", "INGEGNERIA DEL SOFTWARE ORIENTATA AI SERVIZI", "1", false, 50, 5, 6, 1, 29);
var fsc = new Discipline("23762", "FSC", "FISICA DEI SISTEMI COMPLESSI", "1", false, 50, 5, 6, 1, 29);
var sds = new Discipline("37760", "SDS", "SIMULAZIONE DI SISTEMI", "1", false, 50, 5, 6, 1, 39);
var iot =  new Discipline("37760", "IoT", "INTERNET OF THING", "1", false, 50, 6, 6, 1, 10);
var sismob =  new Discipline("37760", "SM", "SISTEMI MOBILI", "1", false, 50, 5, 6, 1, 29);
var siswir = new Discipline("37760", "SW", "SISTEMI WIRELESS", "1", false, 50, 5, 6, 1, 29);


cbd.addCurriculum(currA);
cbd.addCurriculum(currB);
cbd.addCurriculum(currC);
uux.addCurriculum(currA);
uux.addCurriculum(currB);
uux.addCurriculum(currC);
gmb.addCurriculum(currB);
ap.addCurriculum(currA);
ap.addCurriculum(currC);

// firstName,surName,id_professor,role
var dm = new Professor("Danilo", "Montesi", "211832", "ordinario");
var fv = new Professor("Fabio", "Vitali", "5", "ordinario");
var gr = new Professor("Giovanni", "Rossi", "342", "contratto");
var ab = new Professor("Alan Albert", "Bertossi", "295601", "ordinario");
var dr = new Professor("Davide", "Rossi", "211833", "contratto");
var sr = new Professor("Sandro", "Rambaldi", "841964", "associato");
var ld = new Professor("Lorenzo", "Donatiello", "251632", "ordinario");
var gf = new Professor("Giosuella", "Finocchiaro", "219832", "ordinario");
var ra = new Professor("Roberto", "Aprile", "0025", "contratto");
var sm = new Professor("Serena", "Morigi", "098", "ordinario");
var mf = new Professor("Marco", "Di Felice", "00009", "ordinario");
var lb = new Professor("Luciano", "Bononi", "00008", "ordinario");
var ivanlanese = new Professor("Ivan", "Lanese", "211833", "ordinario"); 
var giuCas = new Professor("Giulio", "Casciola", "211834", "ordinario");  
var ul = new Professor("Ugo", "Dal Lago", "211835", "ordinario"); 





///////////////////////////////////////////////////////////
// ADD TEACHER
cbd.setProfessor(dm);
uux.setProfessor(fv);
gmb.setProfessor(gr);
ap.setProfessor(ab);
isos.setProfessor(dr);
fsc.setProfessor(sr);
sds.setProfessor(ld);
// PROFESSORI CHE CONDIVIDONO LO STESSO CORSO
iot.setProfessor(mf);
iot.setProfessor(lb);
sismob.setProfessor(mf)
siswir.setProfessor(lb);

// ADD COURSE
cbd.addCourse(infolm);
uux.addCourse(infolm);
gmb.addCourse(infolm);
ap.addCourse(infolm);
isos.addCourse(infolm);
fsc.addCourse(infolm);
sds.addCourse(infolm);
iot.addCourse(infolm);
sismob.addCourse(infolm);
siswir.addCourse(infolm);

// INFOMAN
var di = new Discipline("28796", "DI", "Diritto di Internet", "1", true, 60, 5, 6, 1, 29);
var ea = new Discipline("28797", "EA", "Economia Aziendale", "1", true, 60, 5, 6, 1, 29);
var am = new Discipline("28798", "AM", "Analisi Matematica", "1", true, 60, 5, 6, 1, 39);
var bd = new Discipline("28798", "BD", "Basi di Dati", "1", true, 60, 5, 6, 1, 39);
di.addCourse(infoman);
ea.addCourse(infoman);
am.addCourse(infoman);
bd.addCourse(infoman);

// ADD TEACHER
di.setProfessor(gf); 
ea.setProfessor(ra);
am.setProfessor(sm);
bd.setProfessor(mf)

// INFORMATICA TRIENNALE
var p = new Discipline("28799", "P", "Programmazione", "1", true, 60, 5, 6, 1, 29);
var o = new Discipline("28800", "O", "Ottimizzazione", "1", true, 60, 5, 6, 1, 29);
var cn = new Discipline("28801", "CN", "Calcolo Numerico", "1", true, 60, 5, 6, 1, 39);
p.addCourse(info);
o.addCourse(info);
cn.addCourse(info);

// ADD TEACHER
p.setProfessor(ivanlanese); 
o.setProfessor(ul); 
cn.setProfessor(giuCas); 




// Preferenze di Marco di Felice
// iot.avoidLessonDay("Monday");
// iot.avoidLessonDay("Tuesday");
// sismob.avoidLessonDay("Monday");
// sismob.avoidLessonDay("Tuesday");
// bd.avoidLessonDay("Monday");
// bd.avoidLessonDay("Tuesday");

iot.consecutiveDay(true);
sismob.consecutiveDay(true);
bd.consecutiveDay(true);

// iot.setPeriodOfDay("AM");
// sismob.setPeriodOfDay("AM");
// bd.setPeriodOfDay("AM");

var subject = [];





// TRIENNALE
// INFO MAN
// subject.push(di);
// subject.push(ea);
subject.push(am);
subject.push(bd);

// INFO TRIENNALE
subject.push(p);
// subject.push(o);
// subject.push(cn);


// MAGISTRALE
subject.push(cbd);
// subject.push(uux);
// subject.push(gmb)
// subject.push(ap);
// subject.push(isos);
subject.push(fsc);
// subject.push(sds);
subject.push(iot);
subject.push(sismob);
subject.push(siswir)

for(var i=0;i<subject.length;i++){
    subject[i].splitDurationLessons6h(3);
}

iot.splitDurationLessons6h(2);
// sismob.splitDurationLessons6h(4);


/**
 * 
 * 
 */
// function splitLessons(arrayLesson){
//     var subName="";
//     var subHours=0;
//     var result=[];
//     for (var i=0;i<arrayLesson.length;i++){
//             subHours=arrayLesson[i].getWeeksHours();
//             subName=arrayLesson[i].getName();
//             console.log("-------"+subName+"   "+subHours+"------------");
//             var randomClassroom = classrooms[Math.floor(Math.random() * classrooms.length)];
//             if(subHours<4){
//                 var newL=new Lesson("Monday", subName, 9, 9+DURATION_LESSON, randomClassroom);
//                 result.push(newL);
//             }
//             else if(subHours==4){
//                 var newL1=new Lesson("Monday", subName, 9, 11, randomClassroom);
//                 var newL2=new Lesson("Monday", subName, 9, 11, randomClassroom);
//                 result.push(newL1);
//                 result.push(newL2);
//             }else if(subHours==5){
//                 var newL1=new Lesson("Monday", subName, 9, 11, randomClassroom);
//                 var newL2=new Lesson("Monday", subName, 9, 12, randomClassroom);
//                 result.push(newL1);
//                 result.push(newL2);
//             }
//             else{
//                 if(arrayLesson[i].getSplitDuration()==2){
//                 var newL1=new Lesson("Monday", subName, 9, 11, randomClassroom);
//                 var newL2=new Lesson("Monday", subName, 9, 11, randomClassroom);
//                 var newL3=new Lesson("Monday", subName, 9, 11, randomClassroom);
//                 result.push(newL1);
//                 result.push(newL2);
//                 result.push(newL3);
//                 }else if(arrayLesson[i].getSplitDuration()==3){
//                 var newL1=new Lesson("Monday", subName, 9, 12, randomClassroom);
//                 var newL2=new Lesson("Monday", subName, 9, 12, randomClassroom);
//                 result.push(newL1);
//                 result.push(newL2);
//                 }
//                 else{
//                 var newL1=new Lesson("Monday", subName, 9, 11, randomClassroom);
//                 var newL2=new Lesson("Monday", subName, 9, 13, randomClassroom);
//                 result.push(newL1);
//                 result.push(newL2);
//                 }
//             }
//           }

//         return result;
//     }