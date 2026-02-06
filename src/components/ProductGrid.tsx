
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Minus, ShoppingCart, Star } from 'lucide-react';
import { Product, ProductCategory, StoreDesign } from '@/types/store';
import { useToast } from '@/hooks/use-toast';

interface ProductGridProps {
  designDetail: StoreDesign;
  onCartUpdate: (items: Product[], total: number, totalProfit: number) => void;
}

// Sample product data
const sampleProducts: ProductCategory[] = [
  {
    heading: "Festival Specials",
    crackers: [
      {
        id: '1',
        name: 'Sparkler Supreme',
        price: 250,
        buying_price: 180,
        imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
        unit: 'Pack',
        quantity: 0,
        isBestSeller: true
      },
      {
        id: '2',
        name: 'Rocket Deluxe',
        price: 450,
        buying_price: 320,
        imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
        unit: 'Box',
        quantity: 0
      },
      {
        id: '3',
        name: 'Flower Pot Special',
        price: 180,
        buying_price: 120,
        imageUrl: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
        unit: 'Piece',
        quantity: 0,
        isBestSeller: true
      },
      {
        id: '4',
        name: 'Golden Fountain',
        price: 350,
        buying_price: 250,
        imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
        unit: 'Pack',
        quantity: 0
      },
      {
        id: '5',
        name: 'Thunder Blast',
        price: 600,
        buying_price: 450,
        imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
        unit: 'Box',
        quantity: 0
      }
    ]
  },
  {
    heading: "Premium Collection",
    crackers: [
      {
        id: '6',
        name: 'Diamond Sparkler',
        price: 380,
        buying_price: 280,
        imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
        unit: 'Pack',
        quantity: 0,
        isBestSeller: true
      },
      {
        id: '7',
        name: 'Royal Fountain',
        price: 520,
        buying_price: 380,
        imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
        unit: 'Box',
        quantity: 0
      }
    ]
  }
];

import { useStore } from '../context/StoreContext';

