const defaultState = [
    {id: 1, imageUrl: 'someurl', name: 'Plane', count: 4, size: {width: 200, height: 200}, weight: '200',
        comments:
            [
                {id: 0, description: 'text', date: new Date()},
                {id: 1, description: '3', date: new Date()},
                {id: 2, description: 'tex44t', date: new Date()},
            ]
    },
    {id: 2, imageUrl: 'someurl', name: 'Car', count: 3, size: {width: 200, height: 200}, weight: '200', comments: []},
    {id: 3, imageUrl: 'someurl', name: 'Bread', count: 4, size: {width: 200, height: 200}, weight: '200', comments: []},
    {id: 4, imageUrl: 'someurl', name: 'Toy', count: 55, size: {width: 200, height: 200}, weight: '200', comments: []},
    {id: 5, imageUrl: 'someurl', name: 'Moto', count: 62, size: {width: 200, height: 200}, weight: '200', comments: []},
    {id: 6, imageUrl: 'someurl', name: 'Bike', count: 23223, size: {width: 200, height: 200}, weight: '200', comments: []},
    {id: 7, imageUrl: 'someurl', name: 'Ship', count: 36, size: {width: 200, height: 200}, weight: '200', comments: []},
]

export const productsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            return [...state, action.payload]
        case 'DELETE_PRODUCT':
            return [...action.payload]
        case 'UPDATE_PRODUCT':
            return [...action.payload.slice()]
        default:
            return state;
    }
}