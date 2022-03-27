const grpc = require('grpc');
const path = require('path');
const PROTO_PATH = path.join(__dirname, './protos/customer.proto');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});


const CustomerService = grpc.loadPackageDefinition(packageDefinition).customerService
const client = new CustomerService(
    "localhost:30043",
    grpc.credentials.createInsecure()
);

client.getAll(null, (err, data) => {
    if (!err) {
        console.log(data);
    }
});
exports.gRPCserver = client;