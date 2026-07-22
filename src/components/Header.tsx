import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export function Header() {
  const { isAuthenticated, email, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="app-header">
      <Link to="/events" className="brand">
        Event Booking
      </Link>
      <nav aria-label="Main navigation">
        <Link to="/events">Events</Link>
        <Link to="/checkout">Cart{cart ? ` (${cart.quantity})` : ''}</Link>
      </nav>
      <div className="header-account">
        <span>{email}</span>
        <button
          type="button"
          className="logout-button"
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          Log out
        </button>
      </div>
    </header>
  );
}
