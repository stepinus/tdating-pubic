import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
interface CardProps {
    imageUrl: string;
    name: string;
    age: number;
    hobby: string;
}

const CardComponent: React.FC<CardProps> = ({ imageUrl, name, age, hobby }) => {
    return (
        <Card raised sx={{width:'95vw'}}>
            <CardMedia
                component="img"
                height="100%"
                image={imageUrl}
                alt={name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}, {age}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Hobby: {hobby}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CardComponent;
