const jwtConfig = {
  secret: 'superSecurity',
  accessExpirationTime: { expiresIn: '50m' },
  refreshExpirationTime: { expiresIn: '1d' },
};
export default jwtConfig;
