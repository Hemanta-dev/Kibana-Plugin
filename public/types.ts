import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';

export interface HemantaPluginSetup {
  getGreeting: () => string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HemantaPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}
