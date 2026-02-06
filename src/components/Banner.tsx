import { useStore } from '../context/StoreContext';

const Banner = () => {
    const { store, loading } = useStore();

    if (loading) return <div className="h-[80vh] flex items-center justify-center">Loading...</div>;
    if (!store) return null;

    const bannerStyle = {
        backgroundColor: store.primaryColor || '#3B82F6',
        backgroundImage: store.bannerImage ? `url(${store.bannerImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div 
            className="md:min-h-[80vh] min-h-screen h-full w-full flex flex-col items-center justify-center text-center py-10 text-white relative overflow-hidden"
            style={store.bannerImage ? bannerStyle : { backgroundColor: store.primaryColor }}
        >
            {/* Background Overlay if image exists */}
            {store.bannerImage && <div className="absolute inset-0 bg-black/40 z-0"></div>}
            
            <div className="relative z-10 px-4">
                <h1 
                    className="text-4xl md:text-6xl font-bold mb-4"
                    style={{
                        ...store.banner_text_styles,
                        color: store.banner_text_styles?.color || 'white'
                    }}
                >
                    {store.bannerText || store.name}
                </h1>
                
                <p 
                    className="text-xl md:text-2xl mb-8 opacity-90"
                    style={{
                        ...store.banner_subtext_styles,
                        color: store.banner_subtext_styles?.color || 'rgba(255,255,255,0.9)'
                    }}
                >
                    {store.bannerSubtext || 'Welcome to our store'}
                </p>

                <button 
                  className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-opacity-90 transition shadow-lg transform hover:scale-105"
                  style={{ backgroundColor: 'white', color: store.primaryColor }}
                  onClick={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    Shop Now
                </button>
            </div>
        </div>
    );
}

export default Banner;
