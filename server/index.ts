import { PluginInitializerContext } from '../../../src/core/server';
import { HemantaPlugin } from './plugin';

//  This exports static code and TypeScript types,
//  as well as, Kibana Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new HemantaPlugin(initializerContext);
}

export { HemantaPluginSetup, HemantaPluginStart } from './types';
