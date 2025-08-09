export function makeProduct(payload) {
    const required = ['title','description','code','price','stock','category','status'];
    for (const k of required) {
        if (payload[k] === undefined) throw new Error(`Missing field: ${k}`);
    }
    return {
        id: payload.id,
        title: String(payload.title),
        description: String(payload.description),
        code: String(payload.code),
        price: Number(payload.price),
        status: Boolean(payload.status),
        stock: Number(payload.stock),
        category: String(payload.category),
        thumbnails: Array.isArray(payload.thumbnails) ? payload.thumbnails.map(String) : []
    };
}
