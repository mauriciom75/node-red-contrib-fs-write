fs = require('fs');

module.exports = function(RED) {
    function fsWriteNode(config) {
        RED.nodes.createNode(this,config);

        this.paths =config.paths;

        this.pathsContol = [];
        if ( config.timeout == "" )
            this.timeout = 15000;
        else
            this.timeout = Number(config.timeout);

        if ( config.finalTimeout == "" )
            this.finalTimeout = 60000;
        else
            this.finalTimeout = Number(config.finalTimeout);

        if ( this.finalTimeout < this.timeout )
            this.finalTimeout = this.timeout;

        var node = this;

        node.on('close', function() {
            
        });
        
        node.on('input', function(msg) {
            
            console.log('filename ' + msg.filename);

            if ( node.paths == "append" )
            {
                console.log('append');
                fs.appendFile(msg.filename, msg.payload, function (err) {
                    if (err) {
                        console.log('Error al appendear ' + msg.filename);
                        node.error( err, msg);
                    }
                    console.log('gabado OK.');
                    node.send(msg);
                });
            }
            else
            {
                console.log('write');
                fs.writeFile(msg.filename, msg.payload, function (err) {
                    if (err) {
                        console.log('Error al grabar ' + msg.filename);
                        node.error( err, msg);
                    }
                    console.log('gabado OK.');
                    node.send(msg);
                });
            };
        });
    }
    RED.nodes.registerType("fs-write",fsWriteNode);
}
