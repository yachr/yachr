import { IScenario } from './scenario';
import { ITag } from './tag';

/**
 * Defines the data model for the results of a running
 * tests on a Cucumber Feature
 */
export interface ICucumberFeature {
    uri: string;
    keyword: string;
    id: string;
    name: string;
    line: number;
    description: string;
    tags: ITag[];

    // Synonomous to scenarios
    elements: IScenario[];
}
