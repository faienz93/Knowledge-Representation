# Ontologia
## Cos'è un ontologia
- In informatica, un'ontologia è una rappresentazione formale, condivisa ed esplicita di una concettualizzazione di un dominio di interesse.
- Un ramo della metafisica interessato alla natura e alle relazioni tra gli oggetti.
- Una raccolta di informazioni, generalmente per lo più informazioni su classi e proprietà.

Un'ontologia sarà costituita da 
- classi
    - per esempio, *persona*, *animale domestico*, *vecchio* 
    - una collezione di individui (*oggetto*, *cose*, ...) 
    - un modo di descrivere parte del mondo 
    - un oggetto nel mondo (OWL Full)
- proprietà
    - ad esempio,  *has_father*, *has_pet*, *service_number*
    - una raccolta di relazioni tra individui (e dati) 
    - un modo di descrivere un tipo di relazione tra individui 
    - un oggetto nel mondo (OWL Full)
- individui
    - gli oggetti nel mondo 
    - appartengono alle classi 
    - sono correlati ad altri oggetti e ai valori dei dati tramite proprietà

## Definizione dell'ontologia

### Class
- Person
- Teacher
- Discipline
- ClassRoom
- Preference
- Course Name
    
### Properties

#### Data Properties
- Teacher
    - ID Professor 
    - First Name
    - Last Name    
    - Role
- Discipline
    - ID Discipline
    - Discipline Abbreviation
    - Discipline name
    - Semester
    - Obligatory
    - Curriculum   
    - TotalHours    
    - WeekHours
    - CFU
    - Year
    - Num students
- ClassRoom
    - ID room
    - Class Room Name
    - Address
    - Capacity
    - Blackboard
    - Wired
- Course
    - ID Course
    - Course Name
- Preferences
    - ID teacher
    - How to split 6 hours Discipline
    - Consecutive days start week or end week
    - No lesson day 1
    - No lesson day 2
    - No lesson morning or afternnon
    - How to write in the classroom

#### Object Properties
- Discipline 
    - *hasCourseof* - Course
    - *isTaughtBy* - Teacher
    - *Is Preference Of* - Teacher



## Definizione di un'Ontologia
Per definire un'ontologia: 
- Scaricare e installare [Protégé](https://protegewiki.stanford.edu/wiki/Protege4GettingStarted#Download)
- Dalla [Protégé Ontology Library](https://protegewiki.stanford.edu/wiki/Protege_Ontology_Library) selezionare [Institutional Ontology](http://www.isibang.ac.in/~bisu/ontology/instOntology.owl). 
- importare l'ontologia scaricata nel software e aggiungere nuove instanze, come suggerisce la [guida](https://protegewiki.stanford.edu/wiki/Protege4GettingStarted). 
