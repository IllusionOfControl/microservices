import {Wrapper} from "./Wrapper";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch('http://192.168.24.102:8001/orders');
            const content = await response.json();
            setOrders(content);
        })();
    }, []);

    return <Wrapper>
        <div className="pt-3 pb-2 mb-3 border-bottom">
            <Link to={`/orders/create`} className="btn btn-sm btn-outline-secondary">Add</Link>
        </div>

        <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">product_id</th>
                    <th scope="col">price</th>
                    <th scope="col">fee</th>
                    <th scope="col">total</th>
                    <th scope="col">quantity</th>
                    <th scope="col">status</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => {
                    return <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.product_id}</td>
                        <td>{order.price}</td>
                        <td>{order.fee}</td>
                        <td>{order.total}</td>
                        <td>{order.quantity}</td>
                        <td>{order.status}</td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    </Wrapper>
}