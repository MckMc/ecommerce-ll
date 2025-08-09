import {
    listProductsMongo, getProductById, createProductMongo,
    updateProductMongo, deleteProductMongo
} from '../services/products.mongo.service.js';

export async function getAll(req, res){
    try {
        const data = await listProductsMongo(req.query);
        res.json(data);
    } catch (e) { res.status(500).json({ status:'error', error: e.message }); }
}

export async function getOne(req,res){
    const p = await getProductById(req.params.pid);
    if(!p) return res.status(404).json({ status:'error', error:'Product not found' });
    res.json(p);
}

export async function postOne(req,res){
    try {
        const created = await createProductMongo(req.body);
        res.status(201).json(created);
    } catch(e){ res.status(400).json({ status:'error', error: e.message }); }
}

export async function putOne(req,res){
    const updated = await updateProductMongo(req.params.pid, req.body);
    if(!updated) return res.status(404).json({ status:'error', error:'Product not found' });
    res.json(updated);
}

export async function deleteOne(req,res){
    const ok = await deleteProductMongo(req.params.pid);
    if(!ok) return res.status(404).json({ status:'error', error:'Product not found' });
    res.status(204).send();
}
