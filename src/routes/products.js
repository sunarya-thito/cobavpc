const express = require('express');
const router = express.Router();
const pool = require('../db');

// CREATE: Tambah produk
router.post('/', async (req, res) => {
    const { nama, harga } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO products (nama, harga) VALUES ($1, $2) RETURNING *',
            [nama, harga]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Gagal menambahkan produk' });
    }
});

// READ: Dapatkan semua produk
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Gagal mendapatkan produk' });
    }
});

// READ: Dapatkan produk berdasarkan ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Produk tidak ditemukan' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Gagal mendapatkan produk' });
    }
});

// UPDATE: Ubah produk berdasarkan ID
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { nama, harga } = req.body;
    try {
        const result = await pool.query(
            'UPDATE products SET nama = $1, harga = $2 WHERE id = $3 RETURNING *',
            [nama, harga, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Produk tidak ditemukan' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Gagal mengubah produk' });
    }
});

// DELETE: Hapus produk berdasarkan ID
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Produk tidak ditemukan' });
        }
        res.status(200).json({ message: 'Produk berhasil dihapus' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Gagal menghapus produk' });
    }
});

module.exports = router;
