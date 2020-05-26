import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const ProductBox = ({ product }) => {
  const classes = useProductBoxStyle()

  return (
    <div className={classes.productBox}>
      <div className={classes.productContainer}>
        <div className={classes.productTitle}>{product.name}</div>
        <div className={classes.productImage}>
          <img
            height="120"
            width="120"
            src={product.image_url}
            alt={product.name}
          />
        </div>
        <div className={classes.price}>Only ${product.price}</div>
        <div className={classes.buyButton}>BUY NOW!</div>
      </div>
    </div>
  )
}

const useProductBoxStyle = makeStyles(theme => ({
  '@keyframes FadeIn': {
    from: { opacity: '0' },
    to: { opacity: '1' }
  },
  productBox: {
    position: 'relative',
    marginTop: '30px',
    flexBasis: '33.33%',
    padding: '30px',
    animation: `$FadeIn 3000ms`,

    '@media (max-width: 1000px)': {
      flexBasis: '50%'
    },

    '@media (max-width: 780px)': {
      flexBasis: '100%'
    }
  },
  productContainer: {
    border: '1px solid white',
    borderRadius: '5px',
    height: '372px',
    color: 'white',
    padding: '20px'
  },
  productTitle: {
    height: '50px',
    fontSize: '15px',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  productImage: {
    position: 'relative',
    bottom: '0',
    marginTop: '20px',
    textAlign: 'center'
  },
  price: {
    marginTop: '20px',
    textAlign: 'center'
  },
  buyButton: {
    height: '60px',
    backgroundColor: '#f43365',
    color: 'white',
    width: '200px',
    paddingRight: '30px',
    paddingLeft: '30px',
    borderRadius: '5px',
    fontSize: '25px',
    lineHeight: '60px',
    textAlign: 'center',
    cursor: 'pointer',
    marginTop: '30px',
    margin: '0 auto'
  }
}))

export default ProductBox
