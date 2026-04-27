const Board = require('../models/Board');

// Create Board
exports.createBoard = async (req, res) => {
    try {
        const board = await Board.create(req.body);
        res.status(201).json(board);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get All Boards
exports.getBoards = async (req, res) => {
    try {
        const boards = await Board.find();
        res.json(boards);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete Board
exports.deleteBoard = async (req, res) => {
    try {
        await Board.findByIdAndDelete(req.params.id);
        res.json({ message: 'Board deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
