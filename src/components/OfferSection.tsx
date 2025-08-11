import { Sparkles } from 'lucide-react'

const OfferSection = () => {
  const data = {
    offerText : "get @ 85% off",
    background: "",
    textColor : "white"
  }
  return (
      <div className="bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white py-3 md:py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 md:space-x-3">
            <Sparkles className="w-4 h-4 md:w-6 md:h-6 animate-spin" />
            <p className="font-bold text-sm md:text-lg animate-pulse text-center">
              🎆 {data.offerText} 🎆
            </p>
            <Sparkles className="w-4 h-4 md:w-6 md:h-6 animate-spin" />
          </div>
        </div>
      </div>
  )
}

export default OfferSection