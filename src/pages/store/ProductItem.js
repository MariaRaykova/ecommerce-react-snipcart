import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { formatNumber, fromImageToUrl } from '../../helpers/utils';


const ProductItem = ({product}) =>{

    const { addProduct, cartItems, increase } = useContext(CartContext);
   
    const isInCart = product => {
        return !!cartItems.find(item => item.id === product.id);
    }
    
    const imageUrl = fromImageToUrl(product.attributes.image.data.attributes.url)
    return (
        <div className="card card-body">
            <img style={{display: "block", margin: "0 auto 10px", maxHeight: "200px"}} className="img-fluid"
            src={`${imageUrl}`} alt=""/>
            <p>{product.attributes.title}</p>
            <h3 className="text-left">{formatNumber(product.attributes.price)}</h3>
            <div className="text-right">
                <Link  to="/" className="btn btn-link btn-sm mr-2">Details</Link>

                {
                    isInCart(product) &&
                    <button
                    onClick={() => increase(product)}
                    className="btn btn-outline-primary btn-sm">Add more</button>
                }

                {
                    !isInCart(product) &&
                    <button type="button"
                    className="snipcart-add-item btn btn-outline-danger btn-sm"
                    data-item-name={product.attributes.title}
                    data-item-price={product.attributes.price}
                    data-item-description={product.attributes.description}
                    data-item-min-quantity="0"
                    data-item-max-quantity={product.attributes.quantity}
                    data-item-id={product.id}
                    data-item-url="/">
                        Add to cart
                    </button>
                }

            </div>
        </div>
     );
}

export default ProductItem;
