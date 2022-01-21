export default ({ app }, inject) => {

    inject('renderEmpty', (parentElement) => {
        parentElement.innerHTML = '';
    });

    inject('renderText', (text, options) => {
        const { parentElement, replaceContents } = options;

        const textElement = document.createElement('pre');
        textElement.innerHTML = text;

        if (parentElement) {
            if (replaceContents) parentElement.innerHTML = '';
            parentElement.appendChild(textElement);
        }
        return textElement;
    });
    
    let viz = new Viz();
    inject('renderDiagram', async (diagram, options) => {
        const { parentElement, replaceContents } = options;

        try {
            const element = await viz.renderSVGElement(`digraph { ${diagram} }`);

            if (parentElement) {
                if (replaceContents) parentElement.innerHTML = '';
                parentElement.appendChild(element);
            }

            return element;
        } catch(ex) {
            // Create a new Viz instance (@see Caveat page for more info)
            viz = new Viz();
            // Display the error.
            console.error(ex);

            return app.$renderText("Could not render diagram.\n" + ex, options);
        }
    });

}