import type { Plugin } from 'postcss';

/**
 * This plugin basically removes duplicate @charset tags in the final CSS file as well as remove those legacy IE hacks.
 */
export function cssModification(): Plugin {
    let foundCharsetRule = false;

    return {
        postcssPlugin: 'crm-platform:css-modification',
        AtRule: {
            // There is a bug in the version of SASS we use that is adding the charset multiple times, so remove them
            // We are also not able to upgrade it because Quasar requires that version
            charset: (atRule) => {
                if (atRule.name === 'charset') {
                    if (!foundCharsetRule) {
                        atRule.remove();
                    }

                    foundCharsetRule = true;
                }
            },
        },
        Declaration: (declaration) => {
            // Don't need those IE hacks
            if (declaration.raws.before?.startsWith('*')) {
                declaration.remove();
            }
        },
    };
}
