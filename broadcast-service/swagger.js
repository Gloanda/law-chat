const swaggerAutogen = require('swagger-autogen')

require("dotenv").config();

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/*.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "Broadcast Service API",
        description: "Broadcasts to Users in Contacts"
    },
    host: `localhost:${process.env.PORT}`,
    basePath: "/api/broadcast",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Broadcast",
            "description": ""
        }
    ],
    definitions: {
        Sender: {
            type: 1,
            ref: "Simon Doe",
            required: true,
        },
        Users: {
            user: ["Simon Doe", "Doe Simon"]
        },
        Message: {
            message: "Message"
        },
        Timestamp:{
            timestamp:true
        },
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js')
})