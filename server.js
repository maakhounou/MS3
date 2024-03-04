const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Données de test pour simuler une base de données
const etudiant = [
    { id: '1', name: 'Sy', lastname:'Maakhou', adresse:'Plateau', telephone: '777935230' },
    // ... ajoutez d'autres étudiants
];

// Définition du schéma GraphQL
const typeDefs = gql`
  type Etudiant {
    id: ID!
    name: String!
    lastname: String!
    adresse: String!
    telephone: String!
  }

  type Query {
    etudiant: [Etudiant]
    etudiantCount: Int
  }
`;

// Résolveurs GraphQL
const resolvers = {
    Query: {
        etudiant: () => etudiant,
        etudiantCount: () => etudiant.length,
    },
};

// Configuration du serveur Apollo GraphQL
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

// Ajout de await server.start() avant server.applyMiddleware()
async function startServer() {
    await server.start();
    server.applyMiddleware({ app });
}

// Démarrage du serveur en appelant startServer()
const PORT = 3000;
startServer().then(() => {
    app.listen(PORT, () => {
        console.log(`Serveur GraphQL démarré sur http://localhost:${PORT}${server.graphqlPath}`);
    });
});
