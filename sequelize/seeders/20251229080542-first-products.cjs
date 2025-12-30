'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// Insertar 10 productos de ejemplo en la tabla Products
		await queryInterface.bulkInsert(
			'Products',
			[
				{
					name: 'Mouse Inalámbrico',
					price: 25.99,
					stock: 150,
					isActive: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Teclado Mecánico',
					price: 79.99,
					stock: 100,
					isActive: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Monitor 24 pulgadas',
					price: 149.99,
					stock: 75,
					isActive: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Auriculares Gaming',
					price: 59.99,
					stock: 200,
					isActive: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Webcam HD',
					price: 39.99,
					stock: 120,
					isActive: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Disco Duro Externo 1TB',
					price: 89.99,
					stock: 80,
					isActive: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Memoria USB 64GB',
					price: 19.99,
					stock: 300,
					isActive: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Impresora Multifuncional',
					price: 129.99,
					stock: 60,
					isActive: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Router WiFi 6',
					price: 99.99,
					stock: 90,
					isActive: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Tablet 10 pulgadas',
					price: 199.99,
					stock: 50,
					isActive: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Products', null, {});
	},
};
