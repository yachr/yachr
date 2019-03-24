import { IElement } from './element';
import { ITag } from './tag';

// Defines the data model for a Cucumber results
// The output produced by cucumber will produce an array of ICucumberResult
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
