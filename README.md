# ENEXSE_TEST
# Test Node.js ENEXSE
** Remarque:
Dans l'énoncé il est demandé " Pour PUT, utiliser l’end-point /api/v1/{name}"
Néanmoins, nous pensons que pour l'efficacité de la requête, utiliser l'id serait plus judicieux, car il est unique pour chaque agent, contrairement au nom qui peut être commun à plusieurs agents

## Prérequis
Afin de pouvoir lancer convenablement le projet vous aurais besoin au préalable de node.js, MongoDB

## les Scripts
Dans le dossier du projet vous pourrez faire

### `yarn install` or `npm install` Pour installer toutes les librairy

Puis faire 

### `yarn start` or `npm start` pour lancer l'application

Le projet est divisé en plusieurs parties,
- Le serveur (fichier server.js) contenant le serveur node ainsi que la définition des ports
- L'application express app.js (dans le dossier App) contenant le middleware app 
- La logique de rooting dans le dossier routes fichier agent.js
- Le modèle de données dans le dossier models fichier agent.js
- Le contrôleur dans le dossier controller fichier  agent.js

## Les requetes Postman
- Pour récupérer tous les agents :
` http://localhost:4000/api/v1/agents `
- Pour ajouter un agent:
`http://localhost:4000/api/v1/agent`
dans le body :  {   
                "name": "sadio",
                "id": "000"
                }

- Pour modifier un agent:
`http://localhost:4000/api/v1/sadio`
dans le body:  
{
        "_id": "6393a6aa2f7f08221b754b56",
        "os": "MacOS operating system",
        "dateAdd": "2022-12-09 22:20:42.011",
        "ip": "192.168.1.69",
        "name": "sadio",
        "id": "000",
        "version": "1.0.0",
        "status": "never_connected",
        "__v": 0
    }

- Pour supprimer un agent:
`http://localhost:4000/api/v1/6393a6aa2f7f08221b754b56`
