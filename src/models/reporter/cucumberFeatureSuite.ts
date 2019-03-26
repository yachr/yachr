import { ICucumberFeature } from './cucumberFeature';

/**
 * The Cucumber test reporter will produce `ICucumberResult`.
 * for each Feature tested. As so this class acts to emulate this behaviour
 */
export interface ICucumberFeatureSuite {
  features: ICucumberFeature[];
}
