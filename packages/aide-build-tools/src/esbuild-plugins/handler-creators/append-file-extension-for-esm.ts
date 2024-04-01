import { appendFileExtensionForImports } from '@src/esbuild-plugins/handler-creators/append-file-extension-for-imports';
import type { ModifySourceContentsChainHandlerCreator } from '@src/esbuild-plugins/modify-source-contents-chain';

/**
 * This will append the file extension to the end of relative imports if we are building for ESM.
 *
 * @deprecated Just use `appendFileExtensionForImports` which will add it for both ESM and CJS since they'll end up
 *  needing it.
 */
export const appendFileExtensionForEsm: ModifySourceContentsChainHandlerCreator = appendFileExtensionForImports;
