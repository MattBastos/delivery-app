import React, { useState, useEffect } from 'react';

import NavBar from '../../components/NavBar';
import CardOrder from '../../components/CardOrder';
import api from '../../services/api';
import { formatOrdersDate, formatOrdersTotalPrice } from '../../utils/formatOrdersData';

function Orders() {
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const id = localStorage.getItem('userId');

  const getAllSales = async () => {
    try {
      const { data } = await api.get(`/customer/orders/${id}`);
      formatOrdersDate(data);
      formatOrdersTotalPrice(data);

      setSalesData(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllSales();
  }, []);

  return (
    <div>
      <NavBar />
      {!isLoading
        && salesData.map((sale) => (
          <CardOrder
            key={ sale.id }
            id={ sale.id }
            status={ sale.status }
            saleDate={ sale.saleDate }
            totalPrice={ sale.totalPrice }
          />
        ))}
    </div>
  );
}

export default Orders;
