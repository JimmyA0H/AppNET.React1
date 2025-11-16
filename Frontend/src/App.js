import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:63257/api/products";

function App() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ id: 0, name: "", price: "" });
    const [editing, setEditing] = useState(false);

    const loadProducts = async () => {
        const res = await axios.get(API_URL);
        setProducts(res.data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const createProduct = async () => {
        await axios.post(API_URL, {
            name: form.name,
            price: Number(form.price),
        });
        setForm({ id: 0, name: "", price: "" });
        loadProducts();
    };

    const startEdit = (p) => {
        setEditing(true);
        setForm({ id: p.id, name: p.name, price: p.price });
    };

    const updateProduct = async () => {
        await axios.put(`${API_URL}/${form.id}`, {
            name: form.name,
            price: Number(form.price),
        });
        setEditing(false);
        setForm({ id: 0, name: "", price: "" });
        loadProducts();
    };

    const deleteProduct = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        loadProducts();
    };

    return (
        <div className="container">
            <h1 className="title">Gestion de Productos</h1>

            <div className="card">
                <h2>{editing ? "Editar Producto" : "Nuevo Producto"}</h2>

                <input
                    name="name"
                    placeholder="Nombre del producto"
                    value={form.name}
                    onChange={handleChange}
                    className="input"
                />

                <input
                    name="price"
                    placeholder="Precio"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    className="input"
                />

                {!editing ? (
                    <button className="btn primary" onClick={createProduct}>Guardar</button>
                ) : (
                    <>
                        <button className="btn primary" onClick={updateProduct}>Actualizar</button>
                        <button className="btn danger"
                            onClick={() => { setEditing(false); setForm({ id: 0, name: "", price: "" }); }}>
                            Cancelar
                        </button>
                    </>
                )}
            </div>

            <div className="card">
                <h2>Lista de Productos</h2>

                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.name}</td>
                                <td>${p.price}</td>
                                <td>
                                    <button className="btn edit" onClick={() => startEdit(p)}>Editar</button>
                                    <button className="btn danger"
                                        onClick={() => deleteProduct(p.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default App;
