import AppContainer from "./AppContainer.js";
/**
 * ENTRYPOINT - IoC container
 */
(async () => {
    console.log("===========================");
    console.log("|  APP CONTAINER STARTED  |");
    console.log("===========================\n\n");

    const app = new AppContainer();

    let count = 0;
    setInterval(async () => await app.Run(count++), 5000); //Loopdy Loop...
})();
