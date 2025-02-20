import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

function PlaceOrder() {
    const { getTotalCartAmount, token, food_list, cartItem, url } = useContext(StoreContext);

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const placeOrder = async (event) => {
        event.preventDefault();

        // Collect ordered items
        const orderItems = food_list.filter((item) => cartItem[item._id] > 0).map((item) => ({
            ...item,
            quantity: cartItem[item._id],
        }));

        // Create order data
        const orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2, 
        };

        try {
            const response = await axios.post(`${url}/order/place`, orderData, {
                headers: { token },
            });

            if (response.data.success) {
                const { session_url } = response.data;
                window.location.replace(session_url); // Redirect to payment/confirmation page
            } else {
                // alert('Order failed. Please try again.');
            }
        } catch (error) {
            // console.error('Error placing order:', error);
            // alert('An error occurred while placing your order.');
        }
    };

    return (
        <div>
            <form onSubmit={placeOrder} className="place-order">
                <div className="place-order-left">
                    <p className="title">Delivery Information</p>
                    <div className="multi-fields">
                        <input
                            required
                            name="firstName"
                            onChange={onChangeHandler}
                            value={data.firstName}
                            type="text"
                            placeholder="First Name"
                        />
                        <input
                            required
                            name="lastName"
                            onChange={onChangeHandler}
                            value={data.lastName}
                            type="text"
                            placeholder="Last Name"
                        />
                    </div>
                    <input
                        required
                        type="email"
                        name="email"
                        onChange={onChangeHandler}
                        value={data.email}
                        placeholder="Email Address"
                    />
                    <input
                        required
                        type="text"
                        name="street"
                        onChange={onChangeHandler}
                        value={data.street}
                        placeholder="Street"
                    />
                    <div className="multi-fields">
                        <input
                            required
                            type="text"
                            name="city"
                            onChange={onChangeHandler}
                            value={data.city}
                            placeholder="City"
                        />
                        <input
                            required
                            type="text"
                            name="state"
                            onChange={onChangeHandler}
                            value={data.state}
                            placeholder="State"
                        />
                    </div>
                    <div className="multi-fields">
                        <input
                            required
                            type="text"
                            name="zipcode"
                            onChange={onChangeHandler}
                            value={data.zipcode}
                            placeholder="Zip Code"
                        />
                        <input
                            required
                            type="text"
                            name="country"
                            onChange={onChangeHandler}
                            value={data.country}
                            placeholder="Country"
                        />
                    </div>
                    <input
                        required
                        type="tel"
                        name="phone"
                        onChange={onChangeHandler}
                        value={data.phone}
                        placeholder="Phone"
                    />
                </div>
                <div className="place-order-right">
                    <div className="cart-total">
                        <h2>Cart Total</h2>
                        <div>
                            <div className="cart-total-details">
                                <p>Subtotal</p>
                                <p>${getTotalCartAmount()}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <p>Delivery Fee</p>
                                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <b>Total</b>
                                <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                            </div>
                        </div>
                        {/* <button type="submit">PROCEED TO PAYMENT</button> */}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default PlaceOrder;
