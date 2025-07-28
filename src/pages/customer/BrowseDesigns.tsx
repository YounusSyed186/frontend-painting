import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Search, Filter, Heart, Star, ArrowRight } from "lucide-react"
import axios from "axios"
import { useVendorStore } from "@/hooks/zustand/vendorInfo"

const BrowseDesigns = () => {
  const navigate = useNavigate()
  const { setVendor } = useVendorStore()

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStyle, setSelectedStyle] = useState("all")
  const [favorites, setFavorites] = useState<string[]>([])
  const [designs, setDesigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKENDURI}/api/users/all-designs`)
        const allDesigns = res.data.vendors.flatMap((vendor: any) =>
          vendor.design.map((d: any, index: number) => ({
            id: `${vendor._id}-${index}`,
            vendorId: vendor._id,
            title: `Design ${index + 1}`,
            image: d.imageUrl,
            tags: [],
            category: "General",
            style: "Default",
            price: "₹500",
            rating: 4.5,
            reviews: 10,
            vendor: vendor.username,
            description: d.description?.trim() || "No description",
          }))
        )
        setDesigns(allDesigns)
      } catch (err) {
        console.error("Failed to fetch designs:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchDesigns()
  }, [])

  const categories = ["all", "Interior", "Exterior", "Commercial"]
  const styles = ["all", "Modern", "Traditional", "Contemporary", "Rustic", "Industrial", "Floral"]

  const filteredDesigns = designs.filter((design) => {
    const matchesSearch =
      design?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      design?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      design?.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || design.category === selectedCategory
    const matchesStyle = selectedStyle === "all" || design.style === selectedStyle

    return matchesSearch && matchesCategory && matchesStyle
  })

  const toggleFavorite = (designId: string) => {
    setFavorites((prev) =>
      prev.includes(designId) ? prev.filter((id) => id !== designId) : [...prev, designId]
    )
  }

  const handleSelectDesign = (design: any) => {
    setVendor({ vendorId: design.vendorId, imageUrl: design.image })
    navigate("/room-selection", { state: { selectedDesign: design } })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-card py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Browse Painting Designs
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover thousands of professional painting designs from verified painters
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-card rounded-lg shadow-card p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search designs, styles, or rooms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                <SelectTrigger>
                  <SelectValue placeholder="Style" />
                </SelectTrigger>
                <SelectContent>
                  {styles.map((style) => (
                    <SelectItem key={style} value={style}>
                      {style === "all" ? "All Styles" : style}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-foreground">
              {filteredDesigns.length} designs found
            </h2>
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Sort by popularity</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDesigns.map((design) => (
              <Card
                key={design.id}
                className="group cursor-pointer border-0 shadow-card hover:shadow-elegant transition-spring overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={design.image}
                    alt={design.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-spring"
                  />
                  <div className="absolute top-3 right-3 space-y-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-white/90 backdrop-blur-sm hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(design.id)
                      }}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(design.id)
                            ? "fill-red-500 text-red-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    </Button>
                  </div>
                  <Badge className="absolute bottom-3 left-3 bg-gradient-primary text-white">
                    {design.category}
                  </Badge>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg group-hover:text-primary transition-smooth">
                      {design.title}
                    </CardTitle>
                  </div>
                  <p className="text-muted-foreground text-sm">{design.description}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{design.rating}</span>
                        <span className="text-sm text-muted-foreground">({design.reviews})</span>
                      </div>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{design.vendor}</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {design.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-lg font-semibold text-primary">{design.price}</span>
                      <Button
                        onClick={() => handleSelectDesign(design)}
                        className="group-hover:scale-105 transition-spring"
                      >
                        Select Design
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDesigns.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No designs found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setSelectedStyle("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default BrowseDesigns
