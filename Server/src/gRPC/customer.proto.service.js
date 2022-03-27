const { v4: uuidv4 } = require('uuid');
const grpc = require('grpc');

const customers = [{
        id: 'a68b823c-7ca6-44bc-b721-fb4d5312cafc',
        name: 'John Bolton',
        age: 23,
        address: 'Address 1'
    },
    {
        id: '34415c7c-f82d-4e44-88ca-ae2a1aaa92b7',
        name: 'Mary Anne',
        age: 45,
        address: 'Address 2'
    }
];

exports.getAllCustomer = (call, callback) => {
    callback(null, { customers });
};
exports.getCustmer = (call, callback) => {
    const customer = customers.find((n) => n.id == call.request.id);

    if (customer) {
        callback(null, customer);
    } else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: 'Not found'
        });
    }
};

exports.insertCustmer = (call, callback) => {
    const customer = call.request;

    customer.id = uuidv4();
    customers.push(customer);
    callback(null, customer);
};

exports.updateCustmer = (call, callback) => {
    const existingCustomer = customers.find((n) => n.id == call.request.id);

    if (existingCustomer) {
        existingCustomer.name = call.request.name;
        existingCustomer.age = call.request.age;
        existingCustomer.address = call.request.address;
        callback(null, existingCustomer);
    } else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: 'Not found'
        });
    }
};

exports.removeCustmer = (call, callback) => {
    const existingCustomerIndex = customers.findIndex((n) => n.id == call.request.id);

    if (existingCustomerIndex != -1) {
        customers.splice(existingCustomerIndex, 1);
        callback(null, {});
    } else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: 'Not found'
        });
    }
};