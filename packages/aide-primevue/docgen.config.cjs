module.exports = {
    componentsRoot: './src/components',
    components: '**/*.vue',
    ignore: ['**/Base*.vue'],
    outFile: './docs/components.md',
    apiOptions: {
        addScriptHandlers: [
            function (
                documentation,
                componentDefinition,
                astPath,
                opt
            ) {
                const componentDoc = astPath.tokens.filter(token => token.type === 'CommentBlock' && token.value.includes('@component')).find(() => true);
                if (componentDoc) {
                    const lines = componentDoc.value.split('\n');

                    documentation.set('description', lines.filter(line => !line.includes('@component')).map(line => line.substring(componentDoc.loc.indent)).join('\n'));
                }
            }
        ]
    },
    templates: {
        props: (props) => {
            return `
## Props
| Prop name     | Description | Type      | Default     |
| ------------- | ----------- | --------- | ----------- |
${props.map(prop => '|' + [
                prop.name,
                prop.description?.replaceAll('\n', ' '),
                '`' + prop.type.name + (!!prop.type.elements?.length ? `&lt;${prop.type.elements[0].name}&gt;` : '') + '`',
                prop.defaultValue?.value ?? '',
            ].join(' | ') + '|').join('\n')}
            `;
        }
    }
};
