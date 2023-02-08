const app = require('./app')
const parseArgs = require('minimist');
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const args = parseArgs(process.argv.slice(2));

const FORK = args.FORK;
const CLUSTER = args.CLUSTER;

const PORT = args.p || 3000 

const runServer = (PORT) => {
    app.listen(PORT, () => console.info(`Server up on port ${PORT}`))
};

if(CLUSTER){
    if (cluster.isMaster){
        console.log(`${process.pid} running`);

        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} finished`);
        cluster.fork();
        });
    }else{
        console.log(`${process.pid} running`);
        runServer(PORT);
    }
}else{
    runServer(PORT);
}