import { MapView } from "@/components/Map";
import { ResourceCard } from "@/components/ResourceCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { SearchBar } from "@/components/SearchBar";
import { categories, resources, referencePoint } from "@/data/resources";
import { useState, useMemo } from "react";
import { MapPin } from "lucide-react";

/**
 * Design Philosophy: Warm Community Hub
 * - Warm terracotta (#C97C5C) and sage green (#8FA89E) palette
 * - Organic, rounded forms with generous spacing
 * - Community-focused, welcoming aesthetic
 * - Asymmetric layout with map and resources side-by-side
 */

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(
    null
  );
  // Filter resources based on category and search query
  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesCategory =
        !selectedCategory || resource.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        resource.amenities.some((amenity) =>
          amenity.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.color || "#C97C5C";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-12 md:py-16 border-b border-border">
        <div className="container">
          <div className="max-w-2xl">
            <h1 style={{ fontFamily: "'Poppins', sans-serif" }} className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Gratis Resurser i Östersund
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              Hitta WiFi, laddning, mat, kök och andra gratis resurser nära dig.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              Referenspunkt: Stuguvägen 10
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8 md:py-12">
        {/* Search and Filter */}
        <div className="mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Sök efter WiFi, mat, kök, events..."
          />
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Results Info */}
        <div className="mb-6 text-sm text-muted-foreground">
          {filteredResources.length} resurser hittade
          {selectedCategory && ` i kategorin "${categories.find((c) => c.id === selectedCategory)?.name}"`}
        </div>

        {/* Layout: Map on left, Resources on right (desktop), stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-8">
              <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border h-96 md:h-[600px]">
                <MapView
                  initialCenter={referencePoint.coordinates}
                  initialZoom={14}
                  resources={filteredResources}
                  selectedResourceId={selectedResourceId}
                  referencePoint={referencePoint}
                  getCategoryColor={getCategoryColor}
                  onMarkerClick={setSelectedResourceId}
                  className="h-full"
                />
              </div>
            </div>
          </div>

          {/* Resources List Section */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            {filteredResources.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  Inga resurser hittades för din sökning.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                  }}
                  className="btn-primary"
                >
                  Rensa filter
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResources.map((resource, index) => (
                  <div
                    key={resource.id}
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 50}ms backwards`,
                    }}
                    onClick={() => setSelectedResourceId(resource.id)}
                    className={`cursor-pointer transition-all ${
                      selectedResourceId === resource.id
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                  >
                    <ResourceCard
                      resource={resource}
                      categoryColor={getCategoryColor(resource.category)}
                      isSelected={selectedResourceId === resource.id}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border mt-16 py-8 bg-secondary/5">
        <div className="container text-center text-sm text-muted-foreground">
          <p>
            Denna sida samlar gratis resurser i Östersund för att hjälpa
            människor att hitta WiFi, mat, laddning och andra tjänster.
          </p>
          <p className="mt-2">
            Saknas något? Kontakta oss eller lägg till din resurs på en av
            Facebook-grupperna.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
