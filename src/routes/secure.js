const express = require('express');
const router = express.Router();
const mysqlConnection = require('../config/connection');
const fs = require('fs');
const validator = require('validator');
const passport = require('passport');

//Get customers
router.get('/getCustomers', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    mysqlConnection.query("select * from customer", (err, rows, fields) => {
        if(!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    })
});

//Add customer
router.post('/addCustomer', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let data = req.body;
    let sqlStatement = `INSERT INTO customer (firstName, lastName, street, city, zip) VALUES ('${validator.escape(validator.trim(data.firstName))}', '${validator.escape(validator.trim(data.lastName))}', '${validator.escape(validator.trim(data.street))}', '${validator.escape(validator.trim(data.city))}', '${validator.escape(validator.trim(data.zip))}')`;
    mysqlConnection.query(sqlStatement, function (err, result) {
        if(err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

//Get user information for all users with a specific plan while it is still active
router.get('/activePlan/:plan', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let plan = validator.escape(validator.trim(req.params.plan));
    const plans = ['Bronze', 'Silver', 'Gold', 'Platinum'];
    if(plans.find(e => (e.toUpperCase() == String(plan.toUpperCase())))) {
        let sqlStatement = `select c.customerID, c.firstName, c.lastName, contract.planName, contract.contractNumber, contract.startDate, contract.endDate from customer c join contract on c.customerID = contract.customerID where contract.planName = '${plan}' and contract.endDate >= current_date() order by contract.customerID asc;`;
        mysqlConnection.query(sqlStatement, (err, rows, fields) => {
            if(!err) {
                res.send(rows);
            }
            else {
                console.log(err);
            }
        })
    } else {
        res.status(404).send("Plan not found.");
    }
});

//Get total minutes used by contracts with a specific phone model
router.get('/getMins/:model', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let model = validator.escape(validator.trim(req.params.model));
    let sqlStatement = `select c.contractNumber, c.phoneNum, c.planName, sum(mu.minuteUsed) as minutesUsed from contract c join minuteusage mu using(contractNumber) where c.phoneSerialNumber IN (SELECT phoneSerialNumber from phone where phoneModel like '%${model}%') group by 1, 2 order by c.contractNumber asc;`;
    mysqlConnection.query(sqlStatement, (err, rows, fields) => {
        if(!err) {
            res.send(rows);
        }
        else {
            res.status(500).send("Error.");
        }
    });
});

//Get total data used by contracts with a specific phone model
router.get('/getData/:model', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let model = validator.escape(validator.trim(req.params.model));
    let sqlStatement = `select c.contractNumber, c.phoneNum, c.planName, sum(mu.dataUsed) as dataUsed from contract c join datausage mu using(contractNumber) where c.phoneSerialNumber IN (SELECT phoneSerialNumber from phone where phoneModel like '%${model}%') group by 1, 2 order by c.contractNumber asc;`;
    mysqlConnection.query(sqlStatement, (err, rows, fields) => {
        if(!err) {
            res.send(rows);
        }
        else {
            res.status(500).send("Error.");
        }
    });
});

//Get total messages used by contracts with a specific phone model
router.get('/getMes/:model', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let model = validator.escape(validator.trim(req.params.model));
    let sqlStatement = `select c.contractNumber, c.phoneNum, c.planName, sum(mu.messageUsed) as messagesUsed from contract c join messageusage mu using(contractNumber) where c.phoneSerialNumber IN (SELECT phoneSerialNumber from phone where phoneModel like '%${model}%') group by 1, 2 order by c.contractNumber asc;`;
    mysqlConnection.query(sqlStatement, (err, rows, fields) => {
        if(!err) {
            res.send(rows);
        }
        else {
            res.status(500).send("Error.");
        }
    });
});

