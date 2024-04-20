// actions.js
export const fetchListingsRequest = () => ({
    type: 'FETCH_LISTINGS',
    payload: fetch('https://dummyjson.com/users').then(response => response.json()),
});

export const fetchListingsSuccess = (listings) => ({
    type: 'FETCH_LISTINGS_SUCCESS',
    payload: listings,
});

export const fetchListingsFailure = (error) => ({
    type: 'FETCH_LISTINGS_FAILURE',
    payload: error,
});
