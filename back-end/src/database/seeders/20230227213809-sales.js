module.exports = {
    up: async (queryInterface, _Sequelize) => {
      await queryInterface.bulkInsert('sales',
        [{
          id: 1,
          user_id: 3,
          seller_id: 2,
          total_price: 10.50,
          delivery_address: 'seila',
          delivery_number: '10',
          sale_date: '10.10.2010',
          status: 'Pendente',
        },
        {
          id: 2,
          user_id: 3,
          seller_id: 2,
          total_price: 20.50,
          delivery_address: 'seila',
          delivery_number: '20',
          sale_date: '20.10.2010',
          status: 'Entregue',
        }
        ], { timestamps: false });
    },
  
    down: async (queryInterface, _Sequelize) => {
      await queryInterface.bulkDelete('sales', null, {});
    },
  };
  