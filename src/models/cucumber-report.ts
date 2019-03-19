import { IElement } from './element';
import { ITag } from './tag';

// Defines the data model for a Cucumber Report

export interface ICucumberReport {

    uri: string

    keyword: string
    id: string
    name: string
    line: number
    description: string
    tags: ITag[]

    elements: IElement[]

}
