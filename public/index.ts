import './index.scss';

import { HemantaPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, Kibana Platform `plugin()` initializer.
export function plugin() {
  return new HemantaPlugin();
}
export { HemantaPluginSetup, HemantaPluginStart } from './types';
