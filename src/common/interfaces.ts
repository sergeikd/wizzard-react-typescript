export interface IEntity {
    id: number;
    name: string;
    brandId?: number;
    availableEngineIds?: number[];
    availableGearsIds?: number[];
}

export interface IPages {
    title: string;
    entity: string;
}