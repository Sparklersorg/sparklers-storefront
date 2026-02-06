import { useState } from 'react'
import Banner from './components/Banner'
import OfferSection from './components/OfferSection'
import QuotesContainer from './components/Quotes'
import { WhyUs } from './components/WhyUs'
import { YoutubeIframe } from './components/YoutubeIframe'
import ProductGrid from './components/ProductGrid'
import { useStore } from './context/StoreContext'
import './styles.css'
import type { Product } from './types/store'

function App() {
  const { store, loading } = useStore();
  const [cart, setCart] = useState<{ items: Product[], total: number }>({ items: [], total: 0 });

  if (loading) return <div>Loading Store...</div>;
  if (!store) return <div>Store not found.</div>;

  const handleCartUpdate = (items: Product[], total: number) => {
    setCart({ items, total });
  };

  const designDetail = {
    percentage: store.percentage || 70,
    primaryColor: store.primaryColor,
    secondaryColor: store.secondaryColor,
    isOffer: store.isOffer
  };

  return (
    <div style={{ '--primary-color': store.primaryColor, '--secondary-color': store.secondaryColor } as any}>
      <Banner />
      {store.isOffer && <OfferSection />}
      <ProductGrid designDetail={designDetail as any} onCartUpdate={handleCartUpdate} />
      <QuotesContainer />
      <WhyUs />
      {store.showVideoSection && <YoutubeIframe />}
      
      {/* Floating Cart Summary if items added */}
      {cart.items.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 bg-white shadow-2xl rounded-2xl p-4 border border-gray-100 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-xl">
              <span className="font-bold text-primary">{cart.items.length} Items</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="font-bold text-lg">₹{cart.total.toLocaleString()}</p>
            </div>
            <button className="bg-primary text-white px-6 py-2 rounded-xl font-semibold hover:bg-primary/90 transition shadow-lg shadow-primary/20">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
