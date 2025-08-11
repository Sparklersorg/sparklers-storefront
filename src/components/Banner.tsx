interface BannerData {
    backgroundType: 'solid' | 'gradient' | 'image',
    backgroundValue: string,
    title: string,
    subtitle: string,
    image: string,
    buttonText: string
}

const Banner = () => {
    const data: BannerData = {
        backgroundType: "gradient",
        backgroundValue: "from-purple-500 via-pink-500 to-red-500",
        title: "GARUDA CRACKERS",
        subtitle: "Celebrate 2025 Diwali with",
        image: 'https://example.com/diwali-lamp.jpg', // Replace with actual image URL
        buttonText: 'Shop Now'
    };

    return (
        <div 
            className={`md:min-h-[80vh] min-h-screen h-full w-full flex flex-col items-center justify-center text-center py-10 ${
                data.backgroundType === 'solid' ? `bg-${data.backgroundValue}-500` :
                data.backgroundType === 'gradient' ? `bg-gradient-to-r ${data.backgroundValue}` :
                data.backgroundType === 'image' ? `bg-[url('${data.image}')] bg-cover bg-center` : ''
            } text-white`}
        >
            <h1 className="text-4xl font-bold text-yellow-300">{data.title}</h1>
            <p className="text-xl mt-2 text-gray-200">{data.subtitle}</p>
            {data.image && (
                <img src={data.image} alt={data.title} className="mt-4 w-1/3" />
            )}
            {data.buttonText && (
                <button className="mt-4 px-6 py-2 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition">
                    {data.buttonText}
                </button>
            )}
        </div>
    );
}

export default Banner;