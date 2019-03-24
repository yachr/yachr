import { IElement } from './element';
import { ITag } from './tag';

/**
 * Defines the data model for the results of a running
 * tests on a Cucumber Feature
 */
export interface ICucumberResult {
    uri: string;
    keyword: string;
    id: string;
    name: string;
    line: number;
    description: string;
    tags: ITag[];

    // Synonomous to scenarios
    elements: IElement[];
}

/**
 * The Cucumber test reporter will produce `ICucumberResult`.
 * for each Feature tested. As so this class acts to emulate this behaviour
 */
export interface ICucumberFeatureSuite {
  features: ICucumberResult[];
}
