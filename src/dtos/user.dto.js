export function toUserDTO(user) {
  return {
    id: user._id,
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    role: user.role,
    cartId: user.cart?._id || user.cart
  };
}
