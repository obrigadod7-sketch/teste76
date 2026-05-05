import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import { Card } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Star, MapPin, Calendar, Users, Shield, ShieldCheck, ShieldX, Flag, Camera, Video, Phone, Edit, Check, X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { useAuth } from '../context/AuthContext';

const Perfil = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('apresentacao');
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [presentation, setPresentation] = useState('');
  const [editPresentation, setEditPresentation] = useState('');
  const [toast, setToast] = useState('');
  const photoInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(f => {
      setPhotos(prev => [...prev, { url: URL.createObjectURL(f), name: f.name, date: new Date().toLocaleDateString('pt-BR') }]);
    });
    showToast(`${files.length} foto(s) adicionada(s)!`);
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(f => {
      setVideos(prev => [...prev, { url: URL.createObjectURL(f), name: f.name, date: new Date().toLocaleDateString('pt-BR') }]);
    });
    showToast(`${files.length} vídeo(s) adicionado(s)!`);
  };

  const removePhoto = (idx) => { setPhotos(prev => prev.filter((_, i) => i !== idx)); };
  const removeVideo = (idx) => { setVideos(prev => prev.filter((_, i) => i !== idx)); };

  const handleSavePresentation = () => {
    setPresentation(editPresentation);
    setShowEditModal(false);
    showToast('Apresentação salva!');
  };

  const tabs = [
    { id: 'apresentacao', label: 'Apresentação' },
    { id: 'fotos', label: 'Fotos' },
    { id: 'avaliacoes', label: 'Avaliações' },
    { id: 'atividade', label: 'Atividade' },
  ];

  const mockReviews = [
    { id: 1, name: 'Carlos M.', avatar: 'https://i.pravatar.cc/150?img=25', rating: 5, text: 'Excelente profissional! Muito pontual e atencioso. Recomendo!', date: 'Há 1 semana', service: 'Eletricista' },
    { id: 2, name: 'Ana P.', avatar: 'https://i.pravatar.cc/150?img=44', rating: 4, text: 'Bom trabalho, fez a mudança rapidamente.', date: 'Há 2 semanas', service: 'Mudança' },
  ];

  const mockActivities = [
    { id: 1, type: 'post', text: 'Publicou um pedido: "Preciso de eletricista"', date: 'Há 2 horas' },
    { id: 2, type: 'reply', text: 'Respondeu ao pedido de João S.', date: 'Há 5 horas' },
    { id: 3, type: 'review', text: 'Recebeu uma avaliação de Carlos M.', date: 'Há 1 semana' },
  ];

  const avgRating = mockReviews.length > 0
    ? (mockReviews.reduce((s, r) => s + r.rating, 0) / mockReviews.length).toFixed(1)
    : '0';

  return (
    <div className="min-h-screen bg-[#FFF5F3] pb-16 md:pb-0">
      <Header />

      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-sm">
          <Check className="w-4 h-4 inline mr-2" />{toast}
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Cover Banner + Avatar */}
        <div className="relative">
          <div className="h-44 bg-gradient-to-r from-[#F8C4B4] via-[#E8D5D0] to-[#C5CAE0] rounded-b-none" />
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg" data-testid="profile-avatar">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="text-4xl bg-gray-300 text-gray-600">{user?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <button className="absolute bottom-1 right-1 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-50" data-testid="change-avatar-btn">
                <Camera className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
          <div className="absolute -bottom-12 left-44">
            <span className="bg-gray-700 text-white text-xs px-3 py-1 rounded-full">Particular</span>
          </div>
        </div>

        {/* User Info */}
        <div className="bg-white px-8 pt-20 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900" data-testid="profile-name">{user?.name || 'Usuário'}</h1>
              <div className="flex items-center gap-1 text-gray-500 mt-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{user?.location || 'Brasil'}</span>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => { setEditPresentation(presentation); setShowEditModal(true); }} data-testid="edit-profile-btn">
              <Edit className="w-4 h-4 mr-1" /> Editar perfil
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mt-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                data-testid={`tab-${tab.id}`}
                className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${activeTab === tab.id ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white px-8 py-6">
          {activeTab === 'apresentacao' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left - Stats */}
              <div className="space-y-4">
                <Card className="p-4 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="text-2xl font-bold">{avgRating}/5</span>
                  </div>
                  <p className="text-xs text-gray-500">Baseado em {mockReviews.length} avaliações</p>
                  <Button variant="outline" size="sm" className="mt-3 rounded-full text-xs" onClick={() => setActiveTab('avaliacoes')} data-testid="view-reviews-btn">
                    Ver avaliações
                  </Button>
                </Card>

                <Card className="p-4 text-center space-y-4">
                  <div>
                    <div className="flex items-center justify-center gap-2 text-gray-700">
                      <Calendar className="w-4 h-4" />
                      <span className="font-semibold text-sm">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }) : '2025'}</span>
                    </div>
                    <p className="text-xs text-gray-500">data de inscrição</p>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-center gap-2 text-gray-700">
                      <Users className="w-4 h-4" />
                      <span className="font-semibold text-sm">118</span>
                    </div>
                    <p className="text-xs text-gray-500">conexões</p>
                  </div>
                </Card>
              </div>

              {/* Right - Content */}
              <div className="md:col-span-2 space-y-4">
                <Card className="p-4 bg-[#F0F7FF]">
                  <p className="text-sm text-gray-600 italic">
                    {presentation ? `"${presentation}"` : '"Ainda não adicionei minha apresentação"'}
                  </p>
                  {!presentation && (
                    <Button variant="outline" size="sm" className="mt-2 text-xs" onClick={() => { setEditPresentation(''); setShowEditModal(true); }}>
                      Adicionar apresentação
                    </Button>
                  )}
                </Card>

                {/* Verifications */}
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-gray-700" />
                    <h3 className="font-semibold">Verificações</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-700">Email verificado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-700">Número de telefone verificado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldX className="w-4 h-4 text-red-400" />
                      <span className="text-sm text-gray-500">Documento de identidade não verificado</span>
                    </div>
                  </div>
                </Card>

                <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors">
                  <Flag className="w-4 h-4" /> Denunciar este perfil
                </button>
              </div>
            </div>
          )}

          {activeTab === 'fotos' && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Button onClick={() => photoInputRef.current?.click()} className="bg-green-500 hover:bg-green-600 text-white" data-testid="upload-photo-btn">
                  <Camera className="w-4 h-4 mr-2" /> Adicionar foto
                </Button>
                <Button variant="outline" onClick={() => cameraInputRef.current?.click()} data-testid="camera-photo-btn">
                  <Camera className="w-4 h-4 mr-2" /> Tirar foto
                </Button>
                <Button variant="outline" onClick={() => videoInputRef.current?.click()} data-testid="upload-video-btn">
                  <Video className="w-4 h-4 mr-2" /> Adicionar vídeo
                </Button>
                <input type="file" ref={photoInputRef} accept="image/*" multiple className="hidden" onChange={handlePhotoUpload} />
                <input type="file" ref={cameraInputRef} accept="image/*" capture="environment" className="hidden" onChange={handlePhotoUpload} />
                <input type="file" ref={videoInputRef} accept="video/*" className="hidden" onChange={handleVideoUpload} />
              </div>

              {photos.length === 0 && videos.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <Camera className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Nenhuma foto ou vídeo adicionado</p>
                  <p className="text-sm">Adicione fotos e vídeos para apresentar seu trabalho</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {photos.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-sm text-gray-700 mb-3">Fotos ({photos.length})</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {photos.map((photo, idx) => (
                          <div key={idx} className="relative group rounded-lg overflow-hidden" data-testid={`photo-item-${idx}`}>
                            <img src={photo.url} alt={photo.name} className="w-full h-48 object-cover" />
                            <button onClick={() => removePhoto(idx)} className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <X className="w-3 h-3" />
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-black/30 text-white text-xs p-1.5">{photo.date}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {videos.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-sm text-gray-700 mb-3">Vídeos ({videos.length})</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {videos.map((video, idx) => (
                          <div key={idx} className="relative group rounded-lg overflow-hidden bg-black" data-testid={`video-item-${idx}`}>
                            <video
                              src={video.url}
                              controls
                              className="w-full aspect-video object-contain"
                              style={{ background: 'transparent' }}
                              playsInline
                            />
                            <button onClick={() => removeVideo(idx)} className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'avaliacoes' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-lg font-bold">{avgRating}/5</span>
                <span className="text-sm text-gray-500">({mockReviews.length} avaliações)</span>
              </div>
              {mockReviews.map(review => (
                <Card key={review.id} className="p-4" data-testid={`review-${review.id}`}>
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={review.avatar} />
                      <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm">{review.name}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-blue-500 mb-1">{review.service}</p>
                      <p className="text-sm text-gray-700">{review.text}</p>
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'atividade' && (
            <div className="space-y-3">
              {mockActivities.map(act => (
                <div key={act.id} className="flex items-start gap-3 pb-3 border-b border-gray-100" data-testid={`activity-${act.id}`}>
                  <div className={`w-2 h-2 rounded-full mt-2 ${act.type === 'post' ? 'bg-green-500' : act.type === 'reply' ? 'bg-blue-500' : 'bg-yellow-500'}`} />
                  <div>
                    <p className="text-sm text-gray-700">{act.text}</p>
                    <span className="text-xs text-gray-400">{act.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Presentation Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-md">
          <DialogTitle className="text-lg font-bold">Editar apresentação</DialogTitle>
          <div className="space-y-4 mt-2">
            <textarea
              value={editPresentation}
              onChange={(e) => setEditPresentation(e.target.value)}
              placeholder="Conte um pouco sobre você, seus serviços e experiência..."
              className="w-full h-32 border border-gray-200 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-200"
              data-testid="edit-presentation-textarea"
            />
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowEditModal(false)} className="flex-1">Cancelar</Button>
              <Button onClick={handleSavePresentation} className="flex-1 bg-green-500 hover:bg-green-600 text-white" data-testid="save-presentation-btn">
                Salvar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Perfil;
