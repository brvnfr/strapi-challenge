import React from 'react';
import { Box, Typography } from '@strapi/design-system';

const MyCompo = () => {
    return (
        <Box padding={4} background="neutral100">
            <Typography variant="beta">Hello from MyCompo!</Typography>
        </Box>
    );
};

export default MyCompo;