//Get monthly usage for all contracts for a specific customer id
router.get('/monthlyUsage/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let id = parseInt(req.params.id);
    let sqlStatement = `select cu.customerID as customerID, c.contractNumber, c.phoneNum, datausage.dataUsed as dataUsed, minuteusage.minuteUsed as minutesUsed, messageusage.messageUsed as messagesUsed, datausage.referenceDate as refDate from contract c join datausage on c.contractNumber = datausage.contractNumber join minuteusage on datausage.referenceDate = minuteusage.referenceDate and c.contractNumber = minuteusage.contractNumber join messageusage on datausage.referenceDate = messageusage.referenceDate and c.contractNumber = messageusage.contractNumber join customer cu on c.customerID = cu.customerID where c.customerID = ${id} order by contractNumber, refDate asc;`;
    mysqlConnection.query(sqlStatement, (err, rows, fields) => {
        if(!err) {
            res.send(rows);
        }
        else {
            res.status(500).send("Error.");
        }
    });
});

//Get additional data addons
router.get('/getAddData', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let sqlStatement = `select * from additionaldata order by additionalData;`;
    mysqlConnection.query(sqlStatement, (err, rows, fields) => {
        if(!err) {
            res.send(rows);
        }
        else {
            res.status(500).send("Error.");
        }
    });
});

//Get additional minute addons
router.get('/getAddMin', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let sqlStatement = `select * from additionalMinutes order by additionalminutes;`;
    mysqlConnection.query(sqlStatement, (err, rows, fields) => {
        if(!err) {
            res.send(rows);
        }
        else {
            res.status(500).send("Error.");
        }
    });
});

//Get additional message addons
router.get('/getAddMes', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let sqlStatement = `select * from additionalMessages order by additionalmessage;`;
    mysqlConnection.query(sqlStatement, (err, rows, fields) => {
        if(!err) {
            res.send(rows);
        }
        else {
            res.status(500).send("Error.");
        }
    });
});

//Modify additional data addons
router.put('/changeAddData', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let newInfo = req.body;
    let feature = validator.escape(validator.trim(newInfo.featureType));
    const features = ['data1', 'data2', 'data5', 'data10'];
    if(features.find(e => (e.toUpperCase() == String(feature.toUpperCase()))) && parseInt(newInfo.value) != NaN && parseInt(newInfo.value) >= 0) {
        let sqlStatement = `UPDATE additionaldata SET additionalData = ${parseInt(newInfo.value)} WHERE featureType = '${feature}';`;
        mysqlConnection.query(sqlStatement, function (err, result) {
            if(err) {
                throw err;
            } else {
                res.send(newInfo);
            }
        });
    } else {
        res.status(404).send("Error");
    }
});

//Modify additional minutes addons
router.put('/changeAddMin', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let newInfo = req.body;
    let feature = validator.escape(validator.trim(newInfo.featureType));
    const features = ['min100', 'min200', 'min500', 'min1000'];
    if(features.find(e => (e.toUpperCase() == String(feature.toUpperCase()))) && parseInt(newInfo.value) != NaN && parseInt(newInfo.value) >= 0) {
        let sqlStatement = `UPDATE additionalminutes SET additionalMinutes = ${parseInt(newInfo.value)} WHERE featureType = '${feature}';`;
        mysqlConnection.query(sqlStatement, function (err, result) {
            if(err) {
                throw err;
            } else {
                res.send(newInfo);
            }
        });
    } else {
        res.status(404).send("Error");
    }
});

//Modify additional messages addons
router.put('/changeAddMes', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let newInfo = req.body;
    let feature = validator.escape(validator.trim(newInfo.featureType));
    const features = ['mes200', 'mes500', 'mes1000', 'mes2000'];
    if(features.find(e => (e.toUpperCase() == String(feature.toUpperCase()))) && parseInt(newInfo.value) != NaN && parseInt(newInfo.value) >= 0) {
        let sqlStatement = `UPDATE additionalmessages SET additionalmessage = ${parseInt(newInfo.value)} WHERE featureType = '${feature}';`;
        mysqlConnection.query(sqlStatement, function (err, result) {
            if(err) {
                throw err;
            } else {
                res.send(newInfo);
            }
        });
    } else {
        res.status(404).send("Error");
    }
});

module.exports = router; 