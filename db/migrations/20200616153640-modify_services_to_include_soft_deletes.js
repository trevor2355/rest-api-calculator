'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Services', // table name
        'deleted_At', // new field name
        {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: null
        },
      )
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Services', 'deleted_At')
    ]);
  }
};
