import { IElement } from './element';
import { ITag } from './tag';

// Defines the data model for a Cucumber results

export interface ICucumberResult {
    uri: string
    keyword: string
    id: string
    name: string
    line: number
    description: string
    tags: ITag[]

    // Synonomous to scenarios
    elements: IElement[]

}
