const grpc = require('grpc');
const path = require('path');
const PROTO_PATH = path.join(__dirname, '../protos/customer.proto');
const protoLoader = require('@grpc/proto-loader');
const customerService = require('./customer.proto.service');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const customerProtoMethods = {
    getAll: customerService.getAllCustomer,
    get: customerService.getCustmer,
    insert: customerService.insertCustmer,
    update: customerService.updateCustmer,
    remove: customerService.removeCustmer
};

const customerProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();
server.addService(customerProto.customerService.service, customerProtoMethods);
server.bind('127.0.0.1:30043', grpc.ServerCredentials.createInsecure());
exports.gRPCserver = server;