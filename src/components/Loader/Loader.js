import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import theme from '../../config/theme';
import './styles.css';

// brackets mean implicit return
const Loader = () => (
    <div className="loader-wrapper">
        <CircularProgress color={theme.palette.alternateTextColor} />
    </div>
);

export default Loader;
