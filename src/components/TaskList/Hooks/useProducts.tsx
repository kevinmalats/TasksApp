import { useState, useEffect } from 'react';

export default function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            .then((json) => {
            setProducts(json);
            })
            .catch((err) => {
            setError(err);
            })
            .finally(() => {
            setLoading(false);
            });
    }, []);
    return {
        products,
        loading,
        error,
    };
}