export function makeCart(payload) {
    return {
        id: payload.id,
        products: Array.isArray(payload.products) ? payload.products : []
    };
}
