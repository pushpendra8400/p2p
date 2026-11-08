import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
  showValue?: boolean;
  className?: string;
}

const sizeClasses: Record<string, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onChange,
  showValue = false,
  className,
}) => {
  const [hoverRating, setHoverRating] = React.useState<number>(0);

  const displayRating = hoverRating || rating;

  const handleClick = (starIndex: number) => {
    if (interactive && onChange) {
      onChange(starIndex);
    }
  };

  const handleMouseEnter = (starIndex: number) => {
    if (interactive) {
      setHoverRating(starIndex);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  return (
    <div className={cn('inline-flex items-center gap-0.5', className)}>
      {Array.from({ length: maxRating }, (_, i) => {
        const starIndex = i + 1;
        const isFilled = starIndex <= Math.floor(displayRating);
        const isHalf = !isFilled && starIndex - 0.5 <= displayRating;

        return (
          <button
            key={i}
            type="button"
            onClick={() => handleClick(starIndex)}
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onMouseLeave={handleMouseLeave}
            disabled={!interactive}
            className={cn(
              'relative p-0 border-0 bg-transparent',
              interactive
                ? 'cursor-pointer hover:scale-110 transition-transform'
                : 'cursor-default'
            )}
            aria-label={`${starIndex} star${starIndex > 1 ? 's' : ''}`}
          >
            <Star
              className={cn(
                sizeClasses[size],
                'transition-colors duration-150',
                isFilled
                  ? 'fill-warning text-warning'
                  : isHalf
                    ? 'fill-warning/50 text-warning'
                    : 'fill-transparent text-border'
              )}
            />
          </button>
        );
      })}
      {showValue && (
        <span className="ml-1 text-sm font-medium text-text-primary">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

StarRating.displayName = 'StarRating';

export { StarRating };
