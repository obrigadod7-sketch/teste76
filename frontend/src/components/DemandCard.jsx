import React from 'react';
import { Heart, Share2, MessageSquare, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { mockUsers } from '../mock/data';

const DemandCard = ({ demand, onLike, onRecommend, onRespond }) => {
  const user = mockUsers.find(u => u.id === demand.userId);
  const timeAgo = getTimeAgo(demand.postedAt);

  return (
    <Card className="p-3 mb-2 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start space-x-2 mb-2">
        <Avatar className="w-9 h-9">
          <AvatarImage src={user?.avatar} alt={user?.name} />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-sm">{user?.name}</h3>
            {demand.isPro && (
              <Badge variant="outline" className="text-xs px-1.5 py-0 bg-purple-50 text-purple-700 border-purple-200">
                PRO
              </Badge>
            )}
          </div>
          <p className="text-xs text-gray-500">{timeAgo}</p>
        </div>
      </div>

      {/* Content */}
      <div className="mb-2">
        <h4 className="font-medium text-sm mb-2">{demand.title}</h4>
        <p className="text-sm text-gray-700 line-clamp-4">{demand.description}</p>
      </div>

      {/* Location & Budget */}
      <div className="flex items-center justify-between mb-2 text-xs">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-3.5 h-3.5 mr-1" />
          <span>{demand.location}</span>
        </div>
        <div className="font-semibold text-gray-800">
          Budget : <span className="text-[#7CB342]">{demand.budget}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="flex items-center space-x-4 text-xs text-gray-600">
          <span>{demand.likes} J'aime</span>
          <span>{demand.responses} réponse{demand.responses > 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2 mt-2">
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 text-xs h-8"
          onClick={() => onLike(demand.id)}
        >
          <Heart className="w-4 h-4 mr-1" />
          J'aime
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 text-xs h-8"
          onClick={() => onRecommend(demand.id)}
        >
          <Share2 className="w-4 h-4 mr-1" />
          Recommander
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 text-xs h-8"
          onClick={() => onRespond(demand.id)}
        >
          <MessageSquare className="w-4 h-4 mr-1" />
          Répondre
        </Button>
      </div>
    </Card>
  );
};

function getTimeAgo(timestamp) {
  const now = new Date();
  const posted = new Date(timestamp);
  const diffInMinutes = Math.floor((now - posted) / 60000);

  if (diffInMinutes < 60) return `Il y a ${diffInMinutes} min`;
  if (diffInMinutes < 1440) return `Il y a ${Math.floor(diffInMinutes / 60)}h`;
  return `Il y a ${Math.floor(diffInMinutes / 1440)} jour${Math.floor(diffInMinutes / 1440) > 1 ? 's' : ''}`;
}

export default DemandCard;