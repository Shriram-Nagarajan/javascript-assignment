const connector = require("./database/connector");

process.on("exit", () => {
    connector.releaseAll((err) => {
        if(err){
            console.error("Error occurred while releasing connections: ", err);
        }
    });
});