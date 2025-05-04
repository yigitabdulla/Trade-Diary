import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, InputAdornment, TextFieldProps, SelectChangeEvent } from '@mui/material';
import { DatePicker } from '@mui/lab'; // Assuming you're using Material UI Lab for DatePicker

const TradeModal = ({ open, handleClose, isDarkMode }: { open: boolean; isDarkMode: boolean; handleClose: () => void }) => {
    const [parity, setParity] = useState('');
    const [entryPrice, setEntryPrice] = useState<number | string>('');
    const [stopLoss, setStopLoss] = useState<number | string>('');
    const [takeProfit, setTakeProfit] = useState<number | string>('');
    const [tradeDate, setTradeDate] = useState<Date | null>(null);
    const [value, setValue] = useState<number | string>('');
    const [resultType, setResultType] = useState<'stop' | 'success'>('stop');

    const handleResultTypeChange = (event: SelectChangeEvent) => {
        setResultType(event.target.value as 'stop' | 'success');
    };

    // Reset form when modal closes
    useEffect(() => {
        if (!open) {
            setParity('');
            setEntryPrice('');
            setStopLoss('');
            setTakeProfit('');
            setResultType('stop');
            setTradeDate(null);
            setValue('');
        }
    }, [open]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'parity') setParity(value);
        if (name === 'entry_price') setEntryPrice(value);
        if (name === 'stop_loss') setStopLoss(value);
        if (name === 'take_profit') setTakeProfit(value);
        if (name === 'value') setValue(value);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateString = e.target.value;
        if (dateString) {
            setTradeDate(new Date(dateString)); // Parse string to Date
        } else {
            setTradeDate(null); // Handle empty input
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simple validation: Ensure all fields are filled
        if (!parity || !entryPrice || !stopLoss || !takeProfit || !value || !tradeDate) {
            alert('Please fill in all fields');
            return;
        }

        // Submit the form
        const tradeData = {
            parity,
            entry_price: Number(entryPrice),
            stop_loss: Number(stopLoss),
            take_profit: Number(takeProfit),
            result_type: resultType,
            trade_date: tradeDate,
            value: Number(value),
        };

        console.log(tradeData)
        handleClose();
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: isDarkMode ? '#333' : 'background.paper',
        color: isDarkMode ? '#fff' : 'black',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    };

    const formRowStyle = {
        marginBottom: 2,
    };

    const fieldStyle = {
        backgroundColor: isDarkMode ? 'gray' : 'whitesmoke',
        color: isDarkMode ? 'whitesmoke' : 'black',
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="trade-modal-title"
            aria-describedby="trade-modal-description"
        >
            <Box sx={style}>
                <h2>Trade Form</h2>
                <form onSubmit={handleSubmit}>
                    <Box sx={formRowStyle}>
                        <TextField
                            fullWidth
                            label="Parity"
                            name="parity"
                            value={parity}
                            onChange={handleInputChange}
                            required
                            style={fieldStyle}
                        />
                    </Box>

                    <Box sx={formRowStyle}>
                        <TextField
                            fullWidth
                            label="Entry Price"
                            name="entry_price"
                            type="number"
                            value={entryPrice}
                            onChange={handleInputChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            required
                        />
                    </Box>

                    <Box sx={formRowStyle}>
                        <TextField
                            fullWidth
                            label="Stop Loss"
                            name="stop_loss"
                            type="number"
                            value={stopLoss}
                            onChange={handleInputChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            required
                        />
                    </Box>

                    <Box sx={formRowStyle}>
                        <TextField
                            fullWidth
                            label="Take Profit"
                            name="take_profit"
                            type="number"
                            value={takeProfit}
                            onChange={handleInputChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            required
                        />
                    </Box>

                    <Box sx={formRowStyle}>
                        <FormControl fullWidth required>
                            <InputLabel>Result Type</InputLabel>
                            <Select
                                value={resultType}
                                onChange={handleResultTypeChange}
                                label="Result Type"
                            >
                                <MenuItem value="stop">Stop</MenuItem>
                                <MenuItem value="success">Success</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={formRowStyle}>
                        <TextField
                            fullWidth
                            label="Trade Date"
                            type="date"
                            // Format Date object to 'YYYY-MM-DD' string for input value
                            value={tradeDate ? tradeDate.toISOString().split('T')[0] : ''}
                            onChange={handleDateChange}
                            InputLabelProps={{ shrink: true }} // Keep label floated
                            required
                        />
                    </Box>

                    <Box sx={formRowStyle}>
                        <TextField
                            fullWidth
                            label="Value"
                            name="value"
                            type="number"
                            value={value}
                            onChange={handleInputChange}
                            required
                        />
                    </Box>

                    <Box sx={formRowStyle}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Submit Trade
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default TradeModal;
