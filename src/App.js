import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  Grommet,
  grommet,
  Header,
  Heading,
  Image,
  Page,
  PageContent,
  ResponsiveContext,
  Text,
} from "grommet";
import { deepMerge } from "grommet/utils";
import * as Icon from "grommet-icons";
import styled from 'styled-components';
import logo from './lume-logo-white.svg';

const lumeTheme = deepMerge(grommet, {
  global: {
    colors: {
      brand: '#f15a2c',
      purple: '#ad0da6',
      blue: '#1a78c2',
      white: '#ffffff',
      black: '#000000',
      body: '#e6e6e6'
    },    
    font: {
      family: "Poppins",
      size: "16px",
      height: "1.25",
    },
    size: {
      xxsmall: "48px",
      xsmall: "96px",
      small: "192px",
      medium: "240px",
      large: "768px",
      xlarge: "1152px",
      xxlarge: "1536px",
      full: "100%",      
    },
    breakpoints: {
      medium: {
        value: 1260
      },
      small: {
        value: 1000
      }
    }    
  }
});

const CartBox = styled(Box)`
  position: sticky;
  top: 30px;
  width: 360px; 
  @media all and (max-width: 1000px) {
    position: fixed;
    top: auto;
    bottom: 12px;
    left: 12px;
    right: 12px;
    width: calc(100% - 24px);
  }
`;

const QtyText = styled(Text)`
  display: ${props => (props.mobile ? `none` : `flex`)};
  width: 48px;
  height: 48px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  border: 2px solid #f15a2c;
  opacity: ${props => (props.dimmed ? `0.5` : `1`)};
  color: ${props => (props.active ? `#ffffff` : `#f15a2c`)};
  background-color: ${props => (props.active ? `#f15a2c` : `#ffffff`)};
  @media all and (max-width: 1000px) {
    display: ${props => (props.mobile ? `flex` : `none`)};
    width: 32px;
    height: 32px;
  }
