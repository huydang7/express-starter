import { Token } from './token.model';
import { User } from './user.model';

export const initRelations = () => {
  User.hasMany(Token, {
    as: 'tokens',
    foreignKey: 'userId',
  });
  Token.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId',
  });
};