const ProductGrid: React.FC<ProductGridProps> = ({ designDetail, onCartUpdate }) => {
  const { store } = useStore();
  const [allProducts, setAllProducts] = useState<ProductCategory[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!store?.id) return;
      setIsLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/v1/frontend/products?store_id=${store.id}`);
        const result = await response.json();
        if (result.data) {
          // Map API response to ProductCategory interface
          const categories: ProductCategory[] = result.data.categories.map((cat: any) => ({
            heading: cat.heading,
            crackers: result.data.products
              .filter((p: any) => p.category?.id === cat.id)
              .map((p: any) => ({
                id: p.id,
                name: p.name,
                price: p.price,
                imageUrl: p.imageUrl,
                unit: p.unit,
                isBestSeller: p.isBestSeller,
                quantity: 0
              }))
          }));
          setAllProducts(categories);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [store?.id]);

  const getDiscountPrice = (price: number): number => {
    return Math.round((price * (designDetail?.percentage || 70)) / 100);
  };

  const getOfferPrice = (price: number): number => {
    return price - getDiscountPrice(price);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setAllProducts(prev => 
      prev.map(category => ({
        ...category,
        crackers: category.crackers.map(product =>
          product.id === productId 
            ? { ...product, quantity: Math.max(0, newQuantity) }
            : product
        )
      }))
    );
  };

  const addToCart = (productId: string) => {
    updateQuantity(productId, 1);
    toast({
      title: "Added to cart",
      description: "Product added successfully!",
    });
  };

  const incrementQuantity = (productId: string) => {
    const product = allProducts.flatMap(cat => cat.crackers).find(p => p.id === productId);
    if (product) {
      updateQuantity(productId, product.quantity + 1);
    }
  };

  const decrementQuantity = (productId: string) => {
    const product = allProducts.flatMap(cat => cat.crackers).find(p => p.id === productId);
    if (product && product.quantity > 0) {
      updateQuantity(productId, product.quantity - 1);
    }
  };

  const filteredProducts = useMemo(() => {
    if (!searchText) return allProducts;
    
    const filtered = allProducts.map(category => ({
      ...category,
      crackers: category.crackers.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      )
    })).filter(category => category.crackers.length > 0);
    
    return filtered.length > 0 ? filtered : [{
      heading: `Search results for "${searchText}"`,
      crackers: []
    }];
  }, [allProducts, searchText]);

  useEffect(() => {
    const selectedItems = allProducts.flatMap(cat => cat.crackers).filter(p => p.quantity > 0);
    const total = selectedItems.reduce((sum, item) => sum + (getOfferPrice(item.price) * item.quantity), 0);
    const totalProfit = selectedItems.reduce((sum, item) => sum + ((getOfferPrice(item.price) - (item.buying_price || 0)) * item.quantity), 0);
    
    onCartUpdate(selectedItems, total, totalProfit);
  }, [allProducts, designDetail?.percentage, onCartUpdate]);

  return (
    <div id="products-section" className="bg-white py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Search Bar */}
        <div className="flex justify-center mb-6 md:mb-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search for crackers..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-8 md:space-y-12">
            {filteredProducts.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 px-4 md:px-6 py-4 border-b border-gray-100">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-800 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    {category.heading}
                  </h2>
                </div>
                
                {category.crackers.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <Search className="w-12 h-12 mx-auto" />
                    </div>
                    <p className="text-gray-500 text-lg">No products found for "{searchText}"</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table className="w-full">
                      <TableHeader>
                        <TableRow className="bg-gray-50 border-b border-gray-100">
                          <TableHead className="text-left font-medium text-gray-700 px-4 md:px-6 py-4 w-20 md:w-32">Product</TableHead>
                          <TableHead className="text-left font-medium text-gray-700 px-2 md:px-4 py-4 min-w-32">Description</TableHead>
                          <TableHead className="text-center font-medium text-gray-700 px-2 md:px-4 py-4 w-20 md:w-24">Price</TableHead>
                          <TableHead className="text-center font-medium text-gray-700 px-2 md:px-4 py-4 w-20 md:w-24">Quantity</TableHead>
                          <TableHead className="text-center font-medium text-gray-700 px-2 md:px-4 py-4 w-20 md:w-32">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {category.crackers.map((product) => (
                          <TableRow key={product.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50">
                            <TableCell className="px-4 md:px-6 py-4">
                              <div className="relative">
                                {product.isBestSeller && (
                                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full text-[10px] z-10">
                                    Best
                                  </Badge>
                                )}
                                <Dialog>
                                  <DialogTrigger>
                                    <img
                                      src={product.imageUrl}
                                      alt={product.name}
                                      className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9';
                                      }}
                                    />
                                  </DialogTrigger>
                                  <DialogContent className="max-w-md">
                                    <div className="text-center p-4">
                                      <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-64 object-cover rounded-lg mb-4"
                                      />
                                      <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                                      <p className="text-2xl font-bold text-primary mt-2">
                                        ₹{getOfferPrice(product.price).toLocaleString()}
                                      </p>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </TableCell>
                            
                            <TableCell className="px-2 md:px-4 py-4">
                              <div>
                                <h3 className="font-medium text-gray-800 text-sm md:text-base">{product.name}</h3>
                                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 mt-1">
                                  <span className="text-xs md:text-sm text-gray-500 line-through">
                                    ₹{product.price.toLocaleString()}
                                  </span>
                                  <Badge variant="outline" className="text-green-600 border-green-600 text-xs w-fit">
                                    {designDetail?.percentage || 70}% OFF
                                  </Badge>
                                </div>
                              </div>
                            </TableCell>
                            
                            <TableCell className="text-center px-2 md:px-4 py-4">
                              <div className="font-semibold text-gray-800 text-sm md:text-base">
                                ₹{getOfferPrice(product.price).toLocaleString()}
                              </div>
                            </TableCell>
                            
                            <TableCell className="text-center px-2 md:px-4 py-4">
                              <div className="text-sm md:text-base font-medium text-gray-600">
                                {product.quantity > 0 ? product.quantity : '0'}
                              </div>
                            </TableCell>
                            
                            <TableCell className="text-center px-2 md:px-4 py-4">
                              {product.quantity === 0 ? (
                                <Button
                                  onClick={() => addToCart(product.id)}
                                  size="sm"
                                  className="bg-primary hover:bg-primary/90 text-white px-3 py-1.5 text-xs md:text-sm h-8 md:h-9"
                                >
                                  Add to Cart
                                </Button>
                              ) : (
                                <div className="flex items-center justify-center space-x-1 md:space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => decrementQuantity(product.id)}
                                    className="w-7 h-7 md:w-8 md:h-8 p-0"
                                  >
                                    <Minus className="w-3 h-3 md:w-4 md:h-4" />
                                  </Button>
                                  <span className="px-2 md:px-3 py-1 border rounded text-center min-w-8 md:min-w-12 text-xs md:text-sm font-medium">
                                    {product.quantity}
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => incrementQuantity(product.id)}
                                    className="w-7 h-7 md:w-8 md:h-8 p-0"
                                  >
                                    <Plus className="w-3 h-3 md:w-4 md:h-4" />
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