`;

const ProductIcon = (props) => {
  const DynamicProductIcon = Icon[props.icon];
  return (
    <DynamicProductIcon size={props.size} color={props.color}/>
  )
}

const CartIcon = ({cartContents, cartPosition}) => {
  
  return (
    
    <ResponsiveContext.Consumer>
    {size => ( 
      <Box border={true} width={size==='small' ? "40px" : "60px"} height={size==='small' ? "40px" : "60px"} align="center" justify="center">{cartContents && cartContents.length >= cartPosition+1 ? <ProductIcon icon={cartContents[cartPosition].productIcon} size={size==='small' ? "medium" : "large"}/> : null}</Box>
    )}
    </ResponsiveContext.Consumer>
  )
}

const Product = ({ product, qtyAllowed, onAddToCart, onRemoveFromCart }) => {

  const [productQty, setProductQty] = useState(0);

  const increaseQty = () => {
    let newQty = Math.min(3, productQty+1);
    setProductQty(newQty);
    onAddToCart(product);
  }

  const decreaseQty = () => {
    let newQty = Math.max(0, productQty-1);
    setProductQty(newQty);
    onRemoveFromCart(product);
  }

  const textStatusColor = () => {
    if(qtyAllowed === 0 && productQty === 0){
      return '#d5d5d5'
    } else if (productQty > 0) {
      return '#f15a2c'
    } else {
      return '#444444'
    }
  }

  return (
    <ResponsiveContext.Consumer>
      {size => (     
        <Card background="white" width={size==='small' ? "calc(50% - 12px)" : "240px"} margin="small" className={qtyAllowed === 0 && productQty === 0 ? 'disabled' : null}>
          <CardHeader pad={{top:"medium"}} justify="center">
            <Heading level={3} margin="none" color={textStatusColor()}>
              {product.productName}
            </Heading>
          </CardHeader>
          <CardBody pad="medium" align="center">
            <ProductIcon icon={product.productIcon} size={size==='small' ? "large" : "xlarge"} color={textStatusColor()}/>
            <QtyText active={productQty > 0} dimmed={qtyAllowed === 0 && productQty === 0} mobile={true} margin={{top:"medium"}}>{productQty}</QtyText>
            <Box direction="row" alignContent="between" margin={{left:"auto", right:"auto"}} pad={{top:"medium"}}>
              <Button a11yTitle="Decrease Product Quantity" label="-" onClick={decreaseQty} disabled={ productQty === 0 ? true : false } alignSelf="center" margin={{horizontal: "5px"}} pad={size==='small' ? "4px 10px" : null} size={size==='small' ? "small" : "medium"}/>
              <QtyText active={productQty > 0} dimmed={qtyAllowed === 0 && productQty === 0} mobile={false}>{productQty}</QtyText>
              <Button a11yTitle="Increase Product Quantity" label="+" onClick={increaseQty} disabled={ qtyAllowed === 0 ? true : false } alignSelf="center" margin={{horizontal: "5px"}} pad={size==='small' ? "4px 10px" : null} size={size==='small' ? "small" : "medium"}/>
            </Box>
          </CardBody>
        </Card>
      )}
    </ResponsiveContext.Consumer>
  );
};

const Cart = ({cartContents, qtyAllowed}) => {

  return (
    <ResponsiveContext.Consumer>
      {size => (    
        <Card fill background="white">
          <CardHeader pad="medium" background="purple" direction={size==='small' ? "row" : "column"}>
            <Heading level={3} margin="none">
              Build Your Pack
            </Heading>
            <Text size={size==='small' ? "medium" : "large"}><s>$41.977</s> <strong>$33.99</strong></Text>
          </CardHeader>
          <CardBody pad="medium" align="center" justify="center" direction={size==='small' ? "row" : "column"}>
            <Box direction="row" justify="between" margin={size==='small' ? {right: "auto", bottom: "0px", left:"0px"} : {right:"auto", bottom: "30px", left:"auto"}} width={{ max: "220px"}} gap="small">
              <CartIcon cartContents={cartContents} cartPosition={0}/>
              <CartIcon cartContents={cartContents} cartPosition={1}/>
              <CartIcon cartContents={cartContents} cartPosition={2}/>
            </Box>
            <Button primary label="Add to Cart" disabled={ qtyAllowed === 0 ? false : true } size={size==='small' ? "small" : "large"} style={{color: "#ffffff"}}/>
          </CardBody>
        </Card>
      )}
    </ResponsiveContext.Consumer>
  );
};

const App = () => {

  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]);

  const [qtyAllowed, updateQtyAllowed] = useState(3);

  const addToCart = (product) => {
    setCart(cart.concat(product)); 
  }

  const removeFromCart = (product) => {
    let productIndex = cart.indexOf(product);
    setCart(cart.filter((cartProduct, index)=>{
      return index !== productIndex;
    }));
  }
  useEffect(() => {
    let qtyAllowed = 3;
    updateQtyAllowed(qtyAllowed - cart.length);
  }, [cart]);   

  const getProducts=()=>{
    fetch('data.json', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(function(response){
      // console.log(response)
      return response.json();
    })
    .then(function(productJson) {
      // console.log(productJson);
      setProducts(productJson)
    });
  }
  useEffect(()=>{
    getProducts()
  },[])

  const filterProducts = (productType) => {
    return products.filter(function(product) {
      return product.productType === productType;
    });
  }

  return (
    <Grommet theme={lumeTheme} full background="body">
      <ResponsiveContext.Consumer>
        {size => (
        <Page>
          <Header background="brand" pad={{ horizontal: "medium", vertical: "small" }} elevation="medium" justify="center">
            <Box height="auto" width="xsmall">
              <Image fit="cover" src={logo} alt="Lume Deodorant"/>
            </Box>
          </Header>        
          <PageContent>
              <Heading level={1} textAlign="center" alignSelf="center">
                Welcome to the Lume Pack Builder
              </Heading>           
              <Box direction="row" width="full" pad={{bottom: "200px"}}>
                <Box width={size==='small' ? "100%" : "calc(100% - 360px)"}>
                  <Heading level={2}>
                    Pack Section 1
                  </Heading>                
                  <Box direction="row" wrap={true}>
                  { 
                    filterProducts('type1').map((product)=>
                      <Product key={product._id} product={product} qtyAllowed={qtyAllowed} onAddToCart={addToCart} onRemoveFromCart={removeFromCart} />
                    )
                  }
                  </Box>
                  <Heading level={2}>
                    Pack Section 2
                  </Heading>                
                  <Box direction="row" wrap={true}>
                  { 
                    filterProducts('type2').map((product)=>
                      <Product key={product._id} product={product} qtyAllowed={qtyAllowed} onAddToCart={addToCart} onRemoveFromCart={removeFromCart} />
                    )
                  }
                  </Box>
                  <Heading level={2}>
                    Pack Section 3
                  </Heading>                
                  <Box direction="row" wrap={true}>
                  { 
                    filterProducts('type3').map((product)=>
                      <Product key={product._id} product={product} qtyAllowed={qtyAllowed} onAddToCart={addToCart} onRemoveFromCart={removeFromCart} />
                    )
                  }
                  </Box>                                 
                </Box>
                <CartBox alignSelf="start" direction={size==='small' ? "row" : "column"} margin={size==='small' ? {top: "0px"} : {top: "108px"} }>
                  <Cart cartContents={cart} qtyAllowed={qtyAllowed}/>
                </CartBox>
              </Box>                       
          </PageContent>
        </Page>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
}

export default App;