import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';

function JeweleryCard(props) {

    const { id, title, price, description, category, image, rating } = props.product
    const navigate = useNavigate()

  return (
    <div  style={{marginTop:'200px'}}>
    <div className='product-card'>
      <Card className='card' sx={{ width: '300px', height: '580px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '30px', cursor: 'pointer',boxShadow:'1px 1px 5px 5px whitesmoke', marginBottom: '-150px' }}>
        <img src={image} width={220} height={250} />
        <CardContent sx={{ height: '200px', marginTop: '10px' }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: '21px', fontStyle: 'italic', height: '50px' }}>
            {title.substring(0, 60)}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '13px', marginTop: '50px' }}>
            {description.substring(0, 100)}...
          </Typography>
        <div  style={{ height: '50px' }} >
          <h3 className='price'>{price}$</h3>
        </div>
        </CardContent>
        <CardActions>
          <Button  onClick={() => navigate("/product-detail/" + id)} className='btn' sx={{ color: 'gray', fontStyle: 'italic', fontSize: '11px', letterSpacing: '2px', backgroundColor: 'whitesmoke', boxShadow: '1px 1px 1px 1px #ddd', paddingLeft: '30px', paddingRight: '30px', marginRight: '20px',marginTop:'15px',borderRadius: '2px' }}>Go to detail</Button>
        </CardActions>
      </Card>
    </div>
  </div>
  )
}

export default JeweleryCard