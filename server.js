const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    db('accounts')
        .then(account => {
            res.status(200).json(account)
        })
        .catch(err => {
            res.status(500).json({
                message: 'Houston, we have an issue with the database'
            })
        })
});

server.get('/:id', (req,res) => {
    const { id } = req.params;
    db('accounts').select('*').where({id})
    .then(account => {
        if(account){
            res.status(200).json(account)
        }else{
            res.status(404).json({
                message: "ID not found"
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "Yeah, no, that didn't work"
        })
    })
})

server.post('/', (req,res) => {
    const body = req.body;
    db('accounts').insert(body)
    .then(account => 
        res.status(200).json(account))
    .catch(err => {
        res.status(500).json({
            message: "Yeah, no, that didn't work"
        })
    })
});

server.put('/:id', (req,res) => {
    const { id } = req.params;
    const body = req.body;

    db('accounts').where({id}).update(body)
    .then(account => {
        if(account){
            res.status(200).json({updated: account})
        } else {
            res.status(404).json({
                message: "ID not found"
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "Yeah, no, that didn't work"
        })
    })
});

server.delete('/:id', (req,res) => {
    const { id } = req.params;
    db('accounts').where({id}).del()
    .then(account => {
        if(account){
            res.status(200).json({
                message: "The account has been terminated"
            })
        } else {
            res.status(404).json({
                message: "ID not found"
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "Yeah, no, that didn't work"
        })
    })
})




module.exports = server;