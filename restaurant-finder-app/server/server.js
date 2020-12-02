const connector = require("./database/connector");
require("./controller/controller");
process.on("exit", () => {
    connector.releaseAll((err) => {
        if(err){
            console.error("Error occurred while releasing connections: ", err);
        }
    });
});