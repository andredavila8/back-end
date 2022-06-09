interface IErrands {
    id: number;
    description?: string;
    detail?: string
}

export const errands: Array<IErrands> = [
    {
        id: 0,
        description: 'descricao foda',
        detail: 'destalhe foda',
    },
    {
        id: 1,
        description: 'tamandua',
        detail: 'azul',
    },
];