import React, { useState } from 'react';
import Header from '../components/Header';
import { Card } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Search, Send } from 'lucide-react';
import { mockUsers, mockMessages } from '../mock/data';

const Messages = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [conversations] = useState(mockUsers.slice(0, 3));

  const handleSendMessage = () => {
    if (message.trim()) {
      // Mock send message
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8FA]">
      <Header />
      <div className="max-w-6xl mx-auto px-3 py-3">
        <Card className="h-[calc(100vh-120px)] flex">
          {/* Conversations List */}
          <div className="w-80 border-r border-gray-200 flex flex-col">
            <div className="p-3 border-b border-gray-200">
              <h2 className="text-lg font-bold mb-2">Messages</h2>
              <div className="relative">
                <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher..."
                  className="pl-8 h-8 text-sm"
                />
              </div>
            </div>
            <Tabs defaultValue="tous" className="flex-1">
              <TabsList className="w-full grid grid-cols-2 rounded-none border-b">
                <TabsTrigger value="tous" className="text-xs">Tous</TabsTrigger>
                <TabsTrigger value="non-lus" className="text-xs">Non lus</TabsTrigger>
              </TabsList>
              <TabsContent value="tous" className="m-0">
                <div className="space-y-0">
                  {conversations.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                      className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedUser?.id === user.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">{user.name}</h3>
                          <p className="text-xs text-gray-600 truncate">
                            Cliquez pour voir la conversation
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="non-lus" className="m-0">
                <div className="p-4 text-center text-sm text-gray-500">
                  Aucun message non lu
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedUser ? (
              <>
                {/* Chat Header */}
                <div className="p-3 border-b border-gray-200 flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                    <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-sm">{selectedUser.name}</h3>
                    <p className="text-xs text-gray-500">{selectedUser.location}</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-3">
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-2 max-w-xs">
                        <p className="text-sm">Bonjour, je suis intéressé par votre demande.</p>
                        <span className="text-xs text-gray-500">Il y a 2h</span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-[#7CB342] text-white rounded-lg p-2 max-w-xs">
                        <p className="text-sm">Parfait ! Quand êtes-vous disponible ?</p>
                        <span className="text-xs opacity-90">Il y a 1h</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-3 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Écrivez votre message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 h-9"
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-[#7CB342] hover:bg-[#6FA036]"
                      size="sm"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <p className="text-sm">Sélectionnez une conversation</p>
                  <p className="text-xs">pour commencer à discuter</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Messages;