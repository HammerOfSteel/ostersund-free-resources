import { Resource } from "@/data/resources";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { useState } from "react";

interface ResourceCardProps {
  resource: Resource;
  categoryColor: string;
  isSelected?: boolean;
}

export function ResourceCard({ resource, categoryColor, isSelected }: ResourceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="resource-card cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
      style={{
        borderLeft: `4px solid ${categoryColor}`,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-foreground flex-1 pr-2">
          {resource.name}
        </h3>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>

      {/* Amenities */}
      <div className="flex flex-wrap gap-2 mb-4">
        {resource.amenities.slice(0, 3).map((amenity) => (
          <span
            key={amenity}
            className="text-xs px-2 py-1 rounded-full"
            style={{
              backgroundColor: `${categoryColor}20`,
              color: categoryColor,
            }}
          >
            {amenity}
          </span>
        ))}
        {resource.amenities.length > 3 && (
          <span
            className="text-xs px-2 py-1 rounded-full"
            style={{
              backgroundColor: `${categoryColor}20`,
              color: categoryColor,
            }}
          >
            +{resource.amenities.length - 3}
          </span>
        )}
      </div>

      {/* Expandable Details */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border space-y-3 animate-in fade-in-50 duration-300" style={{
          animation: 'slideDown 0.3s ease-out',
        }}>
          {resource.address && (
            <div className="flex gap-3 text-sm">
              <MapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <span className="text-foreground">{resource.address}</span>
            </div>
          )}

          {resource.phone && (
            <div className="flex gap-3 text-sm">
              <Phone size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <a
                href={`tel:${resource.phone}`}
                className="text-primary hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {resource.phone}
              </a>
            </div>
          )}

          {resource.email && (
            <div className="flex gap-3 text-sm">
              <Mail size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <a
                href={`mailto:${resource.email}`}
                className="text-primary hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {resource.email}
              </a>
            </div>
          )}

          {resource.hours && (
            <div className="flex gap-3 text-sm">
              <Clock size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <span className="text-foreground">{resource.hours}</span>
            </div>
          )}

          {resource.notes && (
            <div className="text-sm text-muted-foreground italic bg-secondary/5 p-3 rounded-lg">
              {resource.notes}
            </div>
          )}

          {(resource.website || resource.url) && (
            <a
              href={resource.website || resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Besök webbsida
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      )}

      {!isExpanded && (
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <span>Klicka för mer information</span>
          <span>↓</span>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
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
