import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize';
import { sequelize } from '../config/database.js';

class Products extends Model<
	InferAttributes<Products>,
	InferCreationAttributes<Products>
> {
	declare id: CreationOptional<number>;
	declare name: string;
	declare price: number;
	declare stock: number;
	declare isActive: CreationOptional<boolean>;
}

Products.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false,
			key: 'price',
		},
		stock: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			key: 'stock',
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
			allowNull: false,
			key: 'is_active',
		},
	},
	{
		sequelize,
		paranoid: true,
	}
);
export default Products;
