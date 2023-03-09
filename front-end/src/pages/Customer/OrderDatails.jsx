import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import NavBar from '../../components/NavBar';
import api from '../../services/axios';
import { formatOrdersDate } from '../../utils/formatOrdersData';

function OrdersDatails() {
  const pathLocation = useLocation();
  const i = -1;
  const saleId = pathLocation.pathname.slice(i);
  const [saleData, setSaleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllSalesProducts = async () => {
    try {
      const { data } = await api.get(`/sales/products/${saleId}`);
      formatOrdersDate([data]);
      console.log(data);
      setSaleData(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllSalesProducts();
  }, []);

  const nameTest = 'customer_order_details__element-order-details-label-delivery-status';

  return (
    <div>
      <NavBar />
      {!isLoading && (
        <div>
          <h1
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            PEDIDO:
            { saleData.id }
          </h1>
          <h1
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            P.Vend: Fulana Pereira
          </h1>
          <p>
            DATA DO PEDIDO:
            <span
              data-testid="customer_order_details__element-order-details-label-order-date"
            >
              {saleData.saleDate}
            </span>
          </p>
          <h1
            data-testid={ nameTest }
          >
            { saleData.status }
          </h1>
          <button
            type="button"
            data-testid="customer_order_details__button-delivery-check" // botão de preparação de pedido
            disabled
            onClick={ () => 'add função' }
          >
            MARCAR COMO ENTREGUE
          </button>
          <table>
            <thead>
              Detalhe do Pedido
              <tr>
                <th>Item</th>
                <th>Descrição</th>
                <th>Quantidade</th>
                <th>Valor Unitario</th>
                <th>Sub-total</th>
              </tr>
            </thead>
            <tbody>
              {saleData.products.map((row, index) => (
                <tr key={ index }>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-item-number-${index}`
                    }
                  >
                    { index + 1 }
                  </td>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-name-${index}`
                    }
                  >
                    { row.name }
                  </td>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-quantity-${index}`
                    }
                  >
                    { row.SalesProducts.quantity }
                  </td>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-unit-price-${index}`
                    }
                  >
                    { row.price }
                  </td>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-sub-total-${index}`
                    }
                  >
                    { (row.price * row.SalesProducts.quantity)
                      .toFixed(2).replace('.', ',') }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4>
            TOTAL :
            <span
              data-testid="customer_order_details__element-order-total-price"
            >
              { saleData.totalPrice.replace('.', ',') }
            </span>
          </h4>
        </div>
      )}

    </div>
  );
}

export default OrdersDatails;
