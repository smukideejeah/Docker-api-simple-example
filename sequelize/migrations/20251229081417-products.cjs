'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Products', {
			id: {
				type: Sequelize.INTEGER.UNSIGNED,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},

			name: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},

			price: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false,
			},

			stock: {
				type: Sequelize.INTEGER.UNSIGNED,
				allowNull: false,
			},

			isActive: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},

			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},

			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},

			deletedAt: {
				type: Sequelize.DATE,
				allowNull: true,
			},
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable('Products');
	},
};
