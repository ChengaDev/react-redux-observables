import React, { useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Actions from '../../actions'
import {
  productsSelector,
  isLoadingSelector
} from '../../selectors/tabOneSelectors'
import { InputGroup, FormControl, Container } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles'
import ProductBox from './ProductBox'
import SearchIcon from '@material-ui/icons/Search'
import LoopIcon from '@material-ui/icons/Loop'
import NotInterestedIcon from '@material-ui/icons/NotInterested'
import logo from '../../images/jul-logo-with-tld.png'

const TabOne = () => {
  const dispatch = useDispatch()
  const searchInputRef = useRef()
  const products = useSelector(productsSelector)
  const isLoading = useSelector(isLoadingSelector)
  const classes = useTabOneStyles()

  const fetchProducts = useCallback(() => {
    dispatch(Actions.requestTabOneData(searchInputRef.current.value))
  }, [dispatch])

  useEffect(() => {
    searchInputRef.current.addEventListener('keyup', fetchProducts)

    // cleanup
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      searchInputRef.current.removeEventListener('keyup', fetchProducts)
    }
  }, [dispatch, fetchProducts])

  const renderEmptyState = () => {
    return (
      <div className={classes.message}>
        <NotInterestedIcon className={classes.messageIcon} />
        <div>No products to show :)</div>
      </div>
    )
  }

  const renderLoader = () => {
    return (
      <div className={classes.message}>
        <LoopIcon
          className={`${classes.messageIcon} ${classes.rotateMessageIcon}`}
        />
        <div>Loading products...</div>
      </div>
    )
  }

  const renderProducts = () => {
    return (
      <div className={classes.productsContainer}>
        {products &&
          products.map(product => (
            <ProductBox key={product.name} product={product} />
          ))}
      </div>
    )
  }

  const renderContent = () => {
    if (products && products.length > 0) {
      return renderProducts()
    } else if (isLoading) {
      return renderLoader()
    }
    return renderEmptyState()
  }

  return (
    <Container>
      <div className={classes.julLogo}>
        <img height="80" src={logo} alt="logo" />
      </div>
      <InputGroup className="mt-5">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
            <SearchIcon />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Insert search term..."
          aria-label="Username"
          aria-describedby="basic-addon1"
          ref={searchInputRef}
        />
      </InputGroup>
      <div>
        <div>{renderContent()}</div>
      </div>
    </Container>
  )
}

const useTabOneStyles = makeStyles(theme => ({
  productsContainer: {
    display: 'flex',
    flexFlow: 'row wrap'
  },
  message: {
    animation: `$FadeIn 1000ms`,
    fontSize: '40px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '50px',

    '@media (max-width: 780px)': {
      fontSize: '30px'
    }
  },
  messageIcon: {
    animation: `$FadeIn 1000ms`,
    fontSize: '80px',
    marginBottom: '30px',
    color: '#f43365'
  },
  rotateMessageIcon: {
    animation: `$Rotate 3000ms infinite`
  },
  '@keyframes Rotate': {
    to: {
      transform: 'rotateZ(360deg)'
    }
  },
  '@keyframes FadeIn': {
    from: { opacity: '0' },
    to: { opacity: '1' }
  },
  julLogo: {
    textAlign: 'center',
    marginTop: '50px'
  }
}))

export default TabOne
