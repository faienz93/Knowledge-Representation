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
        - Contract_Professor
        - Ordinary_Professor
        - Associate_Professor

- Course Name
    - Undergraduate_Course
        - Informatica Triennale
        - Informatica Per il Management
    - Postgraduate_Course
        - Informatica Magistrale - CURRICULUM A: TECNICHE DEL SOFTWARE
        - Informatica Magistrale - CURRICULUM B: INFORMATICA PER IL MANAGEMENT
        - Informatica Magistrale - CURRICULUM C: SISTEMI E RETI
                            

- Discipline
- ClassRoom


### Properties

#### Data Properties
- Person
    - First Name
    - Last Name
    - Roll Number 
- Discipline
    - obligatory
    - cfu
    - totalHours
    - semester
    - weekHours
    - Roll Number
- ClassRoom
    - capacity
    - wired
    - wifi
    - Roll Number
    - Address

#### Object Properties
- Discipline 
    - *hasCourseof* - Course_Name
    - ]*isTaughtBy* - Teacher

### Instances
- Informatica Triennale
    - Informatica Triennale 1 anno
    - Informatica Triennale 2 anno
    - Informatica Triennale 3 anno

- Informatica Per il Management
    - Informatica Per il Management 1 anno
    - Informatica Per il Management 2 anno
    - Informatica Per il Management 3 anno

- Informatica Magistrale - CURRICULUM A: TECNICHE DEL SOFTWARE
    - Informatica Magistrale - CURRICULUM A: TECNICHE DEL SOFTWARE 1 anno 
    - Informatica Magistrale - CURRICULUM A: TECNICHE DEL SOFTWARE 2 anno

- Informatica Magistrale - CURRICULUM B: INFORMATICA PER IL MANAGEMENT
    - Informatica Magistrale - CURRICULUM B: INFORMATICA PER IL MANAGEMENT 1 anno 
    - Informatica Magistrale - CURRICULUM B: INFORMATICA PER IL MANAGEMENT 2 anno

- Informatica Magistrale - CURRICULUM C: SISTEMI E RETI
    - Informatica Magistrale - CURRICULUM C: SISTEMI E RETI 1 anno 
    - Informatica Magistrale - CURRICULUM C: SISTEMI E RETI 2 anno

## Definizione di um'Ontologia
Per la definizione della nostra ontologia si è 
- Scaricato e installato [Pròtegé](https://protegewiki.stanford.edu/wiki/Protege4GettingStarted#Download)
- Dalla [Protegé Ontology Library](https://protegewiki.stanford.edu/wiki/Protege_Ontology_Library) si è selezionato [Institutional Ontology](http://www.isibang.ac.in/~bisu/ontology/instOntology.owl). 
