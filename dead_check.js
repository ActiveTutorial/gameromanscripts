async function dead_check(input) {
    const words = input.trim().split('\n').filter(word => word.trim() !== "");
    const container = document.querySelector(".container");
    if (!container || !container.__vue__ || !container.__vue__.getCraftResponse) {
        console.error("Container or Vue instance with getCraftResponse not found.");
        return;
    }

    const results = { Alive: [], Dead: [] };

    // Create an array of promises for each word to process
    const promises = words.map(async (word) => {
        let isAlive = false;
        const testStrings = [word, "example1", "example2", "example3"];

        for (let test of testStrings) {
            try {
                const response = await container.__vue__.getCraftResponse({ text: word }, { text: test });
                console.log(response);
                if (response.result !== "Nothing") {
                    isAlive = true;
                    break; // If alive, break out of the inner loop
                }
            } catch (error) {
                console.error('Error in getCraftResponse:', error);
            }
        }

        if (isAlive) {
            return { word, status: 'Alive' };
        } else {
            return { word, status: 'Dead' };
        }
    });

    // Wait for all promises to resolve concurrently
    const resultsArray = await Promise.all(promises);

    // Process the results and categorize them
    resultsArray.forEach(result => {
        if (result.status === 'Alive') {
            results.Alive.push(result.word);
        } else {
            results.Dead.push(result.word);
        }
    });

    // Log the results
    console.log("Alive:");
    console.log(results.Alive.join("\n"));

    console.log("\nDead:");
    console.log(results.Dead.join("\n"));
}
