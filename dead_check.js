function dead_check(input) {
    const words = input.trim().split(&#39;n&#39;).filter(word =&gt; word.trim() !== &quot;&quot;);
    const container = document.querySelector(&quot;.container&quot;);
    if (!container || !container.__vue__ || !container.__vue__.getCraftResponse) {
        console.error(&quot;Container or Vue instance with getCraftResponse not found.&quot;);
        return;
    }

    const results = { Alive: [], Dead: [] };

    words.forEach(word =&gt; {
        let isAlive = false;
        const testStrings = [word, &quot;Example1&quot;, &quot;Example2&quot;, &quot;Nothing&quot;];

        for (let test of testStrings) {
            const response = container.__vue__.getCraftResponse({ text: word }, { text: test });
            if (response.result !== &quot;Nothing&quot;) {
                isAlive = true;
                break;
            }
        }

        if (isAlive) {
            results.Alive.push(word);
        } else {
            results.Dead.push(word);
        }
    });

    console.log(&quot;Alive:&quot;);
    console.log(results.Alive.join(&quot;n&quot;));

    console.log(&quot;nDead:&quot;);
    console.log(results.Dead.join(&quot;n&quot;));
}
